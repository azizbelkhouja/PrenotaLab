const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Cinema = require('../models/cinema');
const userModeling = require('../utils/userModeling');

const router = new express.Router();

// Create a lab
router.post('/labs', auth.enhance, async (req, res) => {
  const lab = new Lab(req.body);
  try {
    await lab.save();
    res.status(201).send(lab);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/labs/photo/:id', upload('labs').single('file'), async (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const { file } = req;
  const labId = req.params.id;
  try {
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    const lab = await Lab.findById(labId);
    if (!lab) return res.sendStatus(404);
    lab.image = `${url}/${file.path}`;
    await lab.save();
    res.send({ lab, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

// Get all labs
router.get('/labs', async (req, res) => {
  try {
    const labs = await Lab.find({});
    res.send(labs);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get lab by id
router.get('/labs/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const lab = await Lab.findById(_id);
    if (!lab) return res.sendStatus(404);
    return res.send(lab);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update lab by id
router.patch('/labs/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const lab = await Lab.findById(_id);
    updates.forEach((update) => (lab[update] = req.body[update]));
    await lab.save();
    if (!lab) return res.sendStatus(404);
    return res.send(lab);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete lab by id
router.delete('/labs/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const lab = await Lab.findByIdAndDelete(_id);
    if (!lab) return res.sendStatus(404);
    return res.send(lab);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// Lab User modeling (GET ALL LABS)
router.get('/labs/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const labs = await Lab.find({});
    const labsUserModeled = await userModeling.labUserModeling(labs, username);
    res.send(labsUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
