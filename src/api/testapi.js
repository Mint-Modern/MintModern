const baseUrl = "http://localhost:4000/api";
// const token = localStorage.getItem(token);

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
