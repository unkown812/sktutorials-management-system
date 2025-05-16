import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, Download, Users } from 'lucide-react';
import { MOCK_STUDENTS } from '../data/mockData';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter students based on search term and category
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || student.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const studentCategories = ['All', 'School (8-10th)', 'Junior College (11-12th)', 'Diploma', 'Degree', 'JEE', 'NEET', 'MHCET'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all students enrolled in SK Tutorials
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn-primary flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Student
          </button>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students by name, ID, or email..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {studentCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <button className="btn-secondary flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Students count */}
      <div className="flex items-center text-sm text-gray-500">
        <Users className="h-4 w-4 mr-1" />
        <span>Showing {filteredStudents.length} out of {MOCK_STUDENTS.length} students</span>
      </div>
      
      {/* Students table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Contact</th>
              <th>Enrollment Date</th>
              <th>Fee Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td className="font-medium">{student.name}</td>
                <td>
                  <span className="badge badge-blue">{student.category}</span>
                </td>
                <td>
                  <div>{student.phone}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td>{student.enrollmentDate}</td>
                <td>
                  <span 
                    className={`badge ${
                      student.feeStatus === 'Paid' ? 'badge-green' : 
                      student.feeStatus === 'Partial' ? 'badge-yellow' : 
                      'badge-red'
                    }`}
                  >
                    {student.feeStatus}
                  </span>
                </td>
                <td>
                  <Link 
                    to={`/students/${student.id}`}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{filteredStudents.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded text-sm font-medium bg-gray-50">Previous</button>
          <button className="px-3 py-1 border rounded text-sm font-medium bg-primary text-white">1</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">2</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">3</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Students;