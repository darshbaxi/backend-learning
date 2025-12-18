const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await Role.insertMany([
        { name: "user" },
        { name: "moderator" },
        { name: "admin" }
      ]);

      console.log("added 'user', 'moderator', and 'admin' to roles collection");
    }
  } catch (err) {
    console.error("error", err);
  }
}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});