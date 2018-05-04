const express = require("express");
const nunjucks = require("nunjucks");

const getCategories = require("./handlers/get_categories");
const getCategory = require("./handlers/get_category");
const getProduct = require("./handlers/get_product");

const app = express();
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.get("/product/:id", getProduct);
app.get("/category/:id", getCategory);
app.get("/", getCategories);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
