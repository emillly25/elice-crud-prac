import './App.css';
import { Header } from './Header';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Welcome } from './Welcome';
import { Nav } from './Nav';
import { Create } from './Create';
import { Read } from './Read';
import { Update } from './Update';

function Control(){
  const params = useParams()
  const id = Number(params.id)
  let contextUI = null
  if(id){
    contextUI = <>
      <li><Link to={`/update/${id}`}>Update</Link></li>
    </>
  }
  return(
    <ul>
      <li><Link to='/create'>Create</Link></li>
      {contextUI}
    </ul>
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

    async function updateHandler(id,title,body){
      const res = await fetch('/topics/'+ id, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }), 
      });
      const data = await res.json();
      refresh()
      navigate(`/read/${data.id}`)
    }
  
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/read/:id' element={<Read/>}/>
        <Route path='/create' element={<Create onCreate={createHandler}/>}/>
        <Route path='/update/:id' element={<Update onUpdate={updateHandler} />}/>
      </Routes>
      <Routes>
        <Route path='/' element={<Control/>}/>
        <Route path='/read/:id' element={<Control/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
