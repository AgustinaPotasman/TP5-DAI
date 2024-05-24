import pkg from 'pg'
const { Client, Pool } = pkg;
export default class ProvinceRepository {
    getAllAsync = async () => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT * from events'
        const result = await cliente.query(sql);  
        const EventsArray=result;  
        await cliente.end();
        return  EventsArray;
    }
    getByNameAsync = async () => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT name from events '
        const result = await cliente.query(sql);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
    getByCategoryAsync = async () => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT id_eventos_category from events INNER JOIN event_categories ON events.id_event_category == event_categories.id WHERE name=@pname' //chequear que haya que selectear name cuando estamos llamando category en controllers
        const result = await cliente.query(sql);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
    getByDateAsync = async () => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT start_date from events '
        const result = await cliente.query(sql);  
        const EventsArray=result;  
        await cliente.end();
        return  EventsArray;
    }
    getByTagAsync = async () => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT name from events INNER JOIN event_categories ON events.id_event_category == event_categories.id' //chequear que haya que selectear name cuando estamos llamando category en controllers
        const result = await cliente.query(sql);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
}