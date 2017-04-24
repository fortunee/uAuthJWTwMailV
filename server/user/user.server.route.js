import { createUser } from './user.server.controller';

exports.userRoutes = (app) => {
  app.post('/user', createUser);
  app.post('/login');
  app.post('/logout');
  app.post('/forgotPassword');
  app.get('/verifyEmail/:token');
};
