import jwt, { TokenExpiredError } from 'jsonwebtoken'
import UsersRepository from '../repositories/users-repository.js-repository.js';
const secretKey = 'root';
let token= ;
let payloadOriginal= null;
try {
    payloadOriginal = await userRepository.verify(token, secretKey)
} catch (e) {
    TokenExpiredError(e);
    console.error(e)
}