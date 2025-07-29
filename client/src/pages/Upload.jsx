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
    <div className="upload-container">
      <style>
        {`
          .upload-container {
            max-width: 500px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #fafafa;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }

          .upload-container h2 {
            text-align: center;
            margin-bottom: 1.5rem;
            color: #333;
          }

          .upload-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .upload-form input[type="text"],
          .upload-form select,
          .upload-form input[type="file"] {
            padding: 0.6rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 6px;
          }

          .upload-form input[type="file"] {
            border: none;
          }

          .upload-form button {
            padding: 0.7rem;
            font-size: 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .upload-form button:hover {
            background-color: #0056b3;
          }

          .upload-message {
            margin-top: 1rem;
            text-align: center;
            font-weight: 500;
            color: #28a745;
          }
        `}
      </style>

      <h2>Upload Resource</h2>
      <form className="upload-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />

        <select name="department" onChange={handleChange} required>
          <option value="">-- Select Department --</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select name="semester" onChange={handleChange} required>
          <option value="">-- Select Semester --</option>
          {semesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>

        <select name="subject" onChange={handleChange} required>
          <option value="">-- Select Subject --</option>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default Upload;
