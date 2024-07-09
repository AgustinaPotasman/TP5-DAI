import EventsRepository from '../repositories/events-repository.js';
import rateEventRepo from '../repositories/events-repository.js';
export default class EventsService {
    getAllAsync = async () => {
        const repo = new EventsRepository();
        const EventsArray = await repo.getAllAsync();
        return EventsArray;
    }
     searchEvents = async (filters) => {
        const repo = new EventsRepository();
        const EventsArray = await repo.searchEvents(filters);
        return EventsArray;
    };
    listParticipantes= async (eventId, filters) => {
        const repo = new EventsRepository();
        const EventsArray = await repo.listParticipantes(eventId, filters);
        return EventsArray;
    };
     getEventoById = async (id) => {
        const repo = new EventsRepository();
        const EventsArray = await repo.getByIdAsync(id);
        return EventsArray;
    }
    createEvent = async (eventData) => {
        return await EventsRepository.createEvent(eventData);
    };

    enrollAsync(id, userId) {
        const repo = new EventsRepository();
        return repo.enrollAsync(id, userId);
    }

    unenrollAsync(id, userId) {
        return this.repo.unenrollAsync(id, userId);
    }
    rateEvent = async (eventId, userId, rating, observations) => {
        return await rateEventRepo(eventId, userId, rating, observations);
    };
    
}
