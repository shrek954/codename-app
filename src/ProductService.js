export async function fetchRandomProduct() {

  const response =
    await fetch(
      "https://dummyjson.com/products"
    );

  const data =
    await response.json();

  const products =
    data.products;

  const randomIndex =
    Math.floor(
      Math.random() *
      products.length
    );

  return products[randomIndex];
}