import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CreateComplimentController } from '../controllers/CreateComplimentController';
import { CreateTagController } from '../controllers/CreateTagController';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListTagsController } from '../controllers/ListTagsController';
import { ListUserController } from '../controllers/ListUserController';
import { ListUserReceiverComplimentsController } from '../controllers/ListUserReceiverComplimentsController';
import { ListUserSendComplimentsController } from '../controllers/ListUserSendComplimentsController';
import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiverComplimentsController =
  new ListUserReceiverComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUserController();

router.get('/', (req, res) => {
  res.send('Rota inicial');
});

router.get('/teste', (req, res) => {
  res.send('Rota de teste via get');
});

router.post('/teste', (req, res) => {
  res.send('Rota de teste via post');
});

router.post('/users', createUserController.handle);
router.post(
  '/tags',
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);
router.post('/login', authenticateUserController.handle);
router.post(
  '/compliment',
  ensureAuthenticate,
  createComplimentController.handle
);

router.get(
  '/users/compliments/send',
  ensureAuthenticate,
  listUserSendComplimentsController.handle
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticate,
  listUserReceiverComplimentsController.handle
);
router.get('/tags', ensureAuthenticate, listTagsController.handle);
router.get('/users', ensureAuthenticate, listUsersController.handle);

export { router };
