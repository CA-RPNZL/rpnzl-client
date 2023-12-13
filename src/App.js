import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Services from './pages/Services';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/services" element={<Services />}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
