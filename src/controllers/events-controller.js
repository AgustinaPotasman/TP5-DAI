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
    const categoriaEvento = req.params.category;
    const fechaEvento = req.params.startdate;
    const tagEvento = req.params.tag;
    const ArrayParams = [nombreEvento, categoriaEvento, fechaEvento, tagEvento];
    const CombinacionParametros=[]
    ArrayParams.forEach(p => {
        i=0;
        if (ArrayParams[p] != null)
        {
            CombinacionParametros[i]=ArrayParams[p]
            i++;
        }
    });
    CombinacionParametros.forEach(c => {
        if ( typeof CombinacionParametros[c]=== "string")
        {
            ValidacionesHelper.getStringOrDefault(CombinacionParametros[c],'Invitado')
            if (CombinacionParametros[c] === nombreEvento)
            {
                const event = await svc.getByNameAsync(nombreEvento); 
                respuesta = res.status(200).json(event);
            }
            else if (CombinacionParametros[c] === categoriaEvento){
                const categoria = await svc.getByCategoryAsync(categoriaEvento);
                respuesta = res.status(200).json(categoria)
            }
            else{
                const tagDeterminado = await svc.getByTagAsync(tagEvento);
                respuesta = res.status(200).json(tagDeterminado);
            }
        }
        else
        {
            ValidacionesHelper.getDateOrDefault(CombinacionParametros[c],"0")
            const fechaInicio = await svc.getByDateAsync(fechaEvento);
            respuesta = res.status(200).json(fechaInicio); 
        }
    })
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



