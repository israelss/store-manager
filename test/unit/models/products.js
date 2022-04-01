const { expect } = require('chai');
const { before } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

describe('Products model', () => {
  const mockAllProducts = [[
    { "id": 1, "name": "produto A", "quantity": 10 },
    { "id": 2, "name": "produto B", "quantity": 20 },
  ]];
  const mockOneProduct = [[{ "id": 2, "name": "produto B", "quantity": 20 }]];
  const mockNoProducts = [[]];
  const mockIdReturned = [{ insertId: 1 }];
  const mockRowsAffected = [{ affectedRows: 1 }];
  const mockNoRowsAffected = [{ affectedRows: 0 }];

  afterEach(() => {
    connection.execute.restore();
  });

  describe('getAll', () => {
    it("returns all products", async () => {
      sinon.stub(connection, 'execute').resolves(mockAllProducts);
      const result = await productsModel.getAll();

      expect(result).to.be.deep.equals(mockAllProducts[0]);
    });

    it("returns an empty array when there is no products", async () => {
      sinon.stub(connection, 'execute').resolves(mockNoProducts);
      const result = await productsModel.getAll();

      expect(result).to.be.deep.equals(mockNoProducts[0]);
    });
  });
  describe('getById', () => {
    it("returns the right product", async () => {
      sinon.stub(connection, 'execute').resolves(mockOneProduct);
      const result = await productsModel.getById(2);

      expect(result).to.be.deep.equals(mockAllProducts[0][1]);
    });

    it("returns undefined when product was not found", async () => {
      sinon.stub(connection, 'execute').resolves(mockNoProducts);
      const result = await productsModel.getById(10);

      expect(result).to.be.undefined;
    });
  });
  describe('getByName', () => {
    it("returns the right product", async () => {
      sinon.stub(connection, 'execute').resolves(mockOneProduct);
      const result = await productsModel.getByName('Produto B');

      expect(result).to.be.deep.equals(mockAllProducts[0][1]);
    });

    it("returns undefined when product was not found", async () => {
      sinon.stub(connection, 'execute').resolves(mockNoProducts);
      const result = await productsModel.getByName('Produto C');

      expect(result).to.be.undefined;
    });
  });
  describe('insert', () => {
    it("returns the id of inserted product", async () => {
      sinon.stub(connection, 'execute').resolves(mockIdReturned);
      const result = await productsModel.insert({ "name": "produto", "quantity": 10 });

      expect(result).to.be.deep.equals({ id: 1 });
    });
  });
  describe('updateById', () => {
    it("returns true if the product was uptaded", async () => {
      sinon.stub(connection, 'execute').resolves(mockRowsAffected);
      const result = await productsModel.updateById({ id: 1, name: "produto C", quantity: 20 });

      expect(result).to.be.true;
    });

    it("returns false if the product was not found", async () => {
      sinon.stub(connection, 'execute').resolves(mockNoRowsAffected);
      const result = await productsModel.updateById({ id: 100, name: "produto C", quantity: 20 });

      expect(result).to.be.false;
    });
  });
  describe('deleteById', () => {
    it("returns true if the product was deleted", async () => {
      sinon.stub(connection, 'execute').resolves(mockRowsAffected);
      const result = await productsModel.deleteById(1);

      expect(result).to.be.true;
    });

    it("returns false if the product was not found", async () => {
      sinon.stub(connection, 'execute').resolves(mockNoRowsAffected);
      const result = await productsModel.deleteById(100);

      expect(result).to.be.false;
    });
  });
});
