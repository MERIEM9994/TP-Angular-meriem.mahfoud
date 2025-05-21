const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const API_BASE = '/api/v1';

// Middleware sécurisé
app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET']
}));
app.use(express.json({ limit: '10kb' }));

// Serve les fichiers statiques
app.use('/assets', express.static(path.join(__dirname, '../src/assets'), {
  maxAge: '1d'
}));

// Middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Requête racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API produits !');
});

// Requête favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Données des produits
const products = [
  {
    id: 1,
    title: "Tablette Samsung 12 Pouces",
    image: "samsung-tab-12.png",
    category: "tablette",
    price: 2334,
    quantity: 5,
    description: "Tablette haut de gamme avec écran AMOLED",
    createdAt: new Date('2023-01-15')
  },
  {
    id: 2,
    title: "iPhone 14 Pro",
    image: "iphone-14-pro.png",
    category: "smartphone",
    price: 1200,
    quantity: 10,
    description: "Dernier modèle iPhone 14 Pro avec écran Super Retina",
    createdAt: new Date('2024-04-01')
  },
  {
    id: 3,
    title: "iPhone 15 Pro",
    image: "iphone-15-pro.png",
    category: "smartphone",
    price: 1500,
    quantity: 7,
    description: "Nouveau iPhone 15 Pro avec processeur A17 et améliorations caméra",
    createdAt: new Date('2024-09-10')
  },
  {
    id: 4,
    title: "Samsung Galaxy A53",
    image: "samsung-a53.png",
    category: "smartphone",
    price: 450,
    quantity: 12,
    description: "Smartphone milieu de gamme avec excellent rapport qualité/prix",
    createdAt: new Date('2023-10-05')
  },
  {
    id: 5,
    title: "Sony WH1000XM5",
    image: "sony-wh1000xm5.png",
    category: "casque-audio",
    price: 350,
    quantity: 8,
    description: "Casque audio Bluetooth à réduction de bruit premium",
    createdAt: new Date('2024-01-20')
  }
];


// Helper pour valider les IDs
const isValidId = (id) => !isNaN(parseInt(id));

// Routes API
app.get(`${API_BASE}/products`, (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
      total: products.length,
      page,
      limit,
      data: products.slice(startIndex, endIndex)
    };

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get(`${API_BASE}/products/:id`, (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'ID de produit invalide' });
    }

    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    const productWithStats = {
      ...product,
      isNew: new Date() - new Date(product.createdAt) < 30 * 24 * 60 * 60 * 1000
    };

    res.json(productWithStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`\nServeur API démarré sur http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(`- GET ${API_BASE}/products`);
  console.log(`- GET ${API_BASE}/products/:id\n`);
});
