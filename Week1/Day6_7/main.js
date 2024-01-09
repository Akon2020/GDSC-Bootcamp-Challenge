const email = document.getElementById("email").value,
  password = document.getElementById("motdepasse").value,
  btn = document.getElementById("btn"),
  error = document.getElementsByClassName("error"),
  mail = "admin@admin.com",
  passwd = "admin123";

btn.addEventListener("click", () => {
  if (email !== mail && password !== passwd) {
    error.style.display = "flex";
  } else {
  }
});
