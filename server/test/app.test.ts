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

            console.log(response.text);

            expect(response.status).toBe(200);
            expect(response.text).toBe('{"message":{"x":5,"y":5}}');
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
});
