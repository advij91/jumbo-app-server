import { useState } from "react";
import GoogleMapView from "./GoogleMapView";

export default function OutletForm({ onSubmit, initialData = {} }) {
  // Extract initial coordinates if editing
  const initialLat =
    initialData.location?.coordinates?.[1] !== undefined
      ? initialData.location.coordinates[1]
      : "";
  const initialLng =
    initialData.location?.coordinates?.[0] !== undefined
      ? initialData.location.coordinates[0]
      : "";

  const [form, setForm] = useState({
    name: initialData.name || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    pin: initialData.pin || "",
    lat: initialLat,
    lng: initialLng,
    contact: initialData.contact || "",
    alternateContact: initialData.alternateContact || "",
  });
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const longitude = parseFloat(form.lng);
    const latitude = parseFloat(form.lat);

    const locationObj = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    onSubmit({
      name: form.name,
      address: form.address,
      city: form.city,
      state: form.state,
      pin: form.pin,
      contact: form.contact,
      alternateContact: form.alternateContact,
      location: locationObj,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg lg:max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {[
        { label: "Name", name: "name", required: true },
        { label: "Address", name: "address", required: true },
        { label: "City", name: "city", required: true },
        { label: "State", name: "state", required: true },
        { label: "Pin", name: "pin", required: true },
        { label: "Contact", name: "contact", required: true },
        { label: "Alternate Contact", name: "alternateContact", required: false },
      ].map(({ label, name, required }) => (
        <div className="mb-4" key={name}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}:
          </label>
          <input
            name={name}
            value={form[name]}
            onChange={handleChange}
            required={required}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Location (Latitude, Longitude):
        </label>
        <div className="flex space-x-2 mb-2 justify-between">
          <input
            type="number"
            name="lat"
            value={form.lat}
            onChange={handleChange}
            placeholder="Latitude"
            required
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="number"
            name="lng"
            value={form.lng}
            onChange={handleChange}
            placeholder="Longitude"
            required
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-secondary"
            onClick={() => setShowMap(true)}
          >
            Show Location in Map
          </button>
        </div>
        {showMap &&
          form.lat &&
          form.lng &&
          !isNaN(parseFloat(form.lat)) &&
          !isNaN(parseFloat(form.lng)) && (
            <div className="w-full h-64 mt-2 rounded overflow-hidden border border-gray-200 shadow-sm">
              <GoogleMapView
                latitude={parseFloat(form.lat)}
                longitude={parseFloat(form.lng)}
                zoom={15}
              />
            </div>
          )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
}