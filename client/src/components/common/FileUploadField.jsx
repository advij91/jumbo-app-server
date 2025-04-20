const FileUploadField = ({ label, id, onChange }) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="file"
          id={id}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
    );
  };
  
  export default FileUploadField;
  