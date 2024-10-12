const express = require("express");
const app = express();
const port = 8007;
const prisma = require("./db/prisma");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-user", async (req, res) => {
  try {
    let {name, email, password} = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({success: false, message: "Missing some required input"});
    }

    if (name && email && password) {
      await prisma.User.create({
        data: {
          name,
          email,
          password,
        },
      });
      return res.status(200).json({success: true});
    }
  } catch (e) {
    return res
      .status(500)
      .json({success: false, message: "Internal server error"});
  }
});

app.get("/users", async (req, res) => {
  try {
    let users = await prisma.users.findMany();
    return res.status(200).json(users);
  } catch (e) {
    return res
      .status(500)
      .json({success: false, message: "Internal server error"});
  }
});

app.listen(port, () => {
  console.log(`Timezone test app listening on port ${port}`);
});
