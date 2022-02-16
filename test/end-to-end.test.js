const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const connection = require('../models/connection');
const subscribersMock = require('./mocks/subscribersMock');

chai.use(chaiHttp);

describe.only('API', () => {
  describe('GET /subscribers', () => {
    describe('Quando não existem dados na tabela subscribers', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([subscribersMock.empty]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('deve responder com o status 200', async () => {
        const response = await chai.request(app).get('./subscribers');
        expect(response.status).to.be.equal(200);
      });

      it('deve responder com um array vazio no body', async () => {
        const response = await chai.request(app).get('./subscribers');
        expect(response.body).to.be.deep.equal(subscribersMock.empty);
      });
    });

    describe('Quando existem dados na tabela', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([subscribersMock.full]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('deve responder com status 200', async () => {
        const response = await chai.request(app).get('./subscribers');
        expect(response.status).to.be.equal(200);
      });

      it('deve responder com os elementos esperados no body', async () => {
        const response = await chai.request(app).get('./subscribers');
        expect(response.body).to.be.deep.equal(subscribersMock.full);
      });
    });
  });
});
