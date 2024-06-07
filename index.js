import express from "express";
import cors from "cors";
import EventsRouter from "./src/controllers/events-controller.js";
const app = express();
const port = 3000; 

app.use(cors()); 
app.use(express.json()); 
app.use("/api/event", EventsRouter);
app.use('/api', EventsRouter);


app.listen(port, () => {
    console.log(`"server" Listening on port ${port}`);
   })