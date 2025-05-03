const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Produits de démonstration (simulés)
let products = [
  { id: 1, title: "Tablette SAM 12 Pouce", image: "samsung-tab-12.png", category: "tablet", price: 2334 },
  { id: 2, title: "IPhone 14", image: "iphone-14.png", category: "phone", price: 11000 },
  { id: 3, title: "Smart TV 48 Pouce", image: "tv-samsung-48.png", category: "smarttv", price: 8000 },
  { id: 4, title: "Tablette SAM 12 Pouce", image: "samsung-tab-12.png", category: "tablet", price: 2334 },
  { id: 5, title: "IPhone 14", image: "iphone-14.png", category: "phone", price: 11000 },
  { id: 6, title: "Smart TV 48 Pouce", image: "tv-samsung-48.png", category: "smarttv", price: 8000 },
  { id: 7, title: "Tablette SAM 12 Pouce", image: "samsung-tab-12.png", category: "tablet", price: 2334 },
  { id: 8, title: "Smart TV 48 Pouce", image: "tv-samsung-48.png", category: "smarttv", price: 8000 },
  { id: 9, title: "Tablette SAM 12 Pouce", image: "samsung-tab-12.png", category: "tablet", price: 2334 },
];

let cart = []; // Panier vide pour le moment

// Route pour obtenir tous les produits
app.get("/api/products", (req, res) => {
  res.send(products); // Renvoie tous les produits
});

// Route pour obtenir un produit spécifique par son ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10); // Récupère l'ID du produit depuis l'URL
  const product = products.find(p => p.id === productId); // Cherche le produit par son ID

  if (product) {
    res.send(product); // Si trouvé, renvoie le produit
  } else {
    res.status(404).send({ message: "Produit non trouvé" }); // Si non trouvé, renvoie une erreur 404
  }
});

// Route pour ajouter des produits au panier
app.post("/api/cart", (req, res) => {
  cart = req.body; // Le corps de la requête contient le panier à sauvegarder
  setTimeout(() => res.status(201).send(), 20); // Envoie une réponse de succès après 20ms
});

// Route pour obtenir les produits du panier
app.get("/api/cart", (req, res) => res.send(cart));

// Démarre le serveur sur le port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});

