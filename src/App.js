import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Homepage from './pages/Homepage';
import Aboutpage from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/contactus" element={<ContactUs />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
