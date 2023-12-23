import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose  from 'mongoose'
import request from 'supertest'
import {app} from "../app";
let mongo:any;
declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () =>
    {
         process.env.JWT_SECRET="RandomSecretForJWT";
          mongo = await MongoMemoryServer.create();
         const mongoUri = mongo.getUri();
         await mongoose.connect(mongoUri, {});
    }
);

beforeEach(async () =>{
    const collections=await mongoose.connection.db.collections();
    for(let collection of collections)
    {
        await collection.deleteMany({});
    }

});

afterAll(async () => {

  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin=async () => {
    const email="testing@email.com";
    const password="testing";
    const response=await request(app).post('/api/users/signup').send({ email , password}).expect(201);
    const cookie=response.get('Set-Cookie');
    return cookie;
};
