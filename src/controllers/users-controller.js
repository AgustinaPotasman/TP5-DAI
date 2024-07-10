import {Router} from 'express';
import express from "express";
import UsersService from "../services/users-service.js"
import jwt from 'jsonwebtoken';
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const UserRouter =  Router();
const svc = new UsersService()

UserRouter.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const rta = await svc.login(username, password);
    if (rta) {
        const token = jwt.sign({ id: result.id, username: result.username}, process.env.SECRET_KEY, { expiresIn: '1h', issuer: '' });
        res.status(201).json({"success": true, "token": token})
    }
    else {
        res.status(404).send('Usuario no encontrado');
    }




    /*const express = require('express');
    const router = express.Router();
    const usersService = require('./users-service');

    router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'El email es invalido.', token: '' });
    }

    const response = await usersService.loginUser(username, password);

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(401).json(response);
    }
    });

    module.exports = router;
    */
});

UserRouter.post('/register', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    if (!first_name || !last_name) {
        return res.status(400).json({ message: 'Los campos first_name o last_name están vacíos.' });
    }

    const email = /\S+@\S+\.\S+/;
    if (!email.test(username)) {
        return res.status(400).json({ message: 'El email (username) es inválido.' });
    }

    if (password.length < 3) {
        return res.status(400).json({ message: 'La password tiene menos de 3 letras.' });
    }

    try {
        //const hashedPassword = await bcrypt.hash(password, 10);
        const usuarioNuevo = await svc.crearUser({ first_name, last_name, username, password});
        console.log('New user created:', usuarioNuevo);
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: error.message });
    }
});


export default UserRouter;

