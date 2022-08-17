import express from 'express';
import { User, Tea, Comment, Role, Favourite } from '../db/models';

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

export default router;
