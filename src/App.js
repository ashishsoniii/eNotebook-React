import Navbar from './Components/Navbar';
import './App.css';
import Home from './Components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './Components/About';
import NoteState from './Components/Context/notes/NoteState';
import Alerts from './Components/Alert';
function App() {
  return (

    <>

      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alerts msg="Wlcome to iNotebook!"/>
          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/About" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>

      </NoteState>
    </>



  );
}

export default App;
