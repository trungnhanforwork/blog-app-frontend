const getUserProfile = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/account/profile/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

const changeUserProfile = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/account/update/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update user profile");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
const changePassword = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/account/changepassword/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to change password");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error changing user password:", error);
    throw error;
  }
};


export { getUserProfile, changeUserProfile, changePassword };
