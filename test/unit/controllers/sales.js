const { expect } = require('chai');
const { before, after } = require('mocha');
const { stub } = require('sinon');
const salesController = require('../../../controllers/sales');
const salesService = require('../../../services/sales');

describe('Sales controllers', () => {
  const response = {};
  const request = {};

  const mockAllSales = [
    {
      "saleId": 1,
      "date": "2022-04-01T19:20:17.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2022-04-01T19:20:17.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2022-04-01T19:20:17.000Z",
      "productId": 3,
      "quantity": 15
    },
  ];
  const mockOneSale = [
    {
      "date": "2022-04-01T19:20:17.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "date": "2022-04-01T19:20:17.000Z",
      "productId": 2,
      "quantity": 10
    },
  ];
  const mockNewSale = [
    { "productId": 1, "quantity": 5 },
    { "productId": 2, "quantity": 10 },
  ];
  const mockInsertedSale = { id: 1, itemsSold: mockNewSale };
  const mockUpdatedSale = { saleId: 2, itemUpdated: mockNewSale };
  const mockNoSales = [];

  before(() => {
    response.status = stub().returns(response);
    response.json = stub().returns(response);
    response.end = stub();
  });

  describe('getAll', () => {
    before(() => {
      stub(salesService, 'getAll')
        .onFirstCall()
        .resolves(mockAllSales)
        .onSecondCall()
        .resolves(mockNoSales);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it("returns all sales", async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockAllSales)).to.be.true;
    });

    it("returns an empty array when there is no sales", async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockNoSales)).to.be.true;
    });
  });

  describe('getById', () => {
    before(() => {
      request.sale = mockOneSale;
      stub(salesService, 'getById').resolves(mockOneSale);
    });

    after(() => {
      salesService.getById.restore();
      request.sale = undefined
    });

    it("returns the right sale", async () => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockOneSale)).to.be.true;
    });
  });
  describe('insert', () => {
    before(() => {
      request.body = mockNewSale;
      stub(salesService, 'insert')
        .resolves(mockInsertedSale);
    });

    after(() => {
      salesService.insert.restore();
      request.body = undefined
    });

    it("returns the inserted sale", async () => {
      await salesController.insert(request, response);
      expect(response.status.calledWith(201)).to.be.true;
      expect(response.json.calledWith(mockInsertedSale)).to.be.true;
    });
  });
  describe('updateById', () => {
    before(() => {
      request.body = mockNewSale;
      request.params = { id: 2 };
      stub(salesService, 'updateById')
    });

    after(() => {
      salesService.updateById.restore();
      request.params = undefined
      request.body = undefined
    });

    it("returns the updated sale", async () => {
      await salesController.updateById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockUpdatedSale)).to.be.true;
    });
  });
});
