// import { createServer } from 'http';

// createServer((req, res) => {
//   res.write('Hello Roughnecks!! :)');
//   res.end();
// }).listen(process.env.PORT);

import express, {Request, Response} from 'express';
import cors from 'cors';
const app = express();

https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
app.use(cors({
    // origin: 'https://www.section.io'
    origin: '*'
}));

app.get('/', (req, res) =>{
    res.send("hello expressnecks server!~hoopdy :P");
});

app.get('/ping', (req, res) =>{
    res.send("pong");
});



const desiredPort = process.env.PORT;
// app.listen(6069);
const port = desiredPort || 6543
app.listen(port, () => console.log(`application started on port ${port} (desired was ${desiredPort})`))
