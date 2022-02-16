const { expect } = require("chai");
const sinon = require('sinon');

const SubscriberModel = require('../models/SubscriberModel');

const connection = require('../models/connection');

const subscribersMock = require('./mocks/subscribersMock');

describe('Models', () => {
  describe('SubscriberModel', () => {
    describe('getAll', () => {
      describe('Quando a tabela `subscribers` não tiver dados!', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([subscribersMock.empty]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('retorna um array vazio', async () => {
          const subscribers = await SubscriberModel.getAll();
          expect(subscribers).to.be.deep.equal(subscribersMock.empty);
        });
      });

      describe('Quando a tabela `subscribers` tiver dados!', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([subscribersMock.full]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('deve retornar os elementos esperados', async () => {
          const subscribers = await SubscriberModel.getAll();
          expect(subscribers).to.be.deep.equal(subscribersMock.full);
        });
      });
    });
  });
});
