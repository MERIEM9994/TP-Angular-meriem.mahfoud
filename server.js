const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middlewares améliorés
app.use(cors({
  origin: 'http://localhost:4200' // Restreint l'accès au front Angular
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des dossiers statiques
app.use('/assets/images', express.static(path.join(__dirname, 'src/assets/images')));

// Données des produits normalisées
let products = [
  { 
    id: 1, 
    title: "Tablette Samsung 12 Pouces", 
    image: "samsung-tab-12.png", 
    category: "tablette", 
    price: 2334,
    description: "Tablette haut de gamme avec écran AMOLED 12\""
  },
  { 
    id: 2, 
    title: "iPhone 14", 
    image: "iphone-14.png", 
    category: "téléphone", 
    price: 11000,
    description: "Dernier flagship Apple avec écran Super Retina XDR"
  },
  { 
    id: 3, 
    title: "Smart TV Samsung 48 Pouces", 
    image: "tv-samsung-48.png", 
    category: "télévision", 
    price: 8000,
    description: "TV 4K UHD avec technologie QLED"
  },
  // Nouveaux produits ajoutés
  { 
    id: 4, 
    title: "Samsung Galaxy A53", 
    image: "samsung-a53.png", 
    category: "téléphone", 
    price: 3500,
    description: "Smartphone milieu de gamme avec écran 120Hz"
  },
  { 
    id: 5, 
    title: "Samsung Galaxy S21", 
    image: "samsung-s21.png", 
    category: "téléphone", 
    price: 7000,
    description: "Flagship Samsung avec appareil photo professionnel"
  }
];

// Routes API améliorées
app.get('/api/products', (req, res) => {
  // Ajout de la pagination simple
  const limit = parseInt(req.query.limit) || products.length;
  const offset = parseInt(req.query.offset) || 0;
  
  res.json({
    total: products.length,
    data: products.slice(offset, offset + limit)
  });
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ 
      error: "Produit non trouvé",
      availableIds: products.map(p => p.id) 
    });
  }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nServeur API démarré sur http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(`- GET /api/products`);
  console.log(`- GET /api/products/:id\n`);
});