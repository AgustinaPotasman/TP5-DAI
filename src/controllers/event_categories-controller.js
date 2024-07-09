import express from "express";
import {Router} from 'express';
import EventsCategoryService from "../services/eventCategory-service.js";

const svc = new EventsCategoryService();
const EventsCategoryRouter =  Router();

EventsCategoryRouter.get('/', async (req, res) => {
    const categorias = await svc.getAllAsync();
    if (categorias) {
        res.status(200).send(categorias);
    } else {
        res.status(400).send();
    }
});

EventsCategoryRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const cateogria = await svc.getByIdAsync(id);
    if (cateogria) {
        res.status(200).send(cateogria);
    } else {
        res.status(404).send();
    }
});

EventsCategoryRouter.post('/', async (req, res) => {
    catNueva = req.body;
    const cat = await svc.createCategoryAsync(catNueva);
    if (cat) {
        res.status(201).send();
    } else {
        res.status(400).send('No se pudo crear');
    }
});

EventsCategoryRouter.put('/', async (req, res) => {
    const UpCat = req.body;
    try {
        const catUpdateada = await svc.updateCategoryAsync(UpCat);
        if (catUpdateada) {
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


