import axios from "axios";
axios.defaults.withCredentials = true;
export const userEnterWebsite = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/userEnterWebsite?page=${page}&limit=${12}`
    );
    return response.data;
  } catch (error) {
    console.error(error.response.statusText);
  }
};
export const fetchApartments = async (page) => {
  let apiRequest;
  try {
    apiRequest = sessionStorage.getItem("apiRequest");
    if (!apiRequest) {
      sessionStorage.setItem(
        "apiRequest",
        "http://localhost:8000/userEnterWebsite?"
      );
      apiRequest = "http://localhost:8000/userEnterWebsite?";
    }
    const response = await axios.get(`${apiRequest}&page=${page}&limit=12`);
    return response.data;
  } catch (error) {
    console.error(error.response.statusText);
  }
};

export const fetchApartmentById = async (apartmentId) => {
  try {
    const response = axios.get(
      `http://localhost:8000/getApartment/${apartmentId}`
    );
    return (await response).data.apartment;
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/register`,
      userData
    );
  } catch (error) {
    throw new Error("this email is already exist ")
  }
};
export const logUserIn = async (userData) => {
  try {
    const { password, email } = userData;
    const response = await axios.get(
      `http://localhost:8000/logIn?password=${password}&email=${email}`,
      userData
    
    );
    return response.data.user.fullName
  } catch (error) {
    console.log(error);
  }
};

export const bookApartment = async (
  apartmentId,
  payment,
  startDate,
  endDate
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/bookApartment/${apartmentId}`,
      {
        payment,
        startDate,
        endDate,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response
  }
};
