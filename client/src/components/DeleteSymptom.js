import React from "react";
import { useParams } from "react-router-dom";  
import '../index.css'; 

function DeleteSymptom({ handleSymptomDelete }) {
  const { symptom_id } = useParams();  

  const confirmDeleteSymptom = () => {
    if (window.confirm("are you sure you want to delete this symptom?")) {
      handleSymptomDelete(symptom_id);  
    }
  };

  return (
    <div>
      <button onClick={confirmDeleteSymptom}>delete symptom</button>
    </div>
  );
}

export default DeleteSymptom;
