const { expect } = require('chai');
const { afterEach, describe, it, after } = require('mocha');
const { stub } = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('Sales model', () => {
  const mockAllSales = [[
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
  ]];
  const mockOneSale = [[
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
  ]];
  const mockNewSale = [
    { "productId": 1, "quantity": 5 },
    { "productId": 2, "quantity": 10 },
  ];
  const mockNoSales = [[]];
  const mockIdReturned = [{ insertId: 1 }];
  const mockRowsAffected = [{ affectedRows: 1 }];
  const mockNoRowsAffected = [{ affectedRows: 0 }];

  afterEach(() => {
    connection.execute.restore();
  });

  describe('getAll', () => {
    it("returns all sales", async () => {
      stub(connection, 'execute').resolves(mockAllSales);
      const result = await salesModel.getAll();

      expect(result).to.be.deep.equals(mockAllSales[0]);
    });

    it("returns an empty array when there is no sales", async () => {
      stub(connection, 'execute').resolves(mockNoSales);
      const result = await salesModel.getAll();

      expect(result).to.be.deep.equals(mockNoSales[0]);
    });
  });
  describe('getById', () => {
    it("returns the right sale", async () => {
      stub(connection, 'execute').resolves(mockOneSale);
      const result = await salesModel.getById(2);

      expect(result).to.be.deep.equals(mockOneSale[0]);
    });

    it("returns undefined when sale was not found", async () => {
      stub(connection, 'execute').resolves(mockNoSales);
      const result = await salesModel.getById(10);

      expect(result).to.be.deep.equals([]);
    });
  });
  describe('insert', () => {
    after(() => {
      connection.query.restore();
    })
    it("returns inserted sale", async () => {
      stub(connection, 'execute').resolves(mockIdReturned);
      stub(connection, 'query');
      const result = await salesModel.insert(mockNewSale);

      expect(result).to.be.deep.equals({ id: 1, itemsSold: mockNewSale });
    });
  });
  describe('updateById', () => {
    it("returns true if the sale was uptaded", async () => {
      stub(connection, 'execute').resolves(mockRowsAffected);
      const result = await salesModel.updateById({ id: 1, productId: 1, quantity: 6 });

      expect(result).to.be.true;
    });

    it("returns false if the sale was not found", async () => {
      stub(connection, 'execute').resolves(mockNoRowsAffected);
      const result = await salesModel.updateById({ id: 100, productId: 1, quantity: 6 });

      expect(result).to.be.false;
    });
  });
  describe('deleteById', () => {
    it("returns true if the sale was deleted", async () => {
      stub(connection, 'execute').resolves(mockRowsAffected);
      const result = await salesModel.deleteById( 1);

      expect(result).to.be.true;
    });

    it("returns false if the sale was not found", async () => {
      stub(connection, 'execute').resolves(mockNoRowsAffected);
      const result = await salesModel.deleteById(100);

      expect(result).to.be.false;
    });
  });
});
