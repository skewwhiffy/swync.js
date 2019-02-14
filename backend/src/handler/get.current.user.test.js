'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const safeId = require('generate-safe-id');

describe('get current user handler', () => {
  let mockRequest;
  let mockResponse;
  let onedrive;
  let handler;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      send: sinon.stub()
    };
    onedrive = {
      getAuthenticationUrl: sinon.stub()
    };
    handler = proxyquire('./get.current.user', {
      '../service/onedrive': onedrive
    });
  });
  
  it('returns redirect URL from onedrive service', async () => {
    const redirect = safeId();
    onedrive.getAuthenticationUrl.returns(redirect);

    handler(mockRequest, mockResponse);

    expect(mockResponse.send.callCount).to.equal(1);
    expect(mockResponse.send.firstCall.args[0]).to.eql({ redirect });
  });
});
