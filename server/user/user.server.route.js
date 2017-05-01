import { createUser, verifyEmail } from './user.server.controller';

exports.userRoutes = (router) => {
  router.get('/', (req, res) => {
    res.send({ message: 'Working for this endpoint' });
  });
  router.post('/user', createUser);
  router.post('/login');
  router.post('/logout');
  router.post('/forgotPassword');
  router.get('/verify/:token', verifyEmail);
};
