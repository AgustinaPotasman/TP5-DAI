import {Router} from 'express';
import express from "express";
import EventsEvents from "../services/events-service.js"
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const EventsRouter =  Router();
const svc = new EventsService();

EventsRouter.get('' , async (req, res) => {

});


EventsRouter.get('/?name={texto}&category={texto}&startdate={fecha YYYY-MM-DD}&tag={texto}' , async (req, res) => {

}); 

EventsRouter.get('/{id}' , async (req, res) => {

});

EventsRouter.get('/{id}/enrollment?first_name={texto}&last_name={texto}&username={texto}&attended={boolean}&rating={entero}' , async (req, res) => {

});

app.post('/api/user/login' , async (req, res) => {

}); //falta el router porque no sabemos si hay que hacer uno nuevo para user

app.post('/api/user/register' , async (req, res) => {

}); //falta el router porque no sabemos si hay que hacer uno nuevo para user


app.get('/api/province', (req, res) => {

}) //falta router

app.get('/api/province/{id}', (req, res) => {

}) //falta router

app.post('/api/province', (req, res) => {

}) //falta router

app.put('/api/province', (req, res) => {

}) //falta router

app.delete('/api/province/{id}', (req, res) => {

}) //falta router


EventsRouter.patch('/{id}/enrollment/{entero}' , async (req, res) => {

});

EventsRouter.get('/{id}/enrollment/{entero}' , async (req, res) => {

});



