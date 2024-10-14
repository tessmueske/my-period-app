import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const DeleteSymptom = ({ selectedPeriod }) => {

  const [symptoms, setSymptoms] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(`http://localhost:5555/periods/${selectedPeriod.id}/symptoms`);
        if (!response.ok) {
          throw new Error('Failed to fetch symptoms');
        }
        const data = await response.json();
        setSymptoms(data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSymptoms();
  }, [selectedPeriod]); 

  const handleDelete = async (periodId, symptomId) => {
    try {
      const response = await fetch(`http://localhost:5555/periods/${periodId}/symptoms/${symptomId}/delete`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setSymptoms(symptoms.filter(symptom => symptom.id !== symptomId));
        alert('Symptom deleted successfully');
        navigate("/all_periods")
      } else {
        throw new Error('Failed to delete symptom');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3 className="centered-container">select a symptom to delete</h3>
      <ul className="symptom-list">
        {symptoms.map((symptom) => (
          <li key={symptom.id} className="symptom-item">
            <div className="symptom-details">
              <span>{symptom.name}</span>
              <br />
              <button onClick={() => handleDelete(selectedPeriod.id, symptom.id)} className='button'>delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteSymptom;