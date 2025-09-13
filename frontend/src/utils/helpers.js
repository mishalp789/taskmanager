// src/utils/helpers.js

// Format date in YYYY-MM-DD for task input fields
export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Capitalize first letter of a string
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Optional: handle API errors
export function handleApiError(error) {
  if (error.response && error.response.data) {
    return error.response.data;
  }
  return error.message || "Something went wrong";
}
