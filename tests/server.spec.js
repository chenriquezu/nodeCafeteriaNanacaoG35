const request = require("supertest");
const server = require("../index");

describe('Set de Pruebas  API Cafetería Nanacao', () => {
    // Prueba 1: GET /cafes debe devolver un arreglo con al menos un objeto
   it('GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto', async () => {
       const response = await request(server).get('/cafes').send();
       expect(response.statusCode).toBe(200);
       expect(response.body).toBeInstanceOf(Array);
       expect(response.body.length).toBeGreaterThan(0); 
    });

    // Prueba 2: id Intentar eliminar un café con un ID inexistente debe devolver un código 404
    it('DELETE /cafes/:id al eliminar un café con un ID inexistente devuelve un código 404', async () => {
         const jwtoken = "token";
         const idInexistente = '5';
         const response = await request(server).delete(`/cafes/${idInexistente}`).set('Authorization', jwtoken).send();
         expect(response.statusCode).toBe(404);
    });

    // Prueba 3: POST /cafes agrega un nuevo café y devuelve un código 201
    it('POST /cafes agrega un nuevo café y devuelve un código 201', async () => {
        const Cafe = { id:5, nombre: 'Café de nueva selección'};
        const response = await request(server).post('/cafes').send(Cafe);
        expect(response.body).toContainEqual(Cafe);
        expect(response.statusCode).toBe(201);
    });
    
     // Prueba 4: a PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload
     it('PUT /cafes/:a PUT /cafes devuelve un status code 400 si  actualizas un café enviando un id en los parámetros que sea diferente payload', async () => {
       const id = '10';
        const payload = { id: '9', nombre: 'Café ha sido Modificado'};
        const response = await request(server).put(`/cafes/${id}`).send(payload);
        expect(response.statusCode).toBe(400);
    });
    
});
