const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Favourite = mongoose.model('Favourite');
const Visited = mongoose.model('Visited');

const router = express.Router();

router.use(requireAuth);

router.get('/favourites', async (req,res) => {
  const favourites = await Favourite.find({userId: req.user._id});
  res.send(favourites);
})

router.get('/visited', async (req,res) => {
  const visited = await Visited.find({userId: req.user._id});
  res.send(visited);
})

router.post(`/deleteFavourite`, async(req,res) => {
  try {
    const favourite = await Favourite.findOneAndDelete({userId: req.user._id, code: req.body.code});
    res.send(favourite);

  } catch(err) {
    res.status(422).send({error: err.message});
  }
})

router.post(`/deleteVisited`, async(req,res) => {
  try {
    const visited = await Visited.findOneAndDelete({userId: req.user._id, code: req.body.code});
    res.send(visited);

  } catch(err) {
    console.log(err);
    res.status(422).send({error: err.message});
  }
})

router.post('/favouriteCountry', async(req, res) => {
  const { name, code} = req.body;

  if (!code ) {
    return res
      .status(422)
      .send({ error: 'Country is required' });
  }

  try {
    const favourites = new Favourite({name,
      code,
      userId: req.user._id
    });
    await favourites.save();
    res.send(favourites);
  } catch (err) {
    res.status(422).send({error: err.message});
  }
})

router.post('/visitedCountry', async(req, res) => {
  const { code, name} = req.body;

  if (!code ) {
    return res
      .status(422)
      .send({ error: 'Country is required' });
  }

  try {
    const visited = new Visited({name,
      code,
      userId: req.user._id
    });
    await visited.save();
    res.send(visited);
  } catch (err) {
    res.status(422).send({error: err.message});
  }
})

module.exports = router;
