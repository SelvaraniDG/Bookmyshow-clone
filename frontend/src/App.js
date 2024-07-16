import './App.css';
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/events/create/CreateEvent';
import Layout from './components/Layout';
import MyProfile from './pages/profile/MyProfile';
// import EventDetails from './pages/events/EventDetails';

function App() {
  return (
    <Router>
      <Layout>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/profile" element={<MyProfile />} />
        {/* <Route path="/eventdetails" element={<EventDetails />} /> */}
      </Routes>
    </main>
    </Layout>
  </Router>
);
}

export default App;