import React from "react";

const ItemOutletDetails = ({ item, outlets }) => {
  return (
    <div className="list-disc mb-4">
      {item.outletDetails.map(
        (outletDetail) =>
          outlets.some((outlet) => outlet._id === outletDetail.outletId) && (
            <div key={outletDetail.outletId} className="mb-2">
              <span className="font-semibold">
                {
                  outlets.find((outlet) => outlet._id === outletDetail.outletId)
                    ?.name
                }
              </span>
              :{" "}
              <span>
                {outletDetail.isAvailable ? "Available" : "Not Available"}
              </span>
              <br />
              <span>Price: ₹{outletDetail.price}</span>
            </div>
          )
      )}
    </div>
  );
};

export default ItemOutletDetails;
