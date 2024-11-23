import React, { useState } from 'react';

const EmployeeSearch = ({ onSearch }) => {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  const handleSearch = (event) => {
    event.preventDefault(); 
    if (!department && !position) {
      alert('Please enter at least one search criterion.');
      return;
    }
    if (onSearch) {
      onSearch(department, position);
    } else {
      console.error('onSearch is not defined');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default EmployeeSearch;