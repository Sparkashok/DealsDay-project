import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/DashboardPage';
import EmployeeForm from './Pages/EmployeeForm';
import EmployeeList from './Pages/EmployeeList';
import EditEmployee from './Pages/EditEmployee';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/employeeForm" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
