import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home.page";
import Login from "./pages/Login/Login.page";
import CustomerSignup from "./components/CustomerSignup/CustomerSignup";
import { CustomerProvider } from "./contextAPI/customer/customerContextProvider";
import { SnackbarProvider } from "notistack";

function App() {
  const URL = process.env.REACT_APP_BASE_URL;
  console.log(URL);
  return (
    <div className="App">
      <BrowserRouter>
        <CustomerProvider>
          <SnackbarProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<CustomerSignup />} />
            </Routes>
          </SnackbarProvider>
        </CustomerProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
