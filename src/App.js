import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppointmentProvider } from './contexts/AppointmentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Aboutpage from './pages/About';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Booking from './pages/Booking';
import AdminPortal from './pages/AdminPortal';
import UserPortal from './pages/UserPortal';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';


function App() {
  
  return (
    <div className="App">
      <AppointmentProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />}/>
            <Route exact path="/about" element={<Aboutpage />}/>
            <Route exact path="/services" element={<Services />}/>
            <Route exact path="/contactus" element={<ContactUs />}/>
            <Route exact path="/admin" element={<AdminPortal />} />
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signup" element={<SignUp />}/> 
            <Route exact path="/userportal" element={<UserPortal />}/>
            <Route exact path="/booking" element={<Booking />} />
            <Route path="*" element={<NotFound />}/>
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
        </AppointmentProvider>
    </div>
  );
}

export default App;