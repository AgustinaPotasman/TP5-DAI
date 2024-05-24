import EventsRepository from '../repositories/events-repository.js';
export default class EventsService {
    getAllAsync = async () => {
        const repo = new EventsRepository();
        const EventsArray = await repo.getAllAsync();
        return EventsArray;
    }
    getByNameAsync = async () =>{
        const repo = new EventsRepository();
        const event = await repo.getByNameAsync();
        return event;
    }
    getByCategoryAsync = async () =>{
        const repo = new EventsRepository();
        const categoria = await repo.getByCategoryAsync();
        return categoria;
    }
    getByDateAsync = async () =>{
        const repo = new EventsRepository();
        const fechaInicio = await repo.getByDateAsync();
        return fechaInicio;
    }
    getByTagAsync = async () =>{
        const repo = new EventsRepository();
        const tagDeterminado = await repo.getByTagAsync();
        return tagDeterminado;
    }
    
}
