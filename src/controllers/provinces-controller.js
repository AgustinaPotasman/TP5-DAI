import {Router} from 'express';
import express from "express";
import ProvincesService from "../services/provinces-service.js"
import ValidacionesHelper from "../helpers/validaciones-helper.js"
const ProvincesRouter =  Router();
const svc = new ProvincesService();

ProvincesRouter.get('' , async (req, res) => {
    const ProvinceArray = await svc.getAllAsync();
    console.log(ProvinceArray)
    if (ProvinceArray != null){
        res.status(200).json(ProvinceArray);
    } else {
        res.status(500).send(`Error interno.`);
    }
    return respuesta;
});
ProvincesRouter.get('/id', async (req, res) => {
    try {
        const  id  = req.params.id;
        const provincia = await svc.getByIdAsync(id);
        if (provincia) {
            res.status(200).json(provincia);
        } else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
ProvincesRouter.post("", async (req, res) => 
{
    let respuesta;
    const entity = req.body;
    console.log(entity.name);
    if (entity != null) {
      const provinciasArray = await svc.createAsync(entity);
      if (provinciasArray != null) {
        respuesta = res.status(200).json(provinciasArray);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
    } else {
      respuesta = res.status(400).send(`Error en la solicitud.`);
    }
    return respuesta;
});

ProvincesRouter.put("/", async (req, res) => {
    const updatedProvince = req.body;
    try {
        const result = await svc.updateProvince(updatedProvince);
        if (result.modifiedCount === 1) {
            res.status(201).json({ message: "Province actualizada" });
        } else {
            res.status(404).json({ message: "Province no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

ProvincesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await svc.deleteProvince(id);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Province borrada" });
        } else {
            res.status(404).json({ message: "Province no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default ProvincesRouter;