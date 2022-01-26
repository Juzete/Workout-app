import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkoutCompletePage from "./pages/WorkoutCompletePage/WorkoutCompletePage";
import WorkoutExerciseViewPage from "./pages/WorkoutExerciseViewPage/WorkoutExerciseViewPage";
import WorkoutViewPage from "./pages/WorkoutViewPage/WorkoutViewPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkoutViewPage />} />
        <Route
          path="/workout-exercise-view"
          element={<WorkoutExerciseViewPage />}
        />
        <Route path="/workout-complete" element={<WorkoutCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
