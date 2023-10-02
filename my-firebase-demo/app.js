const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const session = require("express-session");
const ejs = require("ejs");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up session middleware
app.use(
  session({
    secret: "your-secret-key", // Replace 'your-secret-key' with a strong and secure secret key
    resave: false, // Do not save sessions to the store on each request
    saveUninitialized: true, // Save a new session if it's not yet initialized
    cookie: {
      maxAge: 86400000, // Session expiration time in milliseconds (e.g., 1 day)
      secure: false, // Set to true in production if using HTTPS
    },
  })
);

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/dashboard", (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

app.post("/login", async (req, res) => {
  // Authenticate user with Firebase here
  // Example: admin.auth().signInWithEmailAndPassword(email, password)
  // If successful, store user data in the session and redirect to dashboard
  // Otherwise, handle errors

  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    // Authenticate the user with Firebase
    await admin.auth().signInWithEmailAndPassword(email, password);

    // Store user data in the session
    req.session.user = {
      uid: userRecord.uid,
      email: userRecord.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.post("/signup", async (req, res) => {
  // Create a new user with Firebase here
  // Example: admin.auth().createUserWithEmailAndPassword(email, password)
  // If successful, store user data in the session and redirect to dashboard
  // Otherwise, handle errors

  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Store user data in the session
    req.session.user = {
      uid: userRecord.uid,
      email: userRecord.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.get("/logout", (req, res) => {
  // Clear the session and log the user out
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
