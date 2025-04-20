const SelectField = ({ label, name, value, onChange, options, ...props }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          {...props}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option._id || option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectField;
  