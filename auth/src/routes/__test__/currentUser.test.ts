import request from 'supertest'
import {app} from "../../app";
it("returns 200 for for successful retrieval of current user", async () => {
   
     const cookie=await global.signin();
  
     const response= await request(app).get('/api/users/current').set('Cookie',cookie).send().expect(200);
     return expect (response.body.result.email).toEqual("testing@email.com");
})

it("returns 401 if user is not authenticated", async () => {
   
    return await request(app).get('/api/users/current').send().expect(401);
});