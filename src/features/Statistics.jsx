import { useSelector } from 'react-redux';
import { selectClickedClues } from './categorySlice';

const Statistics = () => {
  const answeredQuestions = useSelector(selectClickedClues);
  console.log(answeredQuestions);
  return <div>Statistics</div>;
};

export default Statistics;
