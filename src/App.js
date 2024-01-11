import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/home';
import AddEdit from './pages/add-edit';
import View from './pages/View';

function App() {
  return (
   
      <div className="App">
        <ToastContainer position="top-center"/>
        <Router>
          <Routes>
            <Route exact path ="/" element={<Home/>} />
            <Route path="/addContact" element={<AddEdit/>}/>
            <Route path="/update/:id" element={<AddEdit/>}/>
            {/* <Route path="/view/:id" element={<View/>}/> */}
          </Routes>
        </Router>
      </div>
    
  );
}

export default App;