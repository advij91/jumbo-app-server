import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOutlets, deleteOutlet } from "../../../services/outletService";
import Header from "../../components/Header";
import OutletList from "../../components/cards/outlet/OutletList";

const Outlets = () => {
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;
  
  const [visibleOutlets, setVisibleOutlets] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      const userOutlets = user?.outlets || [];
      async function fetchOutlets() {
        const data = await getOutlets();
        if (userRole === "Admin") {
          setVisibleOutlets(data);
        } else if (userRole === "Staff") {
          const filteredOutlets = data.filter((outlet) =>
            userOutlets.includes(outlet._id)
          );
          setVisibleOutlets(filteredOutlets);
        } else {
          navigate("/unauthorized");
        }
      }
      fetchOutlets();
    }
  }, [user, userRole, navigate]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this outlet?")) {
      await deleteOutlet(id);
      setVisibleOutlets(visibleOutlets.filter((outlet) => outlet._id !== id));
    }
  };

  const handleOperationsUpdate = async (updatedOutlet) => {
    setVisibleOutlets((prevOutlets) =>
      prevOutlets.map((outlet) =>
        outlet._id === updatedOutlet._id ? updatedOutlet : outlet
      )
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Outlets</h1>
          {userRole === "Admin" && <button
            className="bg-primary text-light py-2 px-4 rounded hover:bg-secondary"
            onClick={() => navigate("/outlets/add")}
          >
            Add Outlet
          </button>}
        </div>
        <OutletList
          outlets={visibleOutlets}
          onDelete={handleDelete}
          onOperationsUpdate={handleOperationsUpdate}
        />
      </main>
    </>
  );
};

export default Outlets;
