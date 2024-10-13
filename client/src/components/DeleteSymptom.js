import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const DeleteSymptom = ({ selectedPeriod }) => {
  const { periodId, symptomId } = useParams();

  const [symptoms, setSymptoms] = useState([]);

 
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(`/periods/${selectedPeriod.id}/symptoms`);
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

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`/periods/${id}/symptoms/delete`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSymptoms(symptoms.filter(symptom => symptom.id !== id));
        alert('Symptom deleted successfully');
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
      <ul>
        {symptoms.map((symptom) => (
          <li key={symptom.id}>
            {console.log(symptom)}
            <div>
              <span>{symptom.name}</span>
              <button onClick={() => handleDelete(symptom.id)}>delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteSymptom;

