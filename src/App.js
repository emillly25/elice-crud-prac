import './App.css';
import { Header } from './Header';
import { Link, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Welcome } from './Welcome';

function Nav(props){
  const topics = props.data
  return (
    <nav>
      <ol>
      {topics.map(el=> <li key={el.id}><Link to={`/read/${el.id}`}>{el.title}</Link></li>)}
      </ol>
    </nav>
  )
}

function Read(){
  return(
    <article>
      <h2>Read</h2>
      Hello, Read!
    </article>
  )
}

function App(){
  const [topics, setTopics] = useState([])

  async function refresh(){
    const res = await fetch('http://localhost:3333/topics')
    const data = await res.json()
    setTopics(data)  
  }

  useEffect(()=>{
    refresh()
  
  },[])

  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/read/1' element={<Read/>}/>
      </Routes>
    </div>
  );
}

export default App;
