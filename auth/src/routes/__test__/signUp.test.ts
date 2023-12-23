import request from 'supertest'
import {app} from "../../app";
it("returns 201 for successful signup", async () => {
    return (await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"secret"
    }).expect(201));
})

it("returns 400 with an invalid email error", async () => {
    return (await request(app).post('/api/users/signup').send({
        email:"testexample.com",
        password:"secret"
    }).expect(400));
})

it("returns 400 with an invalid  password", async () => {
    return (await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"1234"
    }).expect(400));
})

it("returns 400 with an for missing email or password", async () => {
    await request(app).post('/api/users/signup').send({
        email:"test@example.com",
    }).expect(400);
    await request(app).post('/api/users/signup').send({
        password:"123456",
    }).expect(400);
})

it("Disallows duplicate email", async () => {
    await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"secret"
    }).expect(201);

    await request(app).post('/api/users/signup').send({
        email:"test@example.com",
        password:"secret"
    }).expect(400);
})

it("Sets up a cookie for successfull signup", async () => {
   const response= await request(app).post('/api/users/signup').send({
        email:"testing1@example.com",
        password:"secret"
    }).expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})