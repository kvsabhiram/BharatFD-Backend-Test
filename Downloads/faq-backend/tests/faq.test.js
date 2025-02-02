const request = require('supertest');
const app = require('../src/app');

describe('FAQ API', () => {
  it('should create a new FAQ', async () => {
    const response = await request(app)
      .post('/api/faqs')
      .send({ question: 'What is Node.js?', answer: '<p>Node.js is a runtime.</p>' });
    expect(response.status).toBe(201);
    expect(response.body.question).toBe('What is Node.js?');
  });

  it('should fetch FAQs in Hindi', async () => {
    const response = await request(app).get('/api/faqs?lang=hi');
    expect(response.status).toBe(200);
    expect(response.body[0].question).toBeDefined();
  });
});