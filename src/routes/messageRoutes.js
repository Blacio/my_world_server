const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Message = mongoose.model('Message');

const router = express.Router();

router.use(requireAuth);

router.post('/messages', async (req,res) => {
  const messages = await Message.find({code: req.body.code});
  res.send({messages: messages, id: req.user._id});
})


router.post('/newMessage', async(req, res) => {
  const { name, timestamp, message, code} = req.body;

  if (!code ) {
    return res
      .status(422)
      .send({ error: 'Country is required' });
  }

  try {
    const oMessage = new Message({name,
      timestamp,
      message,
      code,
      userId: req.user._id
    });
    await oMessage.save();
    res.send(oMessage);
  } catch (err) {
    res.status(422).send({error: err.message});
  }
})

module.exports = router;
