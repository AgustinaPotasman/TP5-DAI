import EventsRepository from '../repositories/events-repository.js';
export default class EventsService {
    getAllAsync = async () => {
        const repo = new EventsRepository();
        const EventsArray = await repo.getAllAsync();
        return EventsArray;
    }
    getByParamsAsync = async (query) =>{
        const repo = new EventsRepository();
        const event = await repo.getByParamsAsync(query);
        return event;
    }
     getEventoById = async (id) => {
        return await eventoRepository.getByIdAsync(id);
    }
    createEvent = async (eventData) => {
        return await eventoRepository.createEvent(eventData);
    };
    
}
