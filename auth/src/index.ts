import express from 'express';
import {json} from 'body-parser'
const app = express();
app.use(json);
app.get("api/users/currentUser", () => {
console.log('Hello there!!! Current User !!!');
})
app.listen(3000, () => {
console.log('listening on port 3000 !!!');
})
