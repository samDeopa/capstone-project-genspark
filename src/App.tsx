import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home.page";
import Login from "./pages/Login/Login.page";
import CustomerSignup from "./components/CustomerSignup/CustomerSignup";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { CustomerProvider } from "./contextAPI/customer/customerContextProvider";
import { AdminProvider } from "./contextAPI/admin/adminContextProvider";
import { SnackbarProvider } from "notistack";
import AdminHome from "./pages/AdminHome/AdminHome.page";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProductsAdmin from "./components/ProductsAdmin/ProductsAdmin";
import CustomerManagement from "./components/CustomerManagement/CutomerManagement";
import ProductsPage from "./pages/Products/Products.page";

function App() {
  const URL = process.env.REACT_APP_BASE_URL;
  console.log(URL);

  return (
    <div className="App font-metropolis">
      <BrowserRouter>
        <SnackbarProvider>
          <Routes>
            {/* Public/Customer Routes */}
            <Route
              path="/*"
              element={
                <CustomerProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<CustomerSignup />} />
                    <Route path="/products" element={<ProductsPage />} />
                  </Routes>
                </CustomerProvider>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <AdminProvider>
                  <Routes>
                    <Route path="/login" element={<AdminLogin />} />
                    <Route path="/home" element={<AdminHome />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/products" element={<ProductsAdmin />} />
                    <Route path="/customers" element={<CustomerManagement />} />
                    {/* <Route
                      path="/adminDashboard"
                      element={<AdminDashboard />}
                    /> */}
                  </Routes>
                </AdminProvider>
              }
            />
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
