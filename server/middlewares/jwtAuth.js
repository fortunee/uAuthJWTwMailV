import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'clapp for yourself';
const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).send({ message: 'You need to be logged in to access this page' });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Invalid credentials' });
      }

      req.decoded = decoded;
    });
  }
};

export default Auth;
