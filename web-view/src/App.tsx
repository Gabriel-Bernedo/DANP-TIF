import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './views/LoginView';
import { AdminView } from './views/AdminView';
import { UsersView } from './views/UsersView';
import { ProductsView } from './views/ProductsView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/admin/users" element={<UsersView />} />
        <Route path="/admin/products" element={<ProductsView />} />
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
