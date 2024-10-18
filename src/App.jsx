import axios from 'axios';
import { useEffect, useState, useRef } from 'react';


function App() {
  const [questions, setQuestions] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [score, setScore] = useState(0); 
  const [showScore, setShowScore] = useState(false); 
  const input = useRef([]);

  useEffect(() => {
    axios.get('https://the-trivia-api.com/v2/questions')
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data); 
      })
      .catch((err) => {
        console.error("Error fetching questions:", err); 
      });
  }, []);

  const nextQuestion = () => {
    if (selectedOption === questions[currentIndex]?.correctAnswer) {
      setScore(score + 10);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1); 
      setSelectedOption(null); 
    } else {
      setShowScore(true); 
    }
  };

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * arr.length);
    }
    return arr;
  }

  const options = questions.length > 0 ? shuffleArray([
    ...questions[currentIndex]?.incorrectAnswers,
    questions[currentIndex]?.correctAnswer,
  ]) : [];

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {showScore ? (
        <div className="score-container">
          <h1>Quiz Complete!</h1>
          <h1>Score: {score}/100</h1>
        </div>
      ) : (
        <div>
          {questions.length > 0 ? (
            <>
              <h1 className="question">Q{currentIndex + 1}: {questions[currentIndex]?.question.text}</h1>
              <div className="options">
                {options.map((item, index) => (
                  <div className="option" key={`option${index}`}>
                    <input
                      type="radio"
                      name='question'
                      value={item}
                      id={`option${index}`}
                      ref={el => input.current[index] = el}
                      onChange={() => setSelectedOption(item)} 
                      checked={selectedOption === item} 
                    />
                    <label htmlFor={`option${index}`}>{item}</label>
                  </div>
                ))}
              </div>
              <br />
              <button onClick={nextQuestion}>Next</button>
            </>
          ) : (
            <h1 className="loading">Loading questions...</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default App;