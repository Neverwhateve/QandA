import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import SearchBar from './SearchBar';
import ShareButton from './ShareButton';

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

function Main() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuestionSubmit = async (newQuestion: Omit<Question, 'id'>) => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      if (response.ok) {
        fetchQuestions();
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const response = await fetch(`/api/questions?search=${searchTerm}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error searching questions:', error);
    }
  };

  return (
    <div>
      <QuestionForm onSubmit={handleQuestionSubmit} />
      <SearchBar onSearch={handleSearch} />
      <QuestionList questions={questions} />
      <ShareButton />
    </div>
  );
}

export default Main;