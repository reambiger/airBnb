import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchApartmentById } from '../api';

const ApartmentData = ({apartmentId}) => {
      
        const { data, isLoading, error } = useQuery({
          queryKey: ["apartment", apartmentId],
          queryFn: () => fetchApartmentById(apartmentId),
        });
      
        
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
      
  return (
    <div>ApartmentData</div>
  )
}

export default ApartmentData