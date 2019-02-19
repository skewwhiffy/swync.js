'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const safeId = require('generate-safe-id');
const GetCurrentUserHandler = require('./get.current.user');

describe('get current user handler', () => {
  let mockRequest;
  let mockResponse;
  let userRepository;
  let onedrive;
  let handler;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      send: sinon.stub()
    };
    userRepository = {
      getUser: sinon.stub()
    };
    onedrive = {
      getAuthenticationUrl: sinon.stub()
    };
    handler = new GetCurrentUserHandler(userRepository, onedrive);
  });
  
  it('returns redirect URL from onedrive service', async () => {
    const redirect = safeId();
    onedrive.getAuthenticationUrl.returns(redirect);
    const expectedResponse = { redirect };

    await handler.handle(mockRequest, mockResponse);

    expect(mockResponse.send.callCount).to.equal(1);
    expect(mockResponse.send.firstCall.args[0]).to.eql({ redirect });
  });

  it('returns current user data when logged in', async () => {
    const user = {
      id: safeId(),
      displayName: safeId(),
      refreshToken: safeId(),
      redirectUri: safeId()
    };
    userRepository.getUser.resolves(user);
    const expectedResponse = {
      displayName: user.displayName
    };

    await handler.handle(mockRequest, mockResponse);

    expect(mockResponse.send.callCount).to.equal(1);
    expect(mockResponse.send.firstCall.args[0]).to.eql(expectedResponse);
  });
});
