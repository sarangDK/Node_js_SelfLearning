import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import '../css/AddEmployee.css';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  // Hook to navigate 
  const navigate = useNavigate();



  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // functio calls when form is submitted 

  const handleSubmit = async (e) => {
    // prevents default from the submission -> why ? -> 
    e.preventDefault();
    try {
      await apiClient.post('/emp/employees', {
        ...employee,
        created_at: new Date(), 
      });
      alert('Employee added successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="Add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          value={employee.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="last_name"
          value={employee.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="position"
          value={employee.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
        <input
          name="salary"
          value={employee.salary}
          type="number"
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <input
          name="date_of_joining"
          value={employee.date_of_joining}
          type="date"
          onChange={handleChange}
          required
        />
        <input
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate('/employees')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEmployee;
