import { createServer } from 'http';

createServer((req, res) => {
  res.write('Hello Roughnecks!');
  res.end();
}).listen(process.env.PORT);
