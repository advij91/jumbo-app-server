import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAddonById, updateAddon } from "../../../services/addonsService";
import AddonForm from "../../components/AddonForm";
import Header from "../../components/Header";

const EditAddon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [addonData, setAddonData] = useState(null);

    useEffect(() => {
        const fetchAddon = async () => {
            if (id) {
                const response = await getAddonById(id);
                setAddonData(response.data);
            }
        }
        fetchAddon();
    }
    , [id]);

    const handleSubmit = async (addonData) => {
        await updateAddon(id, addonData);
        navigate("/addons");
    }

    if (!addonData) return <div className="text-center text-gray-600">Loading Addon...</div>;

    const handleCancel = () => {
        navigate("/addons");
    };


  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Edit Addon</h1>
        {addonData ? (
          <AddonForm onSubmit={handleSubmit} onCancel={handleCancel} initialData={addonData} />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </main>
    </>
  )
}

export default EditAddon