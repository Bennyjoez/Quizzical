import React from "react";
import {v4 as id} from "uuid"
import Quiztile from "./components/Quiztile";


export default function App() {
  const [start, setStart] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [selected, setSelected] = React.useState([])
  const [check, setCheck] = React.useState(false)
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        let newArr = data.results.map(quiz => {
          let key = id()
          return ({
            ...quiz, 
            id: key,
            answersArr: [quiz.correct_answer, ...quiz.incorrect_answers]
          })
        })
        setQuestions(newArr)
      })
  }, [])

  function updateClicked(iden, ans) {
    setSelected(prev => {
      if(prev.length === 0) {
        return(
          [
            {
              id: iden,
              ans: ans
            }
          ]
        )
      } 
      else {
        if(prev.find(({id}) => id === iden)) {
          let select = prev.find(({id}) => id === iden)
          return prev.map(each => {
            if(each === select) {
              return {
                ...each,
                ans: ans
              }
            } else {
              return each
            }
          })
        }
        return(
          [
            ...prev,
            {
              id: iden,
              ans: ans
            }
          ]
        )
      }
    })
  }

  const elements = questions?.map(quiz => {
    const selectedAns = selected.find(({id}) => id === quiz.id)
    return (
      <Quiztile 
        key = {quiz.id}
        {...quiz}
        handleSelect={updateClicked}
        isSelected={selectedAns}
        check={check}
      />
    )
  })

  function startGame() {
    setStart(true)
  }

  function playAgain() {
    setScore(0)
    setCheck(false)
    setSelected([])
  }

  function checkAnswers() {
    if(questions.length === selected.length) {
      setCheck(true)

      for(let each of selected) {
        const selectedAns = each.ans
        const correctAns = questions.find(({id}) => id === each.id).correct_answer
        if(selectedAns === correctAns) {
          setScore(prev => {
            let newScore = prev + 1
            return newScore
          })
        }
      }
    } else {
      alert("please answer all questions")
    }
  }
  return (
    <div className="overall-container">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob-top">
          <path fill="hsl(350, 30%, 50%)" d="M54.3,-59.3C70,-51.6,82,-34.1,77.6,-19.5C73.3,-4.9,52.7,6.8,39.8,17.2C26.9,27.5,21.8,36.6,13.4,41.8C5,46.9,-6.5,48.3,-13.2,43C-19.8,37.6,-21.5,25.5,-25.3,16C-29.2,6.5,-35.2,-0.4,-37.8,-10.3C-40.4,-20.2,-39.6,-33.2,-32.7,-42.4C-25.8,-51.7,-12.9,-57.1,3.2,-60.9C19.3,-64.8,38.6,-66.9,54.3,-59.3Z" transform="translate(100 100)"  />
        </svg>

        {
          start 
          ?
          <div className="quiz--container">
            {elements}
            {
              score === 0 
              ?
              <button className="button check-answers" onClick={checkAnswers}>Check Answers</button>
              :
              <div className="play-again">
                <p>Your score is {score}/{questions.length}</p>
                <button className="button check-answers" onClick={playAgain}>Play Again</button>
              </div>
            }
          </div>
          :
          <div className="start--page">
            <h1 className="title">Quizzical</h1>
            <p className="description">Click the button below to start game</p>
            <button onClick={startGame} className="button">Start Game</button>
          </div>
        }

        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob-bottom">
          <path fill="hsl(350, 30%, 50%)" d="M54.3,-59.3C70,-51.6,82,-34.1,77.6,-19.5C73.3,-4.9,52.7,6.8,39.8,17.2C26.9,27.5,21.8,36.6,13.4,41.8C5,46.9,-6.5,48.3,-13.2,43C-19.8,37.6,-21.5,25.5,-25.3,16C-29.2,6.5,-35.2,-0.4,-37.8,-10.3C-40.4,-20.2,-39.6,-33.2,-32.7,-42.4C-25.8,-51.7,-12.9,-57.1,3.2,-60.9C19.3,-64.8,38.6,-66.9,54.3,-59.3Z" transform="translate(100 100)" />
        </svg>
      </div>
      
    
  )
}