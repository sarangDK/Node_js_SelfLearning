import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './user-components/Signup';
import Login from './user-components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewEmployee from './components/ViewEmployee';
import PrivateRoute from './user-components/PrivateRoute';
import EmployeeSearch from './components/EmployeeSearch';
import '../src/css/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            
            

            {/* Only show the "Employees" link if the user is logged in */}
            {localStorage.getItem('token') && (
              <li>
                <Link to="/employees">Employees</Link>
              </li>
            )}

           

            <li>
            <button
              onClick={() => {
                // Clear the existing token
                localStorage.removeItem('token'); 
                // redirect to the login page
                window.location.href = '/login'; 
              }}
            >
              Logout
            </button>
          </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-employee/:id"
            element={
              <PrivateRoute>
                <UpdateEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-employee/:id"
            element={
              <PrivateRoute>
                <ViewEmployee />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
