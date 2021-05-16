const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const secret = "mySecret";
app.post("/create-token", (req, res) => {
  const payload = {
    username: req.body.username,
    id: req.body.id,
  };
  const expiry = 36000;

  jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ token });
    }
    ``;
  });
});

app.get("/decode-token", (req, res) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: "authentication token is required" });
  }
  const authHeader = req.headers.authorization;
  const splittedString = authHeader.split(" ");
  const token = splittedString[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(500).json({ token });
    } else {
      return res.status(200).json({ user: decodedToken });
    }
  });
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
