const mongoose = require('mongoose');

const visitedSchmea = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  id: String,
  name: String,
  code: String
});

mongoose.model('Visited', visitedSchmea);
