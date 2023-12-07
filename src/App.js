import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import UserPortal from './pages/UserPortal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/userportal" element={<UserPortal />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
