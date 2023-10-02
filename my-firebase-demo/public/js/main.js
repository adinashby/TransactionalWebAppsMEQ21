document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");
  const messageContainer = document.querySelector("#message-container");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        // Send a POST request to the server for login
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          messageContainer.innerHTML = `<p class="success">Login successful!</p>`;
          // Redirect to the dashboard or perform other actions as needed
          window.location.href = "/dashboard";
        } else {
          const errorData = await response.json();
          messageContainer.innerHTML = `<p class="error">${errorData.message}</p>`;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        // Send a POST request to the server for sign-up
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          messageContainer.innerHTML = `<p class="success">Sign-up successful!</p>`;
          // Redirect to the dashboard or perform other actions as needed
          window.location.href = "/dashboard";
        } else {
          const errorData = await response.json();
          messageContainer.innerHTML = `<p class="error">${errorData.message}</p>`;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
});
