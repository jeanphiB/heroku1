const PG = require("pg");

function getCategories(request, result) {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    //ssl: true,
  });
  client.connect();
  client.query("SELECT c.label, p.* FROM category_products cp INNER JOIN products p ON cp.product_id = p.id INNER JOIN categories c ON cp.category_id = c.id WHERE cp.category_id=$1::uuid", [request.params.id])
    .then((dbresult) => {
      client.end();
      if (dbresult.rows.length === 0) {
        result.render("category", {message: "No data returned from the query."});
      } else {
        result.render("category", {products: dbresult.rows});
      }
    })
    .catch((error) => {
      client.end();
      result.render("category", error);
    });
}

module.exports = getCategories;
