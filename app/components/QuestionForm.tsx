import React, { useState } from 'react';
import Confetti from 'react-confetti';

interface QuestionFormProps {
  onSubmit: (question: { title: string; content: string; tags: string[] }) => void;
}

function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tags: tags.split(',').map(tag => tag.trim()) });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="问题标题"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="问题内容"
        required
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="添加标签,用逗号分隔"
      />
      <button type="submit">提交问题</button>
      {showConfetti && <Confetti />}
    </form>
  );
}

export default QuestionForm;