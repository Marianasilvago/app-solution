import * as supertest from 'supertest';

const request = supertest('http://localhost:3000');

describe('app server', () => {

    describe('initializeServer', () => {

        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        it('should initialize the server with the correct upper-right coordinates of the rectangular grid', async () => {
            const response = await request.post('/api/initialise')
                .set('Content-type', 'application/json')
                .send({message: '5 5'});


            expect(response.status).toBe(200);
            expect(response.text).toBe('{"message":{"topRightX":5,"topRightY":5}}');
        });

        // @ts-ignore
        it('should return an error message if the input is invalid', async () => {
            const response = await request.post('/api/initialise')
                .set('Content-type', 'application/json')
                .send({message: '-5 5'});

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal server error');
        });

        // @ts-ignore
        it('should return an error message if the input is not a tuple', async () => {
            const response = await request.post('/api/initialise')
                .set('Content-type', 'application/json')
                .send({message: '5'});

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal server error');
        });

        // @ts-ignore
        it('should return an error message for out of bounds', async () => {
            const response = await request.post('/api/initialise')
                .set('Content-type', 'application/json')
                .send({message: '60 60'});

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal server error');
        });

        // @ts-ignore
        it('should return an error message if the input is a tuple of the wrong length', async () => {
            const response = await request.post('/api/initialise')
                .set('Content-type', 'application/json')
                .send({message: '5 5 5'});

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal server error');
        });

        // @ts-ignore
        it('should return an error message if the input is not a tuple of integers', async () => {
            const response = await request.post('/api/initialise')
                .set('Content-type', 'application/json')
                .send({message: '5 av'});

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal server error');
        });
    });

    describe('create robot', () => {
        // @ts-ignore
        it('should register robot', async () => {
            const response = await request.post('/api/robots')
                .set('Content-type', 'application/json')
                .send({message: 'R2D2 14E'});

            expect(response.status).toBe(200);
            expect(response.text).toBe('{"message":{"name":"R2D2","coordinate":{"x":1,"y":4},"direction":"E"}}');
        });
    });

    describe('get robot', () => {
        beforeEach(async () => {
            await request.post('/api/robots')
                .set('Content-type', 'application/json')
                .send({message: 'R2D2 14E'});
        });
        it('should return the position of a specific robot', async () => {
            const response = await request.get('/api/robots')
                .query({name: 'R2D2'});

            expect(response.status).toBe(200);
            expect(response.text).toBe('{"message":{"name":"R2D2","coordinate":{"x":1,"y":4},"direction":"E"}}');
        });

        it('should return an error if no robots match the name', async () => {
            const response = await request.get('/api/robots')
                .query({name: 'R1D2'});

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal server error');
        });
    });
});
