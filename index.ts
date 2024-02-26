import { httpServer } from './src/http_server/index';
import createWebSocketServer from './src/ws_server/index';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

createWebSocketServer();
httpServer.listen(HTTP_PORT);
