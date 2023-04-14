import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  function handleOptionChange(updatedQuestion) {
    const updatedQuestions = questions.map((question) =>{
      if (question.id ===updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          handleDeleteQuestion={handleDeleteQuestion}
          handleOptionChange={handleOptionChange}
        />
      )}
    </main>
  );
}

export default App;
