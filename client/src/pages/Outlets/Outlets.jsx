import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOutlets, deleteOutlet } from "../../../services/outletService";
import Header from "../../components/Header";
import GoogleMapView from "../../components/GoogleMapView";
import OutletList from "../../components/cards/outlet/OutletList";

const Outlets = () => {
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOutlets() {
      const data = await getOutlets();
      setOutlets(data);
    }
    fetchOutlets();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this outlet?")) {
      await deleteOutlet(id);
      setOutlets(outlets.filter((outlet) => outlet._id !== id));
    }
  };

  const handleEdit = async (id) => {
    navigate(`/outlets/${id}`); 
  };


  const handleOperationsUpdate = async (updatedOutlet) => {
    setOutlets((prevOutlets) =>
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
          <button
            className="bg-primary text-light py-2 px-4 rounded hover:bg-secondary"
            onClick={() => navigate("/outlets/add")}
          >
            Add Outlet
          </button>
        </div>
        <OutletList outlets={outlets} onDelete={handleDelete} onOperationsUpdate={handleOperationsUpdate}/>
        {/* <ul className="mt-6 space-y-4">
          {outlets &&
            outlets.map((outlet) => (
              <li
                key={outlet._id}
                className="bg-white shadow p-4 rounded border border-light"
              >
                <h2 className="text-xl font-semibold text-primary">
                  {outlet.name}
                </h2>
                <p className="text-secondary">{outlet.address}</p>
                <p className="text-secondary">{outlet.city}</p>
                <p className="text-secondary">{outlet.state}</p>
                <p className="text-secondary">{outlet.pin}</p>
                <p className="text-secondary">{outlet.contact}</p>
                <div className="w-full md:w-72 h-48 rounded overflow-hidden border border-gray-200 shadow-sm mt-2">
                  {outlet.location?.coordinates && (
                    <GoogleMapView
                      latitude={outlet.location.coordinates[1]}
                      longitude={outlet.location.coordinates[0]}
                      zoom={14}
                    />
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
                    onClick={() => navigate(`/outlets/${outlet._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
                    onClick={() => handleDelete(outlet._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul> */}
      </main>
    </>
  );
};

export default Outlets;
