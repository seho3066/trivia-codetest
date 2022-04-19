import { useEffect, useState } from "react";
import { createQuiz, QuizQuestions } from "../../common/requests/quizRequest";
import {
  Category,
  fetchCategories,
} from "../../common/requests/categoriesRequest";
import { Spinner } from "../../common/components/Spinner";
import { QuizForm } from "./QuizForm";
import { QuestionsForm } from "./QuestionsForm";

export const QuizFormPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestions[]>([]);

  useEffect(() => {
    fetchCategories().then((categoryResponse) => {
      setCategories(categoryResponse);
      setIsLoading(false);
    });
  }, []);

  const fetchQuiz = async (
    amount: number,
    difficulty: string | undefined,
    category: Category | undefined
  ) => {
    const quizQuestions = await createQuiz(amount, difficulty, category);
    setQuestions(quizQuestions.results);
    console.log(quizQuestions);
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1>{questions.length === 0 ? 'Quiz form' : ''}</h1>
        {isLoading ? (
          <Spinner />
        ) : 
          <>
            { questions.length > 0 ? 
              <QuestionsForm questions={questions}/> : 
              <QuizForm categories={categories} submit={fetchQuiz} />
            }
          </>
        }
      </div>
    </div>
  );
};
