import jwt from 'jsonwebtoken';
import User from './user.server.model';
import pHasherMatcher from './../middlewares/pHasherMatcher';
import Auth from './../middlewares/jwtAuth';

exports.createUser = (req, res) => {
  req.body.password = pHasherMatcher.hashPassword(req.body.password);
  const user = req.body;
  User.create(user).then((data) => {
    res.status(201).send(data);
  });
};
