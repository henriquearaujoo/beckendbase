import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import authMiddlwware from './app/middlewares/auth';

const router = express.Router();
const upload = multer(multerConfig);

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);
router.use(authMiddlwware);
router.put('/users', UserController.update);
router.get('/providers', ProviderController.index);
router.post('/files', upload.single('file'), FileController.store);

export default router;
