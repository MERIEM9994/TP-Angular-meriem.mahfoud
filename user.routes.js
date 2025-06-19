const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'uneCleSecretePourJWT123!'; // À sécuriser en production

const users = [
  { id: 1, name: 'Meriem', email: 'meriem@example.com', password: 'pass456', role: 'admin' },
  { id: 2, name: 'Aya', email: 'aya@example.com', password: 'pass123', role: 'user' }
];

// Middleware d'authentification
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Auth failed: header Authorization manquant');
    return res.status(401).json({ message: 'Non autorisé : header Authorization manquant' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Auth failed: token manquant');
    return res.status(401).json({ message: 'Non autorisé : token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Auth failed: token invalide ou expiré', err.message);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}

// Middleware vérification rôle admin
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    console.log('Accès refusé : rôle non admin', req.user.role);
    return res.status(403).json({ message: 'Accès refusé : vous devez être administrateur.' });
  }
  next();
}

// Routes publiques

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    console.log('Login failed: email ou mot de passe incorrect');
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  const { password: pwd, ...userData } = user;
  res.json({ user: userData, token });
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log('Register failed: champs manquants');
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    console.log('Register failed: email déjà utilisé', email);
    return res.status(409).json({ message: 'Email déjà utilisé.' });
  }

  const newUser = { id: users.length + 1, name, email, password, role: 'user' };
  users.push(newUser);

  const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  const { password: pwd, ...userData } = newUser;
  res.status(201).json({ user: userData, token });
});

// Profil utilisateur
router.get('/profile/:id', authMiddleware, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (!user) {
    console.log('Profil non trouvé pour id:', userId);
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  const { password, ...userData } = user;
  res.json(userData);
});

// --- ROUTES ADMIN ---

// Liste des utilisateurs
router.get('/', authMiddleware, adminOnly, (req, res) => {
  console.log('GET /users - list users requested by:', req.user.email);
  const usersSansMdp = users.map(({ password, ...rest }) => rest);
  res.json(usersSansMdp);
});

// Ajout d’un utilisateur
router.post('/', authMiddleware, adminOnly, (req, res) => {
  console.log('POST /users - ajout utilisateur demandé par:', req.user.email);
  console.log('Body reçu:', req.body);

  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    console.log('Ajout échoué: champs manquants');
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    console.log('Ajout échoué: email déjà utilisé', email);
    return res.status(409).json({ message: 'Email déjà utilisé.' });
  }

  const newUser = { id: users.length + 1, name, email, password, role };
  users.push(newUser);
  console.log('Utilisateur ajouté:', newUser);

  const { password: pwd, ...userData } = newUser;
  res.status(201).json(userData);
});

// Suppression utilisateur
router.delete('/:id', authMiddleware, adminOnly, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    console.log('Suppression échouée: utilisateur non trouvé id:', userId);
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  users.splice(index, 1);
  console.log('Utilisateur supprimé id:', userId);
  res.status(204).send();
});

module.exports = router;
