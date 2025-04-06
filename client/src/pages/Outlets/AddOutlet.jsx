import { useNavigate } from "react-router-dom";
import OutletForm from "../../components/OutletForm";
import { createOutlet } from "../../../services/outletService";

export default function AddOutlet() {
  const navigate = useNavigate();

  const handleSubmit = async (outletData) => {
    await createOutlet(outletData);
    navigate("/outlets");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Outlet</h1>
      <OutletForm onSubmit={handleSubmit} />
    </main>
  );
}