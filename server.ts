import https from 'https'
import express from 'express';
import cors from 'cors';
const app = express();

https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
app.use(cors({
    // origin: 'https://www.section.io'
    // origin: '*'
    origin: ['http://localhost:3456', "https://vite-production-bb5a.up.railway.app/"]
}));

app.get('/', (req, res) =>{
    res.send("hello expressnecks server! potato");
});

app.get('/ping', (req, res) =>{
    res.send("pong");
});

app.get('/env/hosted', (req, res) =>{
    const hostedBy = process.env.RNSERVER_HOSTED || "localdev"
    const hostLive = process.env.RNSERVER_HOSTED == 'live'
    res.send(hostedBy);
});
app.get('/najft', (req, res) => {
    
    const url = "https://www.jftna.org/jft/"
    const data:string[] = []
    https.get(url, lalala => {
        console.log("got response" + lalala.statusCode)
        lalala.on('data', chunk => {
            data.push(chunk)
        }).on('end', () => {
            const str = data.join('')
            const startToken = "<body>"
            const endToken = "</body>"
            const start = str.indexOf(startToken)
            const end = str.indexOf(endToken) 
            if ((start !== -1) && (end !== -1)) {
                const body = str.substring(start + startToken.length, end)
                res.send(body)
            } else {
                res.send(str)
            }
        })
    })
})


const desiredPort = process.env.PORT;

const port = desiredPort || 6543

app.listen(port, () => console.log(`application started on port ${port} (desired was ${desiredPort})`))
