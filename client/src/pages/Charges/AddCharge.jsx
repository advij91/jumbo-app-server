import React from 'react';
import ChargeForm from '../../components/ChargeForm';
import { createCharge } from '../../../services/chargesService'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const AddCharge = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        console.log('Form submitted:', formData);
        // Call the createCharge function with the form data
        try {
            await createCharge(formData); // Adjust this function call as per your service
            navigate('/charges'); // Redirect to the charges page after successful creation
        } catch (error) {
            console.error('Error creating charge:', error);
            alert('Error creating charge. Please try again.');
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Charge</h1>
            <ChargeForm onSubmit={handleSubmit} />
        </main>
    );
};

export default AddCharge;