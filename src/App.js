import './App.css';
import { Header } from './Header';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom'
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

function Create(props){
  function submitHanlder(e){
    e.preventDefault()
    const title = e.target.title.value
    const body = e.target.body.value
    props.onCreate(title,body)
  }
  return(
    <article>
      <h1>Create</h1>
      <form onSubmit={submitHanlder}>
        <p><input type='text' name='title' placeholder='title'></input></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='create'></input></p>
      </form>
    </article>
  )
}

function App(){
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()

  async function refresh(){
    const res = await fetch('http://localhost:3333/topics')
    const data = await res.json()
    setTopics(data)  
  }

  useEffect(()=>{
    refresh()
  },[])

  async function createHandler(title,body){
      const res = await fetch('/topics', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }), 
      });
      const data = await res.json();
      navigate(`/read/${data.id}`)
      refresh()
    }
  
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/read/:id' element={<Read/>}/>
        <Route path='/create' element={<Create onCreate={createHandler}/>}/>
      </Routes>
      <Control></Control>
    </div>
  );
}

export default App;
