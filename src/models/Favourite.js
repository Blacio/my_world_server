const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  id: String,
  name: String,
  code: String
});

mongoose.model('Favourite', favouriteSchema);
