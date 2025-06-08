import OutletCard from "./OutletCard";

const OutletList = ({ outlets, onDelete, onOperationsUpdate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {outlets.map((outlet) => (
        <OutletCard
          key={outlet._id}
          outlet={outlet}
          onDelete={onDelete}
          onOperationsUpdate={onOperationsUpdate}
        />
      ))}
    </div>
  );
};

export default OutletList;