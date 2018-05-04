const PG = require("pg");

function getProduct(request, result) {
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM products WHERE id = $1::uuid",
    [request.params.id])
    .then((dbresult) => {
      client.end();
      if (dbresult.rows.length === 0) {
        result.render("product", {message: "No data returned from the query."});
      } else {
        const product = dbresult.rows[0];
        result.render("product", {product: product});
      }
    })
    .catch((error) => {
      client.end();
      result.render("product", error);
    }
  );
}

module.exports = getProduct;
