import jwt from 'jsonwebtoken';
import User from './user.server.model';
import pHasherMatcher from './../middlewares/pHasherMatcher';
import Auth from './../middlewares/jwtAuth';
import { sendEmailVerification } from './../middlewares/mail';

const secret = process.env.SECRET || 'I see you';

exports.createUser = (req, res) => {
    // hash user's password and register them
  req.body.password = pHasherMatcher.hashPassword(req.body.password);
  User.create(req.body).then((user) => {
    const token = jwt.sign({
      /* eslint-disable no-underscore-dangle */
      userId: user._id,
      username: user.username
    }, secret, { expiresIn: '2 days' });
    sendEmailVerification(user.email, token);
    return res.status(201).send({
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      token
    });
  }).catch((err) => {
    res.status(400).send(err.errors);
  });
};

exports.verifyEmail = (req, res) => {
  const token = req.params.token;
  jwt.verify(token, secret, (err, decoded) => {
    if (decoded === undefined) {
      return res.status(404).send({ message: 'Invalid verification link' });
    }

    User.findOne({ _id: decoded.userId, username: decoded.username }, (err, user) => {
      if (err) {
        return res.status(404).send({ message: 'User not found' });
      }

      if (user === null) {
        return res.status(404).send({ message: 'Invalid verification link' });
      }

      if (user.isVerified) {
        return res.status(400).send({ message: 'User is already verified' });
      }

      user.isVerified = true;
      User.updateUser(user, (err, verifiedUser) => {
        if (err) {
          return res.status(400).send({ message: 'User still unverified' });
        }

        return res.status(200).send({ message: 'User successfully verified' });
      });
    });
  });
};
