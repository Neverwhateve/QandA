const express = require('express');
const mongoose = require('mongoose');
const app = express();

// ... 连接MongoDB ...

app.use(express.json());

// 获取问题列表
app.get('/questions', async (req, res) => {
  const questions = await Question.find().sort('-createdAt');
  res.json(questions);
});

// 提交新问题
app.post('/questions', async (req, res) => {
  const { title, content, tags } = req.body;
  const question = new Question({ title, content, tags });
  await question.save();
  res.json(question);
});

// ... 其他路由处理评论、点赞、搜索等功能 ...

app.listen(3000, () => console.log('Server running on port 3000'));