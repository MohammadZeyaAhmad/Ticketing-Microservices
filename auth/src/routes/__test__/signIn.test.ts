import request from 'supertest'
import {app} from "../../app";
it("returns 200 for successful signin", async () => {
    await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"secret"
    }).expect(201);

    return await request(app).post('/api/users/signin').send({
        email:"test@example.com",
        password:"secret"
    }).expect(200);
})

it("fails when an email that doesn't exists is provided", async () => {
    return await request(app).post('/api/users/signin').send({
        email:"test123@example.com",
        password:"secret"
    }).expect(400);
  
})

it("fails when an incorrect password is provided", async () => {
     await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"secret"
    }).expect(201);
    
    return await request(app).post('/api/users/signin').send({
        email:"test@example.com",
        password:"1234"
    }).expect(400);
  
})

it("returns a cookie if valid credentials are provided", async () => {
     await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"secret"
    }).expect(201);
    
    const response= await request(app).post('/api/users/signin').send({
        email:"test@example.com",
        password:"secret"
    });

     expect(response.get('Set-Cookie')).toBeDefined();
  
})




