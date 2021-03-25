const express = require("express");
const app = express();
const vipLogin = require("./data/vip_login.json");
const adminLogin = require("./data/admin_login.json");
const admin_permission = require("./data/admin_permission.json")
const vip_permission = require("./data/vip_permission.json")
const url = require("url");

app.get("/login", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  if (user === "admin") {
    res.send(adminLogin)
  } else {
    res.send(vipLogin)
  }
})

app.get("/permission", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  if (user === "admin") {
    res.send(admin_permission)
  } else {
    res.send(vip_permission)
  }
})


app.listen(3300, () => {
  console.log("3300服务器云行")
})
