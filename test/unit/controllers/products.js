const { expect } = require('chai');
const { before, after } = require('mocha');
const { stub } = require('sinon');
const productsController = require('../../../controllers/products');
const productsService = require('../../../services/products');

describe('Products controllers', () => {
  const response = {};
  const request = {};

  const mockAllProducts = [
    { "id": 1, "name": "produto A", "quantity": 10 },
    { "id": 2, "name": "produto B", "quantity": 20 },
  ];
  const mockOneProduct = { "id": 2, "name": "produto B", "quantity": 20 };
  const mockNoProducts = [];
  const mockIdReturned = { id: 2 };

  before(() => {
    response.status = stub().returns(response);
    response.json = stub().returns(response);
    response.end = stub();
  });

  describe('getAll', () => {
    before(() => {
      stub(productsService, 'getAll')
        .onFirstCall()
        .resolves(mockAllProducts)
        .onSecondCall()
        .resolves(mockNoProducts);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it("returns all products", async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockAllProducts)).to.be.true;
    });

    it("returns an empty array when there is no products", async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockNoProducts)).to.be.true;
    });
  });

  describe('getById', () => {
    before(() => {
      request.product = mockOneProduct;
      stub(productsService, 'getById').resolves(mockOneProduct);
    });

    after(() => {
      productsService.getById.restore();
      request.product = undefined
    });

    it("returns the right product", async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockOneProduct)).to.be.true;
    });
  });
  describe('insert', () => {
    before(() => {
      request.body = { name: "produto B", quantity: 20 };
      stub(productsService, 'insert')
        .resolves(mockIdReturned);
    });

    after(() => {
      productsService.insert.restore();
      request.body = undefined
    });

    it("returns the id of inserted product", async () => {
      await productsController.insert(request, response);
      expect(response.status.calledWith(201)).to.be.true;
      expect(response.json.calledWith(mockOneProduct)).to.be.true;
    });
  });
  describe('updateById', () => {
    before(() => {
      request.body = { name: "produto B", quantity: 20 };
      request.product = { id: 2 };
      stub(productsService, 'updateById')
    });

    after(() => {
      productsService.updateById.restore();
      request.product = undefined
      request.body = undefined
    });

    it("returns true if the product was uptaded", async () => {
      await productsController.updateById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(mockOneProduct)).to.be.true;
    });
  });
  describe('deleteById', () => {
    before(() => {
      request.product = { id: 2 };
      stub(productsService, 'deleteById')
    });

    after(() => {
      productsService.deleteById.restore();
      request.product = undefined;
    });
    it("returns true if the product was deleted", async () => {
      await productsController.deleteById(request, response);
      expect(response.status.calledWith(204)).to.be.true;
      expect(response.end.called).to.be.true;
    });
  });
});
