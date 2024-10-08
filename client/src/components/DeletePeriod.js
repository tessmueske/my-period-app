import React from "react";
import { useParams } from "react-router-dom";  
import '../index.css'; 

function DeletePeriod({ handleDelete }) {
  const { period_id } = useParams();  

  const confirmDelete = () => {
    if (window.confirm("are you sure you want to delete this period?")) {
      handleDelete(period_id);  
    }
  };

  return (
    <div>
      <button onClick={confirmDelete}>delete period</button>
    </div>
  );
}

export default DeletePeriod;
