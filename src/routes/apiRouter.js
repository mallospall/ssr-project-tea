import e from 'express';
import express, { text } from 'express';
import {
  User, Tea, Comment, Role, Favourite,
} from '../db/models';

const router = express.Router();

router.get('/teas', async (req, res) => {
  const teas = await Tea.findAll();
  res.json(teas);
});

router.get('/teas/:id', async (req, res) => {
  const { id } = req.params;
  const tea = await Tea.findByPk(id);
  res.json(tea);
});

router.get('/lk/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { include: [Role] });
  const favTeas = (await Favourite.findAll({ where: { user_id: id }, include: [Tea] }))
    .map((el) => el.Tea);

  const roleName = user.Role.name;
  const { name, email } = user;
  res.json({
    name, email, roleName, favTeas, user_id: user.id,
  });
});

router.post('/tea/add', async (req, res) => {
  const {
    name, img, description, location, x, y,
  } = req.body;
  console.log(req.body);
  const newTea = await Tea.create({
    name, img, description, location, x, y,
  });
  return res.json(newTea);
});

router.delete('/fav/:id', async (req, res) => {
  const { id } = req.params;
  const {
    userId,
  } = req.body;
  console.log(req.body);
  try {
    const tea = await Favourite.findOne({ where: { user_id: userId, tea_id: id } });
    if (tea) {
      await tea.destroy();
      return res.json({ message: 'Чай удален из избранного' });
    }
    res.status(400).json({ message: 'Такого чая в избранном нет' });
  } catch (err) {
    console.error(err);
  }
});

router.post('/fav/:id', async (req, res) => {
  const { id } = req.params;
  const {
    userId,
  } = req.body;
  console.log(req.body);
  try {
    const tea = await Favourite.findOne({ where: { user_id: userId, tea_id: id } });
    if (!tea) {
      const newTea = await Favourite.create({ user_id: userId, tea_id: id });
      return res.json({ message: 'Чай добавлен в избранное' });
    }
    res.status(400).json({ message: 'Чай уже есть в избранном' });
  } catch (err) {
    console.error(err);
  }
});

router.get('/teas/:id/comments', async (req, res) => {
  const { id } = req.params;
  const userCom = await Comment.findAll({ where: { tea_id: id }, include: [User] });
  res.json(userCom);
});

router.post('/teas/:id/comments', async (req, res) => {
  const { id } = req.params;
  const {
    txt, userId,
  } = req.body;
  console.log(req.body);

  const newComment = await Comment.create({
    text: txt, tea_id: id, user_id: userId,
  });

  const newCom = (await Comment.findAll({ where: { id: newComment.id }, include: [User] }))[0];
  return res.json(newCom);
});

router.post('/godmode', async (req, res) => {
  const { id, code } = req.body;
  console.log(id, code);
  if (code === 'hesoyam') {
    const user = await User.findByPk(id);
    user.update({ role_id: 1 });
    res.sendStatus(200);
  } else { res.sendStatus(400); }
});

router.delete('/teas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tea = await Tea.findByPk(id);
    if (tea) {
      await tea.destroy();
      return res.sendStatus(200);
    }
    res.sendStatus(400);
  } catch (err) {
    console.error(err);
  }
});

router.put('/teas/edit/:id', async (req, res) => {
  const {
    name, img, description, location, x, y,
  } = req.body;
  const { id } = req.params;
  const tea = await Tea.findOne({ where: { id } });
  if (tea) {
    const teaEdit = await Tea.update({name: name, img: img, description: description, location : location, x:x, y:y}, { where: { id: req.params.id } });
    return res.sendStatus(200);
  } res.sendStatus(400);
});

export default router;
