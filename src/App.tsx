import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home.page";
import Login from "./pages/Login/Login.page";
import CustomerSignup from "./components/CustomerSignup/CustomerSignup";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { CustomerProvider } from "./contextAPI/customer/customerContextProvider";
import { AdminProvider } from "./contextAPI/admin/adminContextProvider";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import CustomerProtectedRoute from "./protected-routes/CustomerProtectedRoute";

// Lazy-loaded components
const AdminHome = React.lazy(() => import("./pages/AdminHome/AdminHome.page"));
const AdminDashboard = React.lazy(
  () => import("./components/AdminDashboard/AdminDashboard")
);
const ProductsAdmin = React.lazy(
  () => import("./components/ProductsAdmin/ProductsAdmin")
);
const CustomerManagement = React.lazy(
  () => import("./components/CustomerManagement/CutomerManagement")
);
const ProductsPage = React.lazy(() => import("./pages/Products/Products.page"));
const AdminProtectedRoute = React.lazy(
  () => import("./protected-routes/AdminProtectedRoute")
);
const CheckoutPage = React.lazy(() => import("./pages/Checkout/Checkout.page"));
const OrderConfirmation = React.lazy(
  () => import("./components/OrderConfirmation/OrderConfirmation")
);
const ProductDetails = React.lazy(
  () => import("./pages/ProductDetails/ProductDetails")
);

function App() {
  const URL = process.env.REACT_APP_BASE_URL;
  console.log(URL);

  return (
    <div className="App font-metropolis">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
                      <Route
                        path="/checkout"
                        element={
                          <CustomerProtectedRoute>
                            <CheckoutPage />
                          </CustomerProtectedRoute>
                        }
                      />
                      <Route path="/product" element={<ProductDetails />} />
                      <Route
                        path="/order-confirm"
                        element={
                          <CustomerProtectedRoute>
                            <OrderConfirmation />
                          </CustomerProtectedRoute>
                        }
                      ></Route>
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
                      <Route
                        path="/home"
                        element={
                          <AdminProtectedRoute>
                            <AdminHome />
                          </AdminProtectedRoute>
                        }
                      />

                      <Route
                        path="/dashboard"
                        element={
                          <AdminProtectedRoute>
                            <AdminDashboard />
                          </AdminProtectedRoute>
                        }
                      />
                      <Route
                        path="/products"
                        element={
                          <AdminProtectedRoute>
                            <ProductsAdmin />
                          </AdminProtectedRoute>
                        }
                      />
                      <Route
                        path="/customers"
                        element={
                          <AdminProtectedRoute>
                            <CustomerManagement />
                          </AdminProtectedRoute>
                        }
                      />
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
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
