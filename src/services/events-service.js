import EventsRepository from '../repositories/events-repository.js';
export default class EventsService {
    getAllAsync = async () => {
        const repo = new EventsRepository();
        const EventsArray = await repo.getAllAsync();
        return EventsArray;
    }
    getByNameAsync = async (nombreEvento) =>{
        const repo = new EventsRepository();
        const event = await repo.getByNameAsync(nombreEvento);
        return event;
    }
    getByCategoryAsync = async (categoriaEvento) =>{
        const repo = new EventsRepository();
        const categoria = await repo.getByCategoryAsync(categoriaEvento);
        return categoria;
    }
    getByDateAsync = async (fechaEvento) =>{
        const repo = new EventsRepository();
        const fechaInicio = await repo.getByDateAsync(fechaEvento);
        return fechaInicio;
    }
    getByTagAsync = async (tagEvento) =>{
        const repo = new EventsRepository();
        const tagDeterminado = await repo.getByTagAsync(tagEvento);
        return tagDeterminado;
    }
    
}
