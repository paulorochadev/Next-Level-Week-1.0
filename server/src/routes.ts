import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import configMulter from './config/multer';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = express.Router();
const upload = multer(configMulter);

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      uf: Joi.string().required().max(2),
      city: Joi.string().required(),
      items: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  pointsController.create
);

export default routes;