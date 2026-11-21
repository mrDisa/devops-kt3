const request = require('supertest');
const app = require('../src/app');

describe('KT3 App', () => {
  test('GET / returns KT3 App', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('INTENTIONALLY BROKEN');
  });

  test('GET /health returns status ok JSON', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
