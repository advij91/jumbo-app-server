import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFromToken } from "./features/authThunks";
// import Header from "./components/Header"
import Login from "./pages/Auth/Login";
import Unauthorized from "./pages/Auth/Unauthorized";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

import Home from "./pages/Home";
import Outlets from "./pages/Outlets/Outlets";
import AddOutlet from "./pages/Outlets/AddOutlet";
import EditOutlet from "./pages/Outlets/EditOutlet";
import Items from "./pages/Items/Items";
import AddItem from "./pages/Items/AddItem";
import EditItem from "./pages/Items/EditItem";
import AddCategory from "./pages/Categories/AddCategory";
import Categories from "./pages/Categories/Categories";
import EditCategory from "./pages/Categories/EditCategory";
import Charges from "./pages/Charges/Charges";
import AddCharge from "./pages/Charges/AddCharge";
import EditCharge from "./pages/Charges/EditCharge";
import Coupon from "./pages/Coupons/Coupon";
import EditCoupon from "./pages/Coupons/EditCoupon";
import AddCoupon from "./pages/Coupons/AddCoupon";
import Addons from "./pages/Addons/Addons";
import EditAddon from "./pages/Addons/EditAddon";
import AddAddon from "./pages/Addons/AddAddon";
import Orders from "./pages/Orders/Orders";
import AllOrders from "./pages/Orders/AllOrders";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(fetchUserFromToken());
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <span className="loader"></span>
    </div>
  );
}

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          {/* Outlet routes */}
          <Route path="/outlets" element={<Outlets />} />
          </Route>
          <Route element={<ProtectedRoute requiredRoles={["Admin"]} requiredAccess={["Manage Inventory"]}/>}>
          <Route path="/outlets/add" element={<AddOutlet />} />
          <Route path="/outlets/:id" element={<EditOutlet />} />

          {/* Item routes */}
          <Route path="/items" element={<Items />} />
          <Route path="/items/add" element={<AddItem />} />
          <Route path="/items/:id" element={<EditItem />} />

          {/* Category routes */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/categories/:id" element={<EditCategory />} />

          {/* Charges routes */}
          <Route path="/charges" element={<Charges />} />
          <Route path="/charges/add" element={<AddCharge />} />
          <Route path="/charges/:id" element={<EditCharge />} />

          {/* Coupon routes */}
          <Route path="/coupons" element={<Coupon />} />
          <Route path="/coupons/add" element={<AddCoupon />} />
          <Route path="/coupons/:id" element={<EditCoupon />} />

          {/* Addons routes */}
          <Route path="/addons" element={<Addons />} />
          <Route path="/addons/:id" element={<EditAddon />} />
          <Route path="/addons/add" element={<AddAddon />} />

          {/* Orders Routs*/}
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/all" element={<AllOrders />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
