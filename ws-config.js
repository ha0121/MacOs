/* ws-config.js

   Ready-to-edit client WebSocket config. Replace the value below with
   your server's public WebSocket URL so remote clients (different IPs
   / networks) connect to the same presence server.

   Options:
     - Local dev (only on same machine):
         window.__WS_SERVER_URL = 'ws://localhost:3000';

     - LAN testing (replace IP with your machine's LAN address):
         window.__WS_SERVER_URL = 'ws://192.168.1.42:3000';

     - Production (secure):
         window.__WS_SERVER_URL = 'wss://example.com';

   Quick PowerShell examples (run from project root):
     # Local/test
     Set-Content -Path .\ws-config.js -Value "window.__WS_SERVER_URL = 'ws://localhost:3000';" -Encoding UTF8

     # LAN (replace IP)
     Set-Content -Path .\ws-config.js -Value "window.__WS_SERVER_URL = 'ws://192.168.1.42:3000';" -Encoding UTF8

     # Production (secure)
     Set-Content -Path .\ws-config.js -Value "window.__WS_SERVER_URL = 'wss://yourdomain.com';" -Encoding UTF8

   Notes:
     - For WAN / public access, use a proper domain + TLS (wss://). Terminate TLS
       with a reverse proxy (nginx) or use a hosting provider that supports wss.
     - If this file is empty or commented out, the client falls back to
       ws:// or wss:// + location.host.
*/

// --- Default value (change to your server) ---
window.__WS_SERVER_URL = 'ws://localhost:3000';

