import React, { useState } from 'react';
import { PlusCircle, Search, Filter, Download, CreditCard } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_FEE_HISTORY } from '../data/mockData';

const Fees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Create fee summary data by combining student info with their payments
  const feeSummary = MOCK_STUDENTS.map(student => {
    // Get all payments for this student
    const payments = MOCK_FEE_HISTORY.filter(fee => fee.studentId === student.id);
    
    // Calculate total amount and amount paid
    const totalAmount = payments.reduce((sum, fee) => sum + fee.amount, 0);
    const amountPaid = payments
      .filter(fee => fee.status === 'Paid')
      .reduce((sum, fee) => sum + fee.amount, 0);
    
    // Calculate amount due
    const amountDue = totalAmount - amountPaid;
    
    // Determine actual status (may be different from student.feeStatus)
    let actualStatus;
    if (amountDue === 0 && totalAmount > 0) {
      actualStatus = 'Paid';
    } else if (amountPaid > 0) {
      actualStatus = 'Partial';
    } else {
      actualStatus = 'Unpaid';
    }
    
    return {
      id: student.id,
      name: student.name,
      category: student.category,
      course: student.course,
      totalAmount,
      amountPaid,
      amountDue,
      status: actualStatus,
      lastPaymentDate: payments.length > 0 
        ? payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
        : '-'
    };
  });
  
  // Filter fee summary based on search term and status filter
  const filteredFeeSummary = feeSummary.filter(fee => {
    const matchesSearch = 
      fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.id.toString().includes(searchTerm) ||
      fee.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || fee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Calculate total statistics
  const totalFees = filteredFeeSummary.reduce((sum, fee) => sum + fee.totalAmount, 0);
  const totalCollected = filteredFeeSummary.reduce((sum, fee) => sum + fee.amountPaid, 0);
  const totalPending = filteredFeeSummary.reduce((sum, fee) => sum + fee.amountDue, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fee Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage fee payments for all students
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn-primary flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Record New Payment
          </button>
        </div>
      </div>
      
      {/* Fee summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Fees</p>
              <p className="text-2xl font-semibold">₹{totalFees.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-green-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Collected</p>
              <p className="text-2xl font-semibold text-green-700">₹{totalCollected.toLocaleString()}</p>
              <p className="text-sm text-green-700">
                {totalFees > 0 ? `${Math.round((totalCollected / totalFees) * 100)}% of total` : '0% of total'}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CreditCard className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </div>
        
        <div className="card bg-red-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-red-700">₹{totalPending.toLocaleString()}</p>
              <p className="text-sm text-red-700">
                {totalFees > 0 ? `${Math.round((totalPending / totalFees) * 100)}% of total` : '0% of total'}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <CreditCard className="h-6 w-6 text-red-700" />
            </div>
          </div>
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
            placeholder="Search by student name, ID, or category..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
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
      
      {/* Fee Management table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Total Amount</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
              <th>Last Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredFeeSummary.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.id}</td>
                <td className="font-medium">{fee.name}</td>
                <td>
                  <span className="badge badge-blue">{fee.category}</span>
                </td>
                <td>₹{fee.totalAmount.toLocaleString()}</td>
                <td className="text-green-700">₹{fee.amountPaid.toLocaleString()}</td>
                <td className="text-red-700">₹{fee.amountDue.toLocaleString()}</td>
                <td>
                  <span 
                    className={`badge ${
                      fee.status === 'Paid' ? 'badge-green' : 
                      fee.status === 'Partial' ? 'badge-yellow' : 
                      'badge-red'
                    }`}
                  >
                    {fee.status}
                  </span>
                </td>
                <td>{fee.lastPaymentDate}</td>
                <td>
                  <button className="text-primary hover:text-primary-dark font-medium">
                    {fee.amountDue > 0 ? 'Collect' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
            {filteredFeeSummary.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No fee records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{filteredFeeSummary.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded text-sm font-medium bg-gray-50">Previous</button>
          <button className="px-3 py-1 border rounded text-sm font-medium bg-primary text-white">1</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">2</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Fees;