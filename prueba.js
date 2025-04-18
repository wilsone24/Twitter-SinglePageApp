// login.js

fetch("http://0.0.0.0:8083/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "darrrr_v",
    password: "123456",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Respuesta del servidor:", data);
  })
  .catch((error) => {
    console.error("Error al hacer fetch:", error);
  });
