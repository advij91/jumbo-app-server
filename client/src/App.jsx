import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Outlets from "./pages/Outlets/Outlets"
import AddOutlet from "./pages/Outlets/AddOutlet"
import EditOutlet from "./pages/Outlets/EditOutlet"
import Items from "./pages/Items/Items"
import AddItem from "./pages/Items/AddItem"
import EditItem from "./pages/Items/EditItem"
import AddCategory from "./pages/Categories/AddCategory"
import Categories from "./pages/Categories/Categories"
import EditCategory from "./pages/Categories/EditCategory"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlets />} />
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

      </Routes>
    </Router>

  )
}

export default App
