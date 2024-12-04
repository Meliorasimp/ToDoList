
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Navbar from './components/navigationbar.jsx'
  import Homepage from './pages/homepage.jsx';
  import CreateTask from './pages/createtask.jsx';
  import Userpage from './pages/userpage.jsx';
  import Loginpage from './pages/loginpage.jsx';

  function App() {
    return (
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/task" element={<CreateTask />} />
            <Route path="/register" element={<Userpage />} />
            <Route path="/login" element={<Loginpage />} />
          </Routes> {/* <-- Closing tag added here */}
        </div>
      </Router>
    );
  }
  
  export default App;
