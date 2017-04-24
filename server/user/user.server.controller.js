import jwt from 'jsonwebtoken';
import User from './user.server.model';
import pHasherMatcher from './../middlewares/pHasherMatcher';
import Auth from './../middlewares/jwtAuth';

const secret = process.env.SECRET || 'I see you';

exports.createUser = (req, res) => {
  req.body.password = pHasherMatcher.hashPassword(req.body.password);
  User.create(req.body).then((user) => {
    const token = jwt.sign({
      /* eslint-disable no-underscore-dangle */
      userId: user._id,
      username: user.username
    }, secret, { expiresIn: '2 days' });
    res.status(201).send({
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      token
    });
  });
};
