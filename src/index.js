require('./models/User');
require('./models/Message');
require('./models/Favourite');
require('./models/Visited');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const authRoutes = require('./routes/authRoutes');
const travelRoutes = require('./routes/travelRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(travelRoutes);
app.use(messageRoutes);

const mongoUri = '*****';
if (!mongoUri) {
  throw new Error(
    `Mongo key not set`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
