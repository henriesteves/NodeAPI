const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

const app = express();

app.use(bodyParser.json());

let clients = [];

const getClientIndex = id => {
  if (id) {
    return clients.findIndex(client => client.id == id);
  } else {
    return -1;
  }
};

app.post('/clients', (req, res) => {
  let client = {};

  client.id = uniqid();

  client = Object.assign(client, req.body)

  clients.push(client);

  res.json([{info: 'client create successfully'}, {client: client}]);
});

app.get('/clients', (req, res) => {
  res.json(clients);
});

app.get('/clients/:id', (req, res) => {
  if (getClientIndex(req.params.id) >= 0) {
    res.json(clients.filter(client => client.id === req.params.id));
  } else {
    res.json({info: 'client not found'});
  }
});

app.put('/clients/:id', (req, res) => {
  const clientIndex = getClientIndex(req.params.id);

  if (clientIndex >= 0) {
    const clientId = clients[clientIndex].id;
    let client = {};

    client.id = clients[clientIndex].id;

    clients[clientIndex] = Object.assign(client, req.body)

    res.json([{info: 'client updated successfully'}, {client: clients[clientIndex]}]);
  } else {
    res.json({info: 'client not found'});
  }
});

app.delete('/clients/:id', (req, res) => {
  const clientIndex = getClientIndex(req.params.id);

  if (clientIndex >= 0) {
    clients.splice(clientIndex, 1);
    res.json({info: 'client removed successfully'});
  } else {
    res.json({info: 'client not found'});
  }

});

app.listen(3000, () => {
  console.log('Server is running at port 3000')
});

// Commands to test the API

// curl -S -X GET http://localhost:3000/clients

// curl -S -H "Content-Type: application/json" -X POST http://localhost:3000/clients -d '{"name": "Henrique", "age": "30"}'
// curl -S -H "Content-Type: application/json" -X POST http://localhost:3000/clients -d '{"name": "Heloisa", "age": "25"}'

// curl -S -X GET http://localhost:3000/clients

// curl -S -X GET http://localhost:3000/clients/<id>

// curl -S -H "Content-Type: application/json" -X PUT http://localhost:3000/clients/<id> -d '{"name":"Henrique2","age": "31"}'

// curl -S -X DELETE http://localhost:3000/clients/<id>
