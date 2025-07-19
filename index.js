const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Home route
app.get("/", async (req, res) => {
  try {
    const category = req.query.category || "Any";
    const apiUrl = `https://v2.jokeapi.dev/joke/${category}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    let joke;
    if (data.type === "single") {
      joke = data.joke;
    } else {
      joke = `${data.setup} ... ${data.delivery}`;
    }

    res.render("index", { joke });
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.render("index", { joke: "Oops! Could not fetch a joke right now." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
