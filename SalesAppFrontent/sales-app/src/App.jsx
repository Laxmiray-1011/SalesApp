import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing necessary components from react-router-dom
import TopNavbar from './components/Navbar';          
import AddSalesForm from './components/pages/Addsales'; 
import Top5Sales from './components/pages/Top5Sales';    
import TodayRevenue from './components/pages/TodayRevenue'; 
import Login from './components/pages/Login';              
import Register from './components/pages/Register';
import Home from './components/Home'; // Assuming you have a Home component        
import './App.css'    // Importing CSS file for styling




function App() {
  return (
    <>
        <Router>  {/* Router component for handling navigation */}
      <div>
        <TopNavbar  />

        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Ensure you have a Home component */}
          <Route path="/Addsales" element={<AddSalesForm />} />
          <Route path="/Top5Sales" element={<Top5Sales />} />
          <Route path="/TodayRevenue" element={<TodayRevenue />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>

    </>

  );
}

export default App;  // Exporting the App component

