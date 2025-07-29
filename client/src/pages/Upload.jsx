add processioal css style
import React, { useState } from 'react';
import axios from 'axios';
import { subjectsMap } from '../data/subjects';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    semester: '',
    subject: ''
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const departments = Object.keys(subjectsMap);
  const semesters = formData.department ? Object.keys(subjectsMap[formData.department]) : [];
  const subjects = (formData.department && formData.semester)
    ? subjectsMap[formData.department][formData.semester]
    : [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, subject: '' });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload Resource</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} /><br />

        {/* Department Dropdown */}
        <select name="department" onChange={handleChange} required>
          <option value="">-- Select Department --</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select><br />

        {/* Semester Dropdown */}
        <select name="semester" onChange={handleChange} required>
          <option value="">-- Select Semester --</option>
          {semesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select><br />

        {/* Subject Dropdown */}
        <select name="subject" onChange={handleChange} required>
          <option value="">-- Select Subject --</option>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select><br />

        <input type="file" name="file" onChange={handleFileChange} /><br /><br />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Upload;
