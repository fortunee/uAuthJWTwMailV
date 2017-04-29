import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'clap for yourself';
const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).send({ message: 'You need to be logged in to access this page' });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      req.decoded = decoded;
      next();
    });
  }
};

export default Auth;
