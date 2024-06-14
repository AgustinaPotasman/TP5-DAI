import {Router} from 'express';
import express from "express";
import EventsService from "../services/events-service.js"
import ValidacionesHelper from "../helpers/validaciones-helper.js"
import { authenticateToken } from '../middlewares/auth-middleware.js';
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
            if (ArrayParams[p]= req.params.name){
                parametros.concat('name={texto}')
                query+=`WHERE ${req.params.name}`
            }
            else if(ArrayParams[p]=req.params.category){
                parametros.concat('category={texto}')
                query+=`INNER JOIN event_categories ON events.id_event_category == event_categories.id WHERE events_category.name=${req.params.category}`
            }     
            }
            else if (ArrayParams[p]= req.params.startdate){
                parametros.concat('startdate={fecha YYYY-MM-DD}')
                query+=`WHERE start_date=${req.params.startdate}`
            }
            else if (ArrayParams[p]= req.params.tag){
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

EventsRouter.get('/id', async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await svc.getByIdAsync(id);
        if (evento) {
            res.status(200).json(evento);
        } else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

EventsRouter.get( async (req, res) => {
    let respuesta;
    const ArrayParams = [req.params.first_name, req.params.last_name, req.params.username, req.params.attended, req.params.rating];
    let  parametros = '/?'
    let query='SELECT * FROM  users '
    ArrayParams.forEach(p, i => {
        if (ArrayParams[p] != null)
        { 
            if (i > 0)
            {
                parametros.concat('&')
            }
            if (ArrayParams[p]= req.params.first_name){
                parametros.concat('first_name={texto}')
                query+=`WHERE ${req.params.name}`
            }
            else if(ArrayParams[p]=req.params.last_name){
                parametros.concat('last_name={texto}}')
                query+=`WHERE ${req.params.last_name}`
            }     
            }
            else if (ArrayParams[p]= req.params.username){
                parametros.concat('username={texto}')
                query+=`WHERE ${req.params.username}`
            }
            else if (ArrayParams[p]= req.params.attended){
                parametros.concat('attended={boolean}')
                query+=`WHERE ${req.params.attended}`
            }
            else if (ArrayParams[p]= req.params.rating){
                parametros.concat('rating={entero}')
                query+=`WHERE ${req.params.rating}`
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
});
EventsRouter.post('/', authenticateToken, async (req, res) => {
    const { name, description, max_assistance, max_capacity, price, duration_in_minutes, id_event_location } = req.body;
    const userId = req.user.id;

    if (!name || !description || name.length < 3 || description.length < 3) {
        return res.status(400).json({ message: 'El nombre o la descripción son inválidos.' });
    }

    if (max_assistance > max_capacity) {
        return res.status(400).json({ message: 'El max_assistance es mayor que el max_capacity.' });
    }

    if (price < 0 || duration_in_minutes < 0) {
        return res.status(400).json({ message: 'El precio o la duración son inválidos.' });
    }

    try {
        const newEvent = await createEvent({ name, description, max_assistance, max_capacity, price, duration_in_minutes, id_event_location, userId });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


