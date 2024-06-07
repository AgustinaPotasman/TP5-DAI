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

export default EventsRouter.get( async (req, res) => {
    let respuesta;
    const ArrayParams = [req.params.name, req.params.category, req.params.startdate, req.params.tag];
    let  parametros = '/?'
    let query='SELECT * FROM events '
    ArrayParams.forEach(p, i => {
        if (ArrayParams[p] != null)
        { 
            if (i > 0)
            {
                parametros.concat('&')
            }
            if (ArrayParams[p]= nombreEvento){
                parametros.concat('name={texto}')
                query+=`WHERE ${req.params.name}`
            }
            else if(ArrayParams[p]=categoriaEvento){
                parametros.concat('category={texto}')
                query+=`INNER JOIN event_categories ON events.id_event_category == event_categories.id WHERE events_category.name=${req.params.category}`
            }     
            }
            else if (ArrayParams[p]= fechaEvento){
                parametros.concat('startdate={fecha YYYY-MM-DD}')
                query+=`WHERE start_date=${req.params.startdate}`
            }
            else if (ArrayParams[p]= tagEvento){
                parametros.concat('tag={texto}')
                query+=`INNER JOIN event_tags ON events_tags.id_event == event.id INNER JOIN tags ON tags.id = event_tags.id_tag WHERE tags.name=${req.params.tag}`
            }
            p++;
            i++;
    })
    let event = await svc.getByParamsAsync(query); 
    try {
        const { rows } = await pool.query(query, ArrayParams.filter(parametros => parametros !== null));
        if (rows.length > 0) {
            respuesta = res.status(200).json(rows);
        } else {
            respuesta = res.status(404).send('No se encontraron eventos que coincidan con los criterios de búsqueda.');
        }
    } catch (error) {
        console.error('Error al buscar eventos:', error);
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
})

EventsRouter.get('/event/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoService.getEventoById(id);
        if (evento) {
            res.status(200).json(evento);
        } else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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



