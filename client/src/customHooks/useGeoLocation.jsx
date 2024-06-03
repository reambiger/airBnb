import axios from "axios";

export const useGeoLocation = () => {
  const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `http://localhost:8000/getLocation?latitude=${latitude}&longitude=${longitude}`
              );
              resolve({ initialAddress: response.data.address });
            } catch (error) {
              console.error("Error fetching location details:", error);
              resolve({ initialAddress: null });
            }
          },
          (error) => {
            console.error("Error getting user location at browser:", error);
            resolve({ initialAddress: null });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve({ initialAddress: null });
      }
    });
  };
  return{getUserLocation}
};
