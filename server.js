import http from 'http';

const server = http.createServer((req, res) => {
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});