const { expect } = require('chai');
const { after, before, describe, it } = require('mocha');
const { stub } = require('sinon');
const salesModel = require('../../../models/sales');
const salesService = require('../../../services/sales');

describe('Sales services', () => {
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
  const mockNoSales = [];

  describe('getAll', () => {
    before(() => {
      stub(salesModel, 'getAll')
        .onFirstCall()
        .resolves(mockAllSales)
        .onSecondCall()
        .resolves(mockNoSales);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it("returns all sales", async () => {
      const result = await salesService.getAll();
      expect(result).to.be.deep.equals(mockAllSales);
    });

    it("returns an empty array when there is no sales", async () => {
      const result = await salesService.getAll();
      expect(result).to.be.deep.equals(mockNoSales);
    });
  });
  describe('getById', () => {
    before(() => {
      stub(salesModel, 'getById')
        .onFirstCall()
        .resolves(mockOneSale)
        .onSecondCall()
        .resolves([]);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it("returns the right sale", async () => {
      const result = await salesService.getById(2);
      expect(result).to.be.deep.equals(mockOneSale);
    });

    it("returns undefined when sale was not found", async () => {
      const result = await salesService.getById(10);
      expect(result).to.be.null;
    });
  });
  describe('insert', () => {
    before(() => {
      stub(salesModel, 'insert').resolves(mockInsertedSale)
    });

    after(() => {
      salesModel.insert.restore();
    });

    it("returns inserted sale", async () => {
      const result = await salesService.insert(mockNewSale);
      expect(result).to.be.deep.equals({ id: 1, itemsSold: mockNewSale });
    });
  });
  describe('updateById', () => {
    before(() => {
      stub(salesModel, 'updateById')
        .onFirstCall()
        .resolves(true)
        .onSecondCall()
        .resolves(false);
    });

    after(() => {
      salesModel.updateById.restore();
    });

    it("returns true if the sale was uptaded", async () => {
      const result = await salesService.updateById({ id: 1, productId: 1, quantity: 6 });
      expect(result).to.be.true;
    });

    it("returns false if the sale was not found", async () => {
      const result = await salesService.updateById({ id: 100, productId: 1, quantity: 6 });
      expect(result).to.be.false;
    });
  });
});
