import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import '../css/EmployeeList.css';
import EmployeeSearch from './EmployeeSearch';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    
    try {
      // API calls to get the employees
      const response = await apiClient.get('/emp/employees'); 
      // Set the employees state with the data from the API
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = async (department, position) => {
    console.log('Searching for:', { department, position }); 

    try {
      const response = await apiClient.get('/emp/employees/search', {
        // Pass the department and position as query parameters
        params: { department, position },
      });
      console.log("filtered employees", response.data.employees);
      setEmployees(response.data.employees); 
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

 

  const deleteEmployee = async (id) => {
    try {
      await apiClient.delete(`/emp/employees/${id}`);
      alert('Employee deleted successfully');
      fetchEmployees(); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      
      <h2>Employee List</h2>
      <EmployeeSearch onSearch={handleSearch} />

      <button onClick={() => navigate('/add-employee')}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
              <td>
                <button onClick={() => navigate(`/view-employee/${employee._id}`)}>View</button>
                <button onClick={() => navigate(`/update-employee/${employee._id}`)}>Update</button>
                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default EmployeeList;
