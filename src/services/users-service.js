import UserRepository from '../repositories/users-repository.js';

export default class UsersService {
    constructor() {
        this.repos = new UserRepository();
    }
    login = async (username, password) => {
        return this.repos.login(username, password);
    }
  

    /*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRepository = require('./users-repository');

const SECRET_KEY = 'your_jwt_secret_key';

const loginUser = async (username, password) => {
  const user = await usersRepository.findUserByUsername(username);
  if (!user) {
    return { success: false, message: 'Usuario o clave inválida.', token: '' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: 'Usuario o clave inválida.', token: '' };
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  return { success: true, message: '', token };
};

module.exports = {
  loginUser,
};
 */

    crearUser(first_name, last_name, username, password) {
        return this.repo.crearUser(first_name, last_name, username, password);
    }
}

