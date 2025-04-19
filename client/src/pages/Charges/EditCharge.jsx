import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getChargeById, updateCharge } from "../../../services/chargesService";
import ChargeForm from "../../components/ChargeForm";
import Header from "../../components/Header";

const EditCharge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [charge, setCharge] = useState(null);

  useEffect(() => {
    async function fetchCharge() {
      if (id) {
        const data = await getChargeById(id);
        setCharge(data);
      }
    }
    fetchCharge();
  }, [id]);

  const handleSubmit = async (chargeData) => {
    console.log("Form submitted:", chargeData);
    await updateCharge(id, chargeData);
    navigate("/charges");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Edit Charge</h1>
        {charge ? (
          <ChargeForm onSubmit={handleSubmit} initialData={charge} />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </main>
    </>
  );
};

export default EditCharge;
