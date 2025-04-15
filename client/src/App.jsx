import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Outlets from "./pages/Outlets/Outlets"
import AddOutlet from "./pages/Outlets/AddOutlet"
import EditOutlet from "./pages/Outlets/EditOutlet"
import Items from "./pages/Items/Items"
import AddItem from "./pages/Items/AddItem"
import EditItem from "./pages/Items/EditItem"
import AddCategory from "./pages/Categories/AddCategory"
import Categories from "./pages/Categories/Categories"
import EditCategory from "./pages/Categories/EditCategory"
import Charges from "./pages/Charges/Charges"
import AddCharge from "./pages/Charges/AddCharge"
import EditCharge from "./pages/Charges/EditCharge"
import Coupon from "./pages/Coupons/Coupon"
import EditCoupon from "./pages/Coupons/EditCoupon"
import AddCoupon from "./pages/Coupons/AddCoupon"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        {/* Outlet routes */}
        <Route path="/outlets" element={<Outlets />} />
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
      </Routes>
    </Router>

  )
}

export default App
