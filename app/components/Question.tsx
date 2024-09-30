import React, { useState } from 'react';

interface QuestionProps {
  question: {
    id: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
    comments: Array<{ id: string; content: string }>;
    isHighlighted: boolean;
  };
  isAdmin: boolean;
}

function Question({ question, isAdmin }: QuestionProps) {
  const [comments, setComments] = useState(question.comments);
  const [likes, setLikes] = useState(question.likes);
  const [isHighlighted, setIsHighlighted] = useState(question.isHighlighted);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/questions/${question.id}/like`, { method: 'POST' });
      if (response.ok) {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('Error liking question:', error);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    try {
      const response = await fetch(`/api/questions/${question.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className={isHighlighted ? 'highlighted' : ''}>
      <h3>{question.title}</h3>
      <p>{question.content}</p>
      <div>{question.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <button onClick={handleLike}>点赞 ({likes})</button>
      {isAdmin && (
        <button onClick={() => setIsHighlighted(!isHighlighted)}>
          {isHighlighted ? '取消高亮' : '高亮'}
        </button>
      )}
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
}

export default Question;

// 这些组件需要在同一个文件中定义或导入
function CommentList({ comments }: { comments: Array<{ id: string; content: string }> }) {
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
}

function CommentForm({ onSubmit }: { onSubmit: (content: string) => void }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="添加评论"
      />
      <button type="submit">提交评论</button>
    </form>
  );
}