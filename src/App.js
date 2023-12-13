import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Services from './pages/Services';
import { ToastContainer, toast } from 'react-toastify';
import SignUp from './pages/SignUp';



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
          <Route path="/signup" element={<SignUp />}/> 
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{ backgroundColor: '#E8EADD', color: '#FBF8F0', border: '#ABAF95' }}
          />
      </BrowserRouter>
    </div>
  );
}

export default App;





