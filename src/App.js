import './App.css';
import { Header } from './Header';
import { Link, Routes, Route, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Welcome } from './Welcome';
import { Nav } from './Nav';

function Read(){
  const params = useParams()
  const id = Number(params.id)
  const [topic, setTopic] = useState({title: null, body: null})
  async function refresh(){
    const res = await fetch('/topics/' + id)
    const data = await res.json()
    setTopic(data)
  } 

  useEffect(()=>{
    refresh()
  },[id])

  return(
    <article>
      <h2>{topic.title}</h2>
      {topic.body}
    </article>
  )
}

function Control(){
  return(
    <ul>
      <li><Link to='/create'>Create</Link></li>
    </ul>
  )
}

function Create(){
  return(
    <article>
      <h1>Create</h1>
      <form>
        <p><input type='text' name='title' placeholder='title'></input></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='create'></input></p>
      </form>
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
        <Route path='/read/:id' element={<Read/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
      <Control></Control>
    </div>
  );
}

export default App;
