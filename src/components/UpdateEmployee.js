import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import '../css/UpdateEmployee.css';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);
        setEmployee(response.data.employee);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee(); // Call the fetchEmployee function
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/emp/employees/${id}`, {
        ...employee,
        updated_at: new Date(), 
      });
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="update-employee-container">
      <h2>Update Employee</h2>
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
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate('/employees')}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;