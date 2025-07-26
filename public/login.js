document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('message');

  if (!form) {
    console.error('Login form not found!');
    return;
  }

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username =
          form.username?.value || document.getElementById("username")?.value;
      const password =
          form.password?.value || document.getElementById("password")?.value;

      if (!username || !password) {
          showMessage("Please enter both username and password.", "orange");
          return;
      }

      try {
          const res = await fetch("http://localhost:5501/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });

          const data = await res.json();

          if (res.ok) {
              showMessage("Login successful!", "green");
              setTimeout(() => {
                  window.location.href = "../../index.html"; // Adjust path based on your folder structure
              }, 1000); // Optional delay to show the success message
          } else {
              showMessage(data.error || "Login failed. Try again.", "red");
          }
      } catch (err) {
          console.error("Error connecting to server:", err);
          showMessage("Server unreachable. Please try again later.", "red");
      }
  });

  function showMessage(text, color = 'black') {
    if (messageEl) {
      messageEl.textContent = text;
      messageEl.style.color = color;
    }
  }
});