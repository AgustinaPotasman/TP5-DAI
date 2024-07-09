import {Router} from 'express';
import express from "express";
import EventsService from "../services/events-service.js"
import ValidacionesHelper from "../helpers/validaciones-helper.js"
import { authenticateToken } from '../middlewares/auth-middleware.js';
const EventsRouter =  Router();
const svc = new EventsService();

EventsRouter.get('/', async (req, res) => {
    const { name, category, startdate, endDate, page, pageSize } = req.query;

    try {
        const events = await svc.searchEvents({ name, category, startdate, endDate, page, pageSize });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

EventsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.query;
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

EventsRouter.get('/', async (req, res) => {
    const { name, category, startDate, endDate, page, pageSize } = req.query;

    try {
        const events = await svc.searchEvents({ name, category, startDate, endDate, page, pageSize });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

EventsRouter.get('/:id/enrollment', async (req, res) => {
    const eventId = req.params.id;
    try {
        const enrollments = await svc.listParticipantes(eventId);
        if (!enrollments) {
            return res.status(404).json({ message: 'No se encontraron inscripciones para este evento.' });
        }
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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

EventController.post('/:id/enrollment', authenticateToken, async (req, res) => {
    const id = req.params.id
    if (id === null) {
        res.status(400).send('El id de evento debe ser un número entero');
        return;
    }
    const Id = svc.getById(id);
    if (!Id) {
        res.status(404).send('Evento no encontrado');
        return;
    }
    const rest = await svc.enrollAsync(id, req.user.id);
    if (rest) {
        res.status(201).send();
    }
    else {
        res.status(400).send('Ya no hay cupos disponibles');
    }
})

EventController.delete('/:id/enrollment', authenticateToken, async (req, res) => {
    const id = req.params.id
    if (id === null) {
        res.status(400).send('El id de evento tiene que ser un número entero');
        return;
    }
    const rest = await svc.unenrollAsync(id, req.user.id);
    if (rest == 200) {
        res.status(200).send();
    }
    else if (rest == 404) {
        res.status(404).send('Inscripción o evento no encontrado');
    }
    else {
        res.status(400).send('El evento ya pasó');
    }
});

router.patch('/:id/enrollment/:rating', authenticateToken, async (req, res) => {
    const eventId = req.params.id;
    const rating = req.params.rating;
    const userId = req.user.id;
    const { observations } = req.body;
    let respuesta;
    try {
        await rateEvent(eventId, userId, rating, observations);
        respuesta = res.status(200).json({ message: 'Evento rankeado correctamente.' });
    } catch (error) {
        respuesta = res.status(error.status || 500).json({ message: error.message });
    }
    return respuesta;
});

export default EventsRouter;
