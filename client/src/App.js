import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import LoginRegister from './components/loginRegister';
import BrightIdeas from './components/ideas';
import PeopleLike from './components/peopleLike';
import Users from './components/users';


function App() {

  const [socket] = useState(() => io(':8000'));

  useEffect(() => {
    socket.on('connection', () => {
      console.log('coneccion establecida al servidor')
    })
    return () => socket.disconnect(true); // esto sucede cuando refresh o salir de la pagina
  }, [socket])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path='/main' element={<LoginRegister />} />
          <Route path='/bright_ideas' element={<BrightIdeas />} />
          <Route path='/bright_ideas/1' element={<PeopleLike />} />
          {/* <Route path='bright_ideas/:id' element={<PeopleLike />} /> */}
          {/* <Route path='/users/:id' element={<Users />} /> */}
          <Route path='/users/1' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
