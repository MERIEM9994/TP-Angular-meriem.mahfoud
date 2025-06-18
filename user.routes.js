const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'uneCleSecretePourJWT123!'; // À sécuriser en production

const users = [
  { id: 1, name: 'Meriem', email: 'meriem@example.com', password: 'pass456', role: 'admin' },
  { id: 2, name: 'Aya', email: 'aya@example.com', password: 'pass123', role: 'user' }
];

// Middleware simple d’authentification par token JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Non autorisé : header Authorization manquant' });
  }

  const token = authHeader.split(' ')[1]; // format attendu "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé : token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // on ajoute les infos utilisateur décodées à la requête
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}

// Route POST /login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  const { password: pwd, ...userData } = user;
  res.json({ user: userData, token });
});

// Route POST /register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Champs manquants : name, email et password sont requis.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email déjà utilisé.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: 'user'
  };
  users.push(newUser);

  const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  const { password: pwd, ...userData } = newUser;
  res.status(201).json({ user: userData, token });
});

// Route GET /profile/:id protégée par authMiddleware
router.get('/profile/:id', authMiddleware, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  const { password, ...userData } = user;
  res.json(userData);
});

module.exports = router;
