
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


if (!JWT_SECRET) {
  console.error('⚠️ JWT_SECRET non défini dans .env');
  process.exit(1);
}

// Données simulées
let orders = [
  {
    id: 1,
    userId: 2,
    customerName: 'Aya',
    date: '2025-06-19',
    status: 'en cours',
    totalAmount: 199.99,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 }
    ]
  },
  {
    id: 2,
    userId: 1,
    customerName: 'Meriem',
    date: '2025-06-18',
    status: 'expédiée',
    totalAmount: 99.99,
    items: [
      { productId: 5, quantity: 1 }
    ]
  }
];

// Statuts valides (en minuscule, accents OK)
const validStatuses = ['en cours', 'expédiée', 'livrée'];

// Middleware auth
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Header Authorization manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}

// Middleware admin
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès refusé : admin uniquement' });
  next();
}

// Validation items commande
function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) return false;
  for (const item of items) {
    if (
      typeof item !== 'object' ||
      typeof item.productId !== 'number' ||
      item.productId <= 0 ||
      typeof item.quantity !== 'number' ||
      item.quantity <= 0
    ) {
      return false;
    }
  }
  return true;
}

// Routes

// GET all orders (admin)
router.get('/', authMiddleware, adminOnly, (req, res) => {
  res.json(orders);
});

// GET orders by user
router.get('/user/:userId', authMiddleware, (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ message: 'ID utilisateur invalide' });

    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const userOrders = orders.filter(o => o.userId === userId);
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
});

// POST create order
router.post('/', authMiddleware, (req, res) => {
  try {
    const { customerName, items, totalAmount } = req.body;
    if (!customerName || typeof customerName !== 'string' || customerName.trim() === '') {
      return res.status(400).json({ message: 'Nom client invalide' });
    }

    if (!validateItems(items)) {
      return res.status(400).json({ message: 'Items invalides' });
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ message: 'Montant total invalide' });
    }

    const newOrder = {
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      userId: req.user.id,
      customerName: customerName.trim(),
      date: new Date().toISOString().split('T')[0],
      status: 'en cours',
      totalAmount,
      items
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
});

// PATCH update order status (admin)
router.patch('/:id/status', authMiddleware, adminOnly, (req, res) => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) return res.status(400).json({ message: 'ID commande invalide' });

    let { status } = req.body;
    if (typeof status !== 'string') return res.status(400).json({ message: 'Statut invalide' });

    status = status.trim().toLowerCase();

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const order = orders.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    order.status = status;
    res.json({ message: 'Statut mis à jour', order });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
});

module.exports = router;


