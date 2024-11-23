import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);
        setEmployee(response.data.employee);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p>First Name: {employee.first_name}</p>
      <p>Last Name: {employee.last_name}</p>
      <p>Email: {employee.email}</p>
      <p>Position: {employee.position}</p>
      <p>Salary: {employee.salary}</p>
      <p>Date of Joining: {new Date(employee.date_of_joining).toLocaleDateString()}</p>
      <p>Department: {employee.department}</p>
      <p>Created At: {new Date(employee.created_at).toLocaleString()}</p>
      <p>Updated At: {employee.updated_at ? new Date(employee.updated_at).toLocaleString() : 'Not updated'}</p>
      <button onClick={() => navigate('/employees')}>Back</button>
    </div>
  );
};

export default ViewEmployee;
