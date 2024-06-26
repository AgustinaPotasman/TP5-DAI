import {Router} from 'express';
import express from "express";
import UsersService from "../services/users-service.js"
import jwt from 'jsonwebtoken';
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const UserRouter =  Router();
const svc = new UsersService()
UserRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('username:', username);
    console.log('password:', password);

    try {
        const user = await getUserByUsername(username, password);
        console.log('Usuario recuperado de la BD: ', user);

        if (user == null) {
            console.log('Usuario no encontrado');
            return res.status(401).json({
                success: false,
                message: 'Usuario o clave inválida.',
                token: ''
            });
        }
        
        console.log('OK',user);
        const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' });
        console.log('Token generado:', token);

        res.status(200).json({
            success: true,
            message: 'Login exitoso.',
            token: token
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

UserRouter.post('/register', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    if (!first_name || !last_name) {
        return res.status(400).json({ message: 'Los campos first_name o last_name están vacíos.' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(username)) {
        return res.status(400).json({ message: 'El email (username) es sintácticamente inválido.' });
    }

    if (password.length < 3) {
        return res.status(400).json({ message: 'El campo password no cumple con el mínimo de letras.' });
    }

    try {
        const newUser = await createUser({ first_name, last_name, username, password});
        console.log('Nuevo usuario creado:', newUser);
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: error.message });
    }
});

export default UserRouter;