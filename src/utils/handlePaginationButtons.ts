import { iExercises } from "./../types/workout";
export const handlePaginationButtons = (
  exercises: iExercises[],
  currentExercises: number,
  setPrevPage: (num: number) => void,
  setNextPage: (num: number) => void
) => {
  const idsArray = exercises.map((item) => item.id);
  const currentIndex = idsArray.indexOf(currentExercises);
  if (currentIndex === 0) setPrevPage(-1);
  if (currentIndex === idsArray.length) setNextPage(-1);
  if (currentIndex > 0) setPrevPage(idsArray[currentIndex - 1]);
  if (currentIndex < idsArray.length) setNextPage(idsArray[currentIndex + 1]);
};
