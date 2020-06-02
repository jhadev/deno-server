import { Application } from 'https://deno.land/x/oak/mod.ts';
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import router from './routes/person-routes.ts';

const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || '127.0.0.1';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

export const db = client.database('deno');
export const users = db.collection("users");

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
