const { assert, expect } = require("chai");
const sinon = require('sinon');

const subscribersMock = require('./mocks/subscribersMock');
const SubscriberService = require('../services/SubscriberService');
const SubscriberController = require('../controllers/SubscriberController');

describe('Controllers', () => {
  describe('SubscriberController', () => {
    describe('#getAll', () => {
      describe('Quando a tabela `subscribers` não possui dados', () => {
        const req = {};
        const res = {};

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(SubscriberService, 'getAll').resolves(subscribersMock.empty);
        });

        after(() => {
          SubscriberService.getAll.restore();
        });

        it('deve chamar a função `res.status` com valor 200', async () => {
          await SubscriberController.getAll(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('deve chamar a função `res.json` com um array vazio', async () => {
          await SubscriberController.getAll(req, res);
          expect(res.json.calledWith(subscribersMock.empty)).to.be.true;
        });
      });
      describe('Quando a tabela `subscribers` possui dados', () => {
        const req = {};
        const res = {};

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(SubscriberService, 'getAll').resolves(subscribersMock.full);
        });

        after(() => {
          SubscriberService.getAll.restore();
        });

        it('deve chamar `res.status` com valor 200', async () => {
          await SubscriberController.getAll(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('deve chamar `res.json` com os elementos esperados', async () => {
          await SubscriberController.getAll(req, res);
          expect(res.json.calledWith(subscribersMock.full)).to.be.true;
        });
      });
    });
  });
});