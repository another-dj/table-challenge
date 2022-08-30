export const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();

    console.log("sucess", json);
    return json;
  } catch (error) {
    console.log("error", error);
  }
};
