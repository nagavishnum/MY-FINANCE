import { JWT_SECRET, userId } from "../../../constants/constants";

export const getApiData = async (type) => {
  try {
    const res = await fetch(`http://localhost:5000/api/finance/${type}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT_SECRET}`
      }
    });

    if ([200, 201].includes(res.status)) {
      return await res?.json();
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export const UpdateData = async (category, uId, formData) => {
  try {
    const res = await fetch(`http://localhost:5000/api/finance/${category}/${userId}/${uId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT_SECRET}`
      },
      body: JSON.stringify(formData)
    });
    return res.ok;
  } catch (e) {
    return false
  }
}

export const AddData = async (category, formData) => {
  try {
    const res = await fetch(`http://localhost:5000/api/finance/${category}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT_SECRET}`
      },
      body: JSON.stringify(formData)
    });
    return res.ok;
  } catch (e) {
    return false
  }
}

export const DeleteData = async (route, uId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/finance/${route}/${userId}/${uId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT_SECRET}`
      },
    });
    return res.ok;
  } catch (e) {
    return false
  }
}