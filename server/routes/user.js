import express from 'express';
import UserController from '../controlers/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/check', authMiddleware, UserController.check);

router.get('/getall', authMiddleware, UserController.getAll);
router.get('/getone/:id([0-9]+)', authMiddleware, UserController.getOne); // ?
router.post('/create', authMiddleware, UserController.create); // ?
router.put('/update/:id([0-9]+)', authMiddleware, UserController.update);
router.delete('/delete', authMiddleware, UserController.delete);
router.put('/status', authMiddleware, UserController.changeStatus);

export default router;
