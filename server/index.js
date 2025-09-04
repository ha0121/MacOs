const path = require('path');
const fs = require('fs');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const DATA_FILE = path.join(__dirname, 'views.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { totalViews: 0 };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

let data = readData();

// Simple in-memory set of connected clients
const clients = new Set();

function broadcastJSON(obj) {
  const s = JSON.stringify(obj);
  for (const ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(s);
    }
  }
}

// Express API: get totals
app.get('/api/totals', (req, res) => {
  res.json({ totalViews: data.totalViews || 0, online: clients.size });
});

// Express API: increment total views (idempotent behavior left to client)
app.post('/api/visit', express.json(), (req, res) => {
  data.totalViews = (data.totalViews || 0) + 1;
  writeData(data);
  // Broadcast update
  broadcastJSON({ type: 'totals', totalViews: data.totalViews });
  res.json({ ok: true, totalViews: data.totalViews });
});

// Serve static files from parent folder (so you can run server from server/)
app.use('/', express.static(path.join(__dirname, '..')));

wss.on('connection', function connection(ws) {
  clients.add(ws);

  // Send current totals and online count
  ws.send(JSON.stringify({ type: 'hello', totalViews: data.totalViews || 0, online: clients.size }));

  // Broadcast new online count
  broadcastJSON({ type: 'presence', online: clients.size });

  ws.on('message', function message(raw) {
    let msg = null;
    try { msg = JSON.parse(raw); } catch (e) { return; }
    if (msg && msg.type === 'visit') {
      // increment total views
      data.totalViews = (data.totalViews || 0) + 1;
      writeData(data);
      broadcastJSON({ type: 'totals', totalViews: data.totalViews });
    }
  });

  ws.on('close', function () {
    clients.delete(ws);
    broadcastJSON({ type: 'presence', online: clients.size });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
