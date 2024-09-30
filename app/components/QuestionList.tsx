import React from 'react';
import Question from './Question';

interface QuestionListProps {
  questions: Array<{
    id: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
    comments: Array<{ id: string; content: string }>;
    isHighlighted: boolean;
  }>;
}

function QuestionList({ questions }: QuestionListProps) {
  return (
    <div>
      {questions.map((question) => (
        <Question key={question.id} question={question} isAdmin={false} />
      ))}
    </div>
  );
}

export default QuestionList;