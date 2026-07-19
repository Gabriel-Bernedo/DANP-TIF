import { AxiosHttpClient } from '../http/AxiosHttpClient';
import { ProductService } from '../../services/ProductService';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { PedidoService } from '../../services/PedidoService';
import { OfertaService } from '../../services/OfertaService';
import { CarritoService } from '../../services/CarritoService';
import { CategoriaService } from '../../services/CategoriaService';
import { AdminService } from '../../services/AdminService';

// Initialize the HTTP client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const httpClient = new AxiosHttpClient(API_URL);

// Instantiate services and inject the HTTP client
export const productService = new ProductService(httpClient);
export const authService = new AuthService(httpClient);
export const userService = new UserService(httpClient);
export const pedidoService = new PedidoService(httpClient);
export const ofertaService = new OfertaService(httpClient);
export const carritoService = new CarritoService(httpClient);
export const categoriaService = new CategoriaService(httpClient);
export const adminService = new AdminService(httpClient);
