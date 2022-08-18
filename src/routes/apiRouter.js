import express from 'express';
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
    name, email, roleName, favTeas,
  });
});

router.post('/tea/add', async (req, res) => {
  const {
    name, img, description, location, x, y,
  } = req.body;
  console.log(req.body);
  try {
    const tea = await Tea.findOne({ where: { name } });
    if (!tea) {
      const newTea = await Tea.create({
        name, img, description, location, x, y,
      });
      return res.json({ message: 'Чай добавлен' });
    }
    res.status(400).json({ message: 'такой чай уже есть' });
  } catch (err) {
    console.error(err);
  }
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
      const newTea = await Favourite.create({user_id: userId, tea_id: id});
      return res.json({ message: 'Чай добавлен в избранное' });
    }
    res.status(400).json({ message: 'Чай уже есть в избранном' });
  } catch (err) {
    console.error(err);
  }
});

export default router;
