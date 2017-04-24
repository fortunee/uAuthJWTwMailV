import jwt from 'jsonwebtoken';
import User from './user.server.model';
import pHasherMatcher from './../middlewares/pHasherMatcher';
import Auth from './../middlewares/jwtAuth';

exports.createUser = (req, res) => {
  req.body.password = pHasherMatcher.hashPassword(req.body.password);
  User.saveUser(req.body, (err, user) => {
    // Please save the user. Thanks
  });
};
