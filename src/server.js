import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import { renderToString } from 'react-dom/server';
import store from 'session-file-store';
import React from 'react';
import Layout from './components/Layout';
import { Tea } from './db/models';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(session(sessionConfig));

app.get('/', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
