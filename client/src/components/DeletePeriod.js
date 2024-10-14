import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DeletePeriod({ selectedPeriod, setSelectedPeriod }) {
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:5555/periods/${selectedPeriod.id}`, {
      method: "DELETE",
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          setSelectedPeriod(null);
          setShowSuccessPopup(true); 
          setTimeout(() => {
            navigate("/all_periods");
          }, 2000); 
        } else {
          console.error("Failed to delete the period");
        }
      })
      .catch((error) => {
        console.error("Deletion failed:", error);
      });
  };

  const handleBackToPeriod = () => {
    navigate("/all_periods");
  };

  return (
    <div className="centered-container">
      {!showSuccessPopup ? ( 
        selectedPeriod ? (
          <>
            <p>
              are you sure you want to delete the period of dates {selectedPeriod.start_date} through {selectedPeriod.end_date}?
            </p>
            <button className="button" onClick={handleDelete}>yes, delete</button>
            <button className="button" onClick={handleBackToPeriod}>no, take me back</button>
          </>
        ) : (
          <p>no period selected</p>
        )
      ) : (
        <p>period deleted successfully. returning to calendar...</p>
      )}
    </div>
  );
}

export default DeletePeriod;