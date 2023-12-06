import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Services from './pages/Services';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/services" element={<Services />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
