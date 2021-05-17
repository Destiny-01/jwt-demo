const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const secret = "mySecret";
app.post("/sign-token", (req, res) => {
  // mongodb+srv://aigbe_destiny:Destiny1@cluster0.7bohx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  const payload = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    id: req.body.id,
  };
  if (!payload.firstname || !payload.lastname || !payload.id) {
    return res.status(500).json({ message: "all fields are required" });
  }
  const expiry = 36000;
  jwt.sign(payload, secret, { expiresIn: expiry }, () => {});

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
