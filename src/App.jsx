import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const status = useSelector((state) => state.status);
  console.log('status: ', status);
  return (
    <>
      <div>
        <h1>Jeopardy</h1>
      </div>
    </>
  );
}

export default App;
