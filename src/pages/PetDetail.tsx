import React from 'react';
import { useParams } from 'react-router-dom';

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Pet Detail: {id}</h1>
    </div>
  );
};

export default PetDetail;
