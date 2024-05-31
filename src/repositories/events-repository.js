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
    getByNameAsync = async (nombreEvento) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT * from events WHERE name=@pnombreEvento'
        const result = await cliente.query(sql, new pnombreEvento=nombreEvento);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
    getByCategoryAsync = async (categoriaEvento) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT * from events INNER JOIN event_categories ON events.id_event_category == event_categories.id WHERE events_category.name=@pname' //chequear que haya que selectear name cuando estamos llamando category en controllers
        const result = await cliente.query(sql, new pname=categoriaEvento);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
    getByDateAsync = async (fechaEvento) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT * from events where start_date=@pfechaEvento'
        const result = await cliente.query(sql, new pfechaEvento=fechaEvento);  
        const EventsArray=result;  
        await cliente.end();
        return  EventsArray;
    }
    getByTagAsync = async (tagEvento) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT * from events INNER JOIN event_tags ON events_tags.id_event == event.id INNER JOIN tags ON tags.id = event_tags.id_tag WHERE tags.name = @ptagEvento' 
        const result = await cliente.query(sql, new ptagEvento = tagEvento);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
}