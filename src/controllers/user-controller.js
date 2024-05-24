import {Router} from 'express';
import express from "express";
import UserService from "../services/user-service.js"
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const UserRouter =  Router();
const svc = new UserService()
UserRouter.post('/api/user/login' , async (req, res) => {
   
}); 

UserRouter.post('/api/user/register' , async (req, res) => {

}); //falta el router porque no sabemos si hay que hacer uno nuevo para user

