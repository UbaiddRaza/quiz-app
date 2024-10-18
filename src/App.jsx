import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
const [question, setquestion] = useState(null)
const [currentIndex, setcurrentIndex] = useState(0)
  useEffect(() => {
    axios('https://the-trivia-api.com/v2/questions')
      .then((res) => {
        console.log(res.data);
        setquestion(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const nextQuestion = ()=>{
    if (currentIndex < question.length -1){
      setcurrentIndex(currentIndex + 1)
      return
    }
  }
  return (
    <>
     <h1>Quiz</h1>
     {question ? 
     <div><h1>Q{currentIndex + 1}: {question[currentIndex].question.text}</h1>
     {question[currentIndex].incorrectAnswers.map((item, index)=>{
    return <div key={'option${index}'}>
      <input type="radio" value={item} name ='question' id={index}/>
        <label htmlFor={index}>{item}</label>
       
     </div>
     })}
      <input type="radio" value={question[currentIndex].correctAnswer} name ='question' id='q'/>
        <label htmlFor='q'>{question[currentIndex].correctAnswer}</label>
       <br />
       <br />
     <button onClick={nextQuestion}>Next</button>

     </div> : <h1>Loading...</h1>}
   
    </>
   
  );
}

export default App;