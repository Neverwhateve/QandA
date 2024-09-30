import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI as string);

// 定义Question模型
const QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  comments: [{ content: String }],
  isHighlighted: { type: Boolean, default: false },
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search as string, 'i')] } }
        ]
      };
    }
    const questions = await Question.find(query).sort('-createdAt');
    res.json(questions);
  } else if (req.method === 'POST') {
    const { title, content, tags } = req.body;
    const question = new Question({ title, content, tags });
    await question.save();
    res.json(question);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}