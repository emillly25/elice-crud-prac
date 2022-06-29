import './App.css';
import { Header } from './Header';
import { Link, Routes, Route, useParams } from 'react-router-dom'
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
      </Routes>
    </div>
  );
}

export default App;
