import {Router} from 'express';
import express from "express";
import EventsService from "../services/events-service.js"
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const EventsRouter =  Router();
const svc = new EventsService();

EventsRouter.get('' , async (req, res) => {
    let respuesta;
    const EventsArray = await svc.getAllAsync();
    if (EventsArray != null){
        respuesta = res.status(200).json(EventsArray);
    } else {
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
});


EventsRouter.get('/?name={texto}&category={texto}&startdate={fecha YYYY-MM-DD}&tag={texto}' , async (req, res) => {
    let respuesta;
    const nombreEvento = req.params.name;
    const categoriaEvento = req.params.category;//tenemos el id y vamos a hacer el innerjoin recien en el else if, como hacemos para tener el nombre acá
    const fechaEvento = req.params.startdate;
    const tagEvento = req.params.tag;//tenemos el id y vamos a hacer el innerjoin recien en el else if, como hacemos para tener el nombre acá
    const ArrayParams = [nombreEvento, categoriaEvento, fechaEvento, tagEvento];
    ArrayParams.forEach(p => {
        if (ArrayParams[p] != null)
        {
            
        }
    });
    if (ValidacionesHelper.getStringOrDefault(nombreEvento,'Invitado') || ValidacionesHelper.getStringOrDefault(categoriaEvento,'Invitado')|| ValidacionesHelper.getStringOrDefault(fechaInicio, '') || ValidacionesHelper.getStringOrDefault(tagDeterminado, '')) {
      if (nombreEvento != "Invitado") {
       const event = await svc.getByNameAsync(nombreEvento); 
       respuesta = res.status(200).json(event);
      } else if (categoriaEvento != "Invitado" ){
        const categoria = await svc.getByCategoryAsync(categoriaEvento);
        respuesta = res.status(200).json(categoria)
      }
    } else if (fechaEvento != ''){
        const fechaInicio = await svc.getByDateAsync(fechaEvento);
        respuesta = res.status(200).json(fechaInicio);   
    }
    else{
        const tagDeterminado = await svc.getByTagAsync(tagEvento);
        respuesta = res.status(200).json(tagDeterminado);
    }
    return respuesta;
}); 

EventsRouter.get('/{id}' , async (req, res) => {

});

EventsRouter.get('/{id}/enrollment?first_name={texto}&last_name={texto}&username={texto}&attended={boolean}&rating={entero}' , async (req, res) => {

});












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



