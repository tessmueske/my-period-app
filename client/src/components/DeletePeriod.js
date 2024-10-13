import { useNavigate } from "react-router-dom";

function DeletePeriod({ selectedPeriod, setSelectedPeriod }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`http://localhost:5555/periods/${selectedPeriod.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setSelectedPeriod(null);
          navigate("/all_periods");
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
      <p>
        are you sure you want to delete the period of dates {selectedPeriod.start_date} through {selectedPeriod.end_date}?
      </p>
      <button className="button" onClick={handleDelete}>yes, delete</button>
      <button className="button" onClick={handleBackToPeriod}>no, take me back</button>
    </div>
  );
}

export default DeletePeriod;
