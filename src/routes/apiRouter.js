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

  // const test = favorite.map((el) => el.Tea);
  // console.log(JSON.parse(JSON.stringify(user.name)));
  const roleName = user.Role.name;
  const { name, email } = user;
  res.json({
    name, email, roleName, favTeas, user_id: user.id,
  });

  // const { name, email, role_id } = await User.findByPk(id);
  // const roleName = (await Role.findByPk(role_id)).name;
  // let favTeas = (await Favourite.findAll({ where: { user_id: id } })).map((el) => el.tea_id);
  // let favTeas2 = favTeas.map(async (el) => {return await Tea.findByPk(el)});
  // favTeas.forEach((el) => console.log (typeof el))
  // res.json({
  //   name, email, roleName, favTeas2, favTeas,
  // });
});

export default router;
