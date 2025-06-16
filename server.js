const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// ======================
// CONFIGURATION
// ======================
const PORT = 3000;
const API_VERSION = 'v1';
const API_BASE = `/api/${API_VERSION}`;

// ======================
// MIDDLEWARES
// ======================
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST']
}));

app.use(express.json({ limit: '10kb' }));

// ======================
// DONNÉES PRODUITS
// ======================
const products = [
  {
    id: 1,
    name: 'Samsung Galaxy A53',
    price: 349.99,
    quantity: 25,
    image: 'samsung-a53.png',
    category: 'smartphone',
    description: 'Smartphone Android avec écran 6.5" AMOLED et quadruple caméra'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22 Ultra',
    price: 1199.99,
    quantity: 12,
    image: 's22-ultra.jpg',
    category: 'smartphone',
    description: 'Flagship avec S-Pen, écran 6.8" Dynamic AMOLED 2X'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S21',
    price: 699.99,
    quantity: 8,
    image: 's21.png',
    category: 'smartphone',
    description: 'Écran 6.2" 120Hz, triple caméra avec zoom spatial'
  },
  {
    id: 4,
    name: 'iPad Air',
    price: 599.99,
    quantity: 15,
    image: 'ipad-air.png',
    category: 'tablette',
    description: 'Tablette Apple avec puce M1 et écran Liquid Retina 10.9"'
  },
  {
    id: 5,
    name: 'iPhone 15 Pro',
    price: 999.99,
    quantity: 10,
    image: 'iphone15-pro.png',
    category: 'smartphone',
    description: 'Titane aerospace-grade, A17 Pro, caméra 48MP'
  },
  {
    id: 6,
    name: 'TV Samsung QLED 4K',
    price: 899.99,
    quantity: 5,
    image: 'samsung-tv.png',
    category: 'télévision',
    description: 'Ecran 55" avec Quantum HDR et Alexa intégrée'
  },
  {
    id: 7,
    name: 'Casque Sony WH-1000XM5',
    price: 399.99,
    quantity: 30,
    image: 'sony-headphones.png',
    category: 'casque',
    description: "Réduction de bruit optimale, 30h d'autonomie"
  },
  {
    id: 8,
    name: 'AirPods Max',
    price: 549.99,
    quantity: 20,
    image: 'airpods-max.png',
    category: 'casque',
    description: 'Casque Apple avec audio spatial et annulation active de bruit'
  }
];


// ======================
// ROUTES API
// ======================
app.get('/', (req, res) => {
  res.send(`API e-commerce fonctionnelle (Version ${API_VERSION})`);
});

// Route pour récupérer la liste des produits au format { data: [...] }
app.get(`${API_BASE}/products`, (req, res) => {
  res.json({ data: products });
});

// Route pour récupérer un produit par son ID
app.get(`${API_BASE}/products/:id(\\d+)`, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: `Produit avec ID ${id} non trouvé` });
  }
});

// ======================
// GESTION DES ASSETS
// ======================
app.use('/assets/images', express.static(path.join(__dirname, 'src/assets/images'), {
  maxAge: '1d',
  fallthrough: false
}));

// ======================
// GESTION DES ERREURS
// ======================
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint non trouvé',
    availableEndpoints: [
      `${API_BASE}/products`,
      `${API_BASE}/products/:id`
    ]
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erreur serveur interne',
    requestId: req.id 
  });
});

// ======================
// LANCEMENT DU SERVEUR
// ======================
app.listen(PORT, () => {
  console.log(`\n🛒 Serveur e-commerce démarré sur http://localhost:${PORT}`);
  console.log(`\nEndpoints disponibles:`);
  console.log(`➡️  ${API_BASE}/products - Liste des produits`);
  console.log(`➡️  ${API_BASE}/products/:id - Détails d'un produit`);
  console.log(`\n📁 Assets statiques: http://localhost:${PORT}/assets/images/[nom-image]`);
});

