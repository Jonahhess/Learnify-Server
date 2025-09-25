const express = require("express");
const app = express();

app.use((req, res, next) => {
  const userId = req.user._id;
  const paramId = req.param.id;

  if (!userId.toString() === paramId) {
    next({ message: "user doesn't match url param" });
    return;
  }
  next();
});
