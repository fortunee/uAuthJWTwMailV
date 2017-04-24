import bcrypt from 'bcrypt';

const pHasherMatcher = {
  hashPassword(passwordString) {
    return bcrypt.hashSync(passwordString, bcrypt.genSaltSync(8));
  },

  matchPassword(passwordString, userPassword) {
    return bcrypt.compareSync(passwordString, userPassword);
  }
};

export default pHasherMatcher;
