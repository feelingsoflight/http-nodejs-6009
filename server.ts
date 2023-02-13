import https from 'https'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
app.use(cors({
    // origin: 'https://www.section.io'
    // origin: '*'
    origin: ['http://localhost:3456', "https://vite-production-bb5a.up.railway.app"],
    maxAge: 600, // Access-Control-Max-Age is 600 ~ https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it
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

// app.use(express.json())
// // app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())

let banner: string = "default banner"
app.get('/messages/banner', (req, res) =>{
    res.send(banner);
});
app.post('/messages/banner', (req, res) =>{
    // let data = ''
    // req.on('data', chunk => data += chunk).on('end', () => {
    //     console.log('setting message banner', data)
    //     banner = data
    //     res.status(200)
    //     res.end()
    // })
    console.log('req.body', req.body)
    banner = req.body
    res.end()
});

let volatile: any = {serverValue: 'initial'}
app.get('/volatile', (req, res) =>{
    res.send({
        ...volatile, 
        server: {
            retreived: new Date()
        }
    });
});
app.post('/volatile/:path', (req, res) =>{
    // let data = ''
    // req.on('data', chunk => data += chunk).on('end', () => {
    //     console.log('setting message banner', data)
    //     banner = data
    //     res.status(200)
    //     res.end()
    // })
    console.log('req.params.path', req.params.path)
    console.log('req.body', req.body)
    volatile[req.params.path] = req.body
    res.end()
});




const desiredPort = process.env.PORT;

const port = desiredPort || 6543

app.listen(port, () => console.log(`application started on port ${port} (desired was ${desiredPort})`))
