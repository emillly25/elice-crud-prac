import './App.css';
import { Header } from './Header';
import { Link, Routes, Route } from 'react-router-dom'

function Nav(){
  return (
    <nav>
      <ol>
        <li><Link to='/read/1'>html</Link></li>
      </ol>
    </nav>
  )
}

function Welcome(){
  return(
    <article>
      <h2>Welcome</h2>
      Hello, WEB! 
    </article>
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
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/read/1' element={<Read/>}/>
      </Routes>
    </div>
  );
}

export default App;
