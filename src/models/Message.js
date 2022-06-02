const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: Number,
  name: String,
  message: String,
  code: String
});

mongoose.model('Message', messageSchema);
