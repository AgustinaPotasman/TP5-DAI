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
    getByParamsAsync = async (query) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = query;
        const result = await cliente.query(sql, new pnombreEvento=nombreEvento, new pname=categoriaEvento,);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
 
}