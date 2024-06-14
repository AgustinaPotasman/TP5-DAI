import {Router} from 'express';
import express from "express";
import UserService from "../services/users-service.js"
import jwt from 'jsonwebtoken';
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const UserRouter =  Router();
const svc = new UserService()
UserRouter.post('login' , async (req, res) => {
    let respuesta;
    const paylaod={
        username: req.params.username,
        password:  req.params.password
    };
    const secretKey= 'root';
    const options ={
        exipresIn: '1h',
        issuer: 'mi_organizacion'
    }
    const token = jwt.sign(payload, secretKey, options);
}); 

UserRouter.post('/api/user/register' , async (req, res) => {

});

