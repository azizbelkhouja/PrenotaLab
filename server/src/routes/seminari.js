const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Seminario = require('../models/seminario');
const userModeling = require('../utils/userModeling');

const router = new express.Router();

// Create a seminario
router.post('/seminari', auth.enhance, async (req, res) => {
  const seminario = new Seminario(req.body);
  try {
    await seminario.save();
    res.status(201).send(seminario);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  '/seminari/photo/:id',
  auth.enhance,
  upload('seminari').single('file'),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    const seminarioId = req.params.id;
    try {
      if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
      }
      const seminario = await Seminario.findById(seminarioId);
      if (!seminario) return res.sendStatus(404);
      seminario.image = `${url}/${file.path}`;
      await seminario.save();
      res.send({ seminario, file });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Get all seminari
router.get('/seminari', async (req, res) => {
  try {
    const seminari = await Seminario.find({});
    res.send(seminari);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get seminario by id
router.get('/seminari/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const seminario = await Seminario.findById(_id);
    if (!seminario) return res.sendStatus(404);
    return res.send(seminario);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update seminario by id
router.put('/seminari/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'title',
    'image',
    'language',
    'genre',
    'director',
    'cast',
    'description',
    'duration',
    'releaseDate',
    'endDate',
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const seminario = await Seminario.findById(_id);
    updates.forEach((update) => (seminario[update] = req.body[update]));
    await seminario.save();
    return !seminario ? res.sendStatus(404) : res.send(seminario);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete seminario by id
router.delete('/seminari/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const seminario = await Seminario.findByIdAndDelete(_id);
    return !seminario ? res.sendStatus(404) : res.send(seminario);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// Seminario User modeling (Get Seminario Suggestions)
router.get('/seminari/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const seminariUserModeled = await userModeling.seminariUserModeling(username);
    res.send(seminariUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
