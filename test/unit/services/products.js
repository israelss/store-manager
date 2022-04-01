const { expect } = require('chai');
const { before, after } = require('mocha');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('Products services', () => {
  const mockAllProducts = [
    { "id": 1, "name": "produto A", "quantity": 10 },
    { "id": 2, "name": "produto B", "quantity": 20 },
  ];
  const mockOneProduct = { "id": 2, "name": "produto B", "quantity": 20 };
  const mockNoProducts = [];
  const mockIdReturned = { id: 1 };

  describe('getAll', () => {
    before(() => {
      sinon
        .stub(productsModel, 'getAll')
        .onFirstCall()
        .resolves(mockAllProducts)
        .onSecondCall()
        .resolves(mockNoProducts);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it("returns all products", async () => {
      const result = await productsService.getAll();
      expect(result).to.be.deep.equals(mockAllProducts);
    });

    it("returns an empty array when there is no products", async () => {
      const result = await productsService.getAll();
      expect(result).to.be.deep.equals(mockNoProducts);
    });
  });

  describe('getById', () => {
    before(() => {
      sinon
        .stub(productsModel, 'getById')
        .onFirstCall()
        .resolves(mockOneProduct)
        .onSecondCall()
        .resolves(undefined);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it("returns the right product", async () => {
      const result = await productsService.getById(2);
      expect(result).to.be.deep.equals(mockOneProduct);
    });

    it("returns undefined when product was not found", async () => {
      const result = await productsService.getById(10);
      expect(result).to.be.undefined;
    });
  });
  describe('getByName', () => {
    before(() => {
      sinon
        .stub(productsModel, 'getByName')
        .onFirstCall()
        .resolves(mockOneProduct)
        .onSecondCall()
        .resolves(undefined);
    });

    after(() => {
      productsModel.getByName.restore();
    });

    it("returns the right product", async () => {
      const result = await productsService.getByName('produto B');
      expect(result).to.be.deep.equals(mockOneProduct);
    });

    it("returns undefined when product was not found", async () => {
      const result = await productsService.getByName('produto C');
      expect(result).to.be.undefined;
    });
  });
  describe('insert', () => {
    before(() => {
      sinon
        .stub(productsModel, 'insert')
        .resolves(mockIdReturned)
    });

    after(() => {
      productsModel.insert.restore();
    });

    it("returns the id of inserted product", async () => {
      const result = await productsService.insert({ "name": "produto", "quantity": 10 });
      expect(result).to.be.deep.equals({ id: 1 });
    });
  });
  describe('updateById', () => {
    before(() => {
      sinon
        .stub(productsModel, 'updateById')
        .onFirstCall()
        .resolves(true)
        .onSecondCall()
        .resolves(false);
    });

    after(() => {
      productsModel.updateById.restore();
    });

    it("returns true if the product was uptaded", async () => {
      const result = await productsService.updateById({ id: 1, name: "produto C", quantity: 20 });
      expect(result).to.be.true;
    });

    it("returns false if the product was not found", async () => {
      const result = await productsService.updateById({ id: 100, name: "produto C", quantity: 20 });
      expect(result).to.be.false;
    });
  });
  describe('deleteById', () => {
    before(() => {
      sinon
        .stub(productsModel, 'deleteById')
        .onFirstCall()
        .resolves(true)
        .onSecondCall()
        .resolves(false);
    });

    after(() => {
      productsModel.deleteById.restore();
    });

    it("returns true if the product was deleted", async () => {
      const result = await productsService.deleteById(1);
      expect(result).to.be.true;
    });

    it("returns false if the product was not found", async () => {
      const result = await productsModel.deleteById(100);
      expect(result).to.be.false;
    });
  });
});
