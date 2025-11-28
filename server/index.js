require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

app.use(cors());
app.use(express.json());

// Simulated in-memory users (same as frontend simulation)
const users = [
  { email: 'iago@gmail.com', password: 'senha', name: 'Iago Tutor' }
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'E-mail ou senha inválidos' });
  }

  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ success: true, token, message: 'Login bem-sucedido' });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const exists = users.some(u => u.email === email);
  if (exists) return res.status(400).json({ success: false, message: 'E-mail já em uso' });
  users.push({ name, email, password });
  return res.json({ success: true, message: 'Cadastro bem-sucedido' });
});

app.post('/api/verify', (req, res) => {
  // Expect token in Authorization header or body
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.body.token || null);
  if (!token) return res.status(400).json({ success: false, message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ success: true, decoded });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido ou expirado' });
  }
});

app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));
