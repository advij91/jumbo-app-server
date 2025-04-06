import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OutletForm from "../../components/OutletForm";
import { getOutletById, updateOutlet } from "../../../services/outletService";
// import { getOutletById, updateOutlet } from "../services/outletService";

export default function EditOutlet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);

  useEffect(() => {
    async function fetchOutlet() {
      if (id) {
        const data = await getOutletById(id);
        setOutlet(data);
      }
    }
    fetchOutlet();
  }, [id]);

  const handleSubmit = async (outletData) => {
    await updateOutlet(id, outletData);
    navigate("/outlets");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-primary mb-6">Edit Outlet</h1>
      {outlet ? (
        <OutletForm onSubmit={handleSubmit} initialData={outlet} />
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </main>
  );
}