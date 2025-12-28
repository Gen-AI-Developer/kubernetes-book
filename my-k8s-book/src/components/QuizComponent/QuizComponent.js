import React, { useState } from 'react';

const QuizComponent = ({ questions, quizTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question: questions[currentQuestion].question,
      selected: selectedOption,
      correct: questions[currentQuestion].correctAnswer
    };
    
    setAnswers(newAnswers);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    return (
      <div className="quiz-result">
        <h3>Quiz Result: {quizTitle}</h3>
        <p>Your score: {score} out of {questions.length}</p>
        <p>{(score / questions.length * 100).toFixed(0)}% correct</p>
        <button className="button button--primary" onClick={resetQuiz}>
          Retake Quiz
        </button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div>No quiz questions available.</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-component">
      <h3>{quizTitle}</h3>
      <div className="quiz-question">
        <h4>
          Question {currentQuestion + 1} of {questions.length}: {question.question}
        </h4>
        
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <div key={index} className="quiz-option">
              <label>
                <input
                  type="radio"
                  name="quiz-option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <span>{option}</span>
              </label>
            </div>
          ))}
        </div>
        
        <button 
          className="button button--primary"
          onClick={handleNextQuestion}
          disabled={!selectedOption}
        >
          {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
        </button>
        
        <div className="quiz-progress">
          Progress: {currentQuestion + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;