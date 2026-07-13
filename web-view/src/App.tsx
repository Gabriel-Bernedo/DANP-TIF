import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './views/LoginView';
import { AdministradoresView } from './views/AdministradoresView';
import { CategoriasView } from './views/CategoriasView';
import { UsersView } from './views/UsersView';
import { ProductsView } from './views/ProductsView';
import { OfertasView } from './views/OfertasView';
import { PedidosView } from './views/PedidosView';
import { CarritosView } from './views/CarritosView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        {/* Usamos administradores como el /admin por defecto o redirigimos */}
        <Route path="/admin" element={<Navigate to="/admin/pedidos" replace />} />
        
        <Route path="/admin/administradores" element={<AdministradoresView />} />
        <Route path="/admin/categorias" element={<CategoriasView />} />
        <Route path="/admin/users" element={<UsersView />} />
        <Route path="/admin/productos" element={<ProductsView />} />
        <Route path="/admin/ofertas" element={<OfertasView />} />
        <Route path="/admin/pedidos" element={<PedidosView />} />
        <Route path="/admin/carritos" element={<CarritosView />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
