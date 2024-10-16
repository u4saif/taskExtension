import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button';
import { CirclePlus } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const initalCount = localStorage.getItem('count');
    if (initalCount) {
      setCount(+initalCount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  return (
    <>
    <p> count is {count}</p>
    <Button variant="outline" size="icon" onClick={() => setCount((count) => count + 1)}>
      <CirclePlus  className="h-6 w-6" /> 
    </Button>
 
    
    </>
  )
}

export default App
