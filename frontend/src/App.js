// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Register from './Component/Register';
import Login from './Component/Login';
import AddEvent from './Component/AddEvent';
import Navbar from './Component/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/addEvent' element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;
