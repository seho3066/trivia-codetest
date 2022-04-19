import React, { useState, useEffect } from "react";
import { Answer } from "../../common/components/Answer";
import { Button } from "../../common/components/Button";
import { QuizQuestions } from "../../common/requests/quizRequest";

interface Props {
  questions: QuizQuestions[];
}

export const QuestionsForm = ({ questions }: Props) => {

  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(questions[questionNumber].correct_answer)
  const [points, setPoints] = useState(0);

  function displayAnswers(chosenAnswer: string) {
    if (chosenAnswer === correctAnswer) {
      setPoints(points + 1)
    }
    setShowAnswers(true);
  }

  useEffect(() => {
    const currentQuestions = [...questions[questionNumber].incorrect_answers];
    currentQuestions.splice(Math.floor(Math.random() * 3), 0, questions[questionNumber].correct_answer)
    setAnswers(currentQuestions)
    setCorrectAnswer(questions[questionNumber].correct_answer)
    setShowAnswers(false);
  }, [questionNumber, questions]);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>Question {questionNumber + 1} of {questions.length}</h1>
        <h1>{points} points</h1>
      </div>
      <h2 dangerouslySetInnerHTML={ {__html: questions[questionNumber].question} } />
      <div className="answers">
        {answers.map((x, i) =>
          <Answer disabled={showAnswers} showAnswers={showAnswers} correct={x === correctAnswer} onClick={() => displayAnswers(x)} key={i} type="button"><span dangerouslySetInnerHTML={ {__html: x} }></span></Answer>
        )}
      </div>
      <div style={{marginTop: "50px"}}>
        <Button disabled={questionNumber === questions.length - 1} onClick={() => setQuestionNumber(questionNumber + 1)} type="button">Next Question</Button>
      </div>
    </div>
  );
}