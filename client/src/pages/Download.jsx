import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { subjectsMap } from '../data/subjects';

const Download = () => {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    department: '',
    semester: '',
    subject: ''
  });

  const departments = Object.keys(subjectsMap);
  const semesters = filters.department ? Object.keys(subjectsMap[filters.department]) : [];
  const subjects = (filters.department && filters.semester)
    ? subjectsMap[filters.department][filters.semester]
    : [];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/upload/all');
        setResources(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch resources", err);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    let filteredList = [...resources];

    if (filters.department)
      filteredList = filteredList.filter(r => r.department === filters.department);

    if (filters.semester)
      filteredList = filteredList.filter(r => r.semester === filters.semester);

    if (filters.subject)
      filteredList = filteredList.filter(r => r.subject === filters.subject);

    setFiltered(filteredList);
  }, [filters, resources]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📥 Available Resources</h2>

      {/* Filter UI */}
      <div>
        <select name="department" onChange={handleChange}>
          <option value="">All Departments</option>
          {departments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <select name="semester" onChange={handleChange} disabled={!filters.department}>
          <option value="">All Semesters</option>
          {semesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>

        <select name="subject" onChange={handleChange} disabled={!filters.semester}>
          <option value="">All Subjects</option>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <hr />

      {/* Results */}
      {filtered.length === 0 ? (
        <p>No matching files found.</p>
      ) : (
        <ul>
          {filtered.map(item => (
            <li key={item._id} style={{ marginBottom: '1rem' }}>
              <strong>{item.title}</strong> - {item.description} <br />
              <em>{item.department} | Semester {item.semester} | {item.subject}</em><br />
              <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" download>
                📎 Download
              </a>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Download;
