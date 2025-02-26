import { JWT_SECRET, userId } from "../../../constants/constants";

  export const getApiData = async (type) => {
    const res = await fetch(`http://localhost:5000/api/finance/${type}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT_SECRET}` // If authentication is needed
      }
    });


    if ([200, 201].includes(res.status)) {
      return await res?.json();
    }
    return [];
  }