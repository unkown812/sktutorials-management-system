import React from 'react';

const RECENT_PAYMENTS = [
  { id: 1, student: 'Rahul Sharma', amount: '₹8,500', date: '2025-05-12', status: 'Paid', course: 'JEE Advanced' },
  { id: 2, student: 'Priya Patel', amount: '₹7,200', date: '2025-05-11', status: 'Pending', course: 'NEET' },
  { id: 3, student: 'Amit Kumar', amount: '₹5,500', date: '2025-05-10', status: 'Paid', course: '10th Science' },
  { id: 4, student: 'Sneha Desai', amount: '₹9,800', date: '2025-05-09', status: 'Paid', course: '12th PCM' },
  { id: 5, student: 'Vikram Singh', amount: '₹6,250', date: '2025-05-08', status: 'Pending', course: 'Diploma' }
];

const RecentFeePayments: React.FC = () => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {RECENT_PAYMENTS.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.student}</td>
              <td>{payment.course}</td>
              <td>{payment.amount}</td>
              <td>{payment.date}</td>
              <td>
                <span className={`badge ${payment.status === 'Paid' ? 'badge-green' : 'badge-yellow'}`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentFeePayments;