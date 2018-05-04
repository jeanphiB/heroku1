const PG = require("pg");

function getCategories(request, result) {
  const client = new PG.Client();
  client.connect();
  client.query("SELECT * FROM categories", [])
    .then((dbresult) => {
      client.end();
      result.render("categories", {rows: dbresult.rows});
    })
    .catch((error) => {
      client.end();
      result.render("categories", error);
    });
}

module.exports = getCategories;
