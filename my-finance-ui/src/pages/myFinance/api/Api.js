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

export const UpdateData = async (category, uId, formData) => {
  const res = await fetch(`http://localhost:5000/api/finance/${category}/${userId}/${uId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT_SECRET}` // If authentication is needed
    },
    body: JSON.stringify(formData)
  });
  return res;
}

export const AddData = async (category, formData) => {
  const res = await fetch(`http://localhost:5000/api/finance/${category}/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT_SECRET}` // If authentication is needed
    },
    body: JSON.stringify(formData)
  });
  return res;
}