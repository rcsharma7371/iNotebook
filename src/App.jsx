
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './component/About'
import Home from './component/Home'
import Navbar from './component/Navbar'
import NoteState from './contex/notes/NoteState'


function App() {

  return (
    <BrowserRouter>
    <NoteState>
        <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} ></Route>
        <Route exact path="/about" element={<About />} ></Route>
      </Routes>
    </NoteState>
    </BrowserRouter>
  )
}

export default App
