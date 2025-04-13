import { useNavigate } from "react-router-dom";
import OutletForm from "../../components/OutletForm";
import { createOutlet } from "../../../services/outletService";
import Header from "../../components/Header";

export default function AddOutlet() {
  const navigate = useNavigate();

  const handleSubmit = async (outletData) => {
    await createOutlet(outletData);
    navigate("/outlets");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Outlet</h1>
        <OutletForm onSubmit={handleSubmit} />
      </main>
    </>
  );
}
