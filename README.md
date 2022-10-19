# nodebb-auth
Testa NodeBB Authentication

Skapa server:
npm init -y
byt namn från index.js -> server.js
touch server.js
npm i express
npm i nodemon -D

Skriv en massa kod... Kolla filerna server.js och App.js


Starta client med:
npm start

Starta server med:
npm run dev


Ubuntu i Windows
Kör i powershell för att mappa portarna till virtuella datorn

Kolla IP med Ubuntu, inte windows bash.
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.19.128.1

netsh int portproxy show v4tov4

