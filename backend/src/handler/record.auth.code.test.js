'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const safeId = require('generate-safe-id');
const RecordAuthCodeHandler = require('./record.auth.code');

describe('record auth code handler', () => {
  let mockRequest;
  let mockResponse;
  let userRepo;
  let onedrive;
  let handler;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: sinon.stub(),
      send: sinon.stub()
    };
    mockResponse.status.returns(mockResponse);
    userRepo = {
      addUser: sinon.stub()
    };
    userRepo.addUser.resolves();
    onedrive = {
      getAccessTokenFromAuthCode: sinon.stub(),
      getUser: sinon.stub()
    };
    handler = new RecordAuthCodeHandler(onedrive, userRepo);
  });

  it('populates refresh token', async () => {
    const authCode = safeId();
    const accessToken = {
      refreshToken: safeId(),
      accessToken: safeId(),
      expiresIn: 5
    };
    const user = {
      id: safeId(),
      displayName: safeId(),
      redirectUri: safeId(),
      refreshToken: safeId()
    };
    const id = safeId();
    mockRequest.body = { authCode };
    onedrive.getAccessTokenFromAuthCode.resolves(accessToken);
    onedrive.getUser.resolves(user);

    await handler.handle(mockRequest, mockResponse);

    expect(userRepo.addUser.callCount).to.equal(1);
    expect(userRepo.addUser.firstCall.args[0]).to.eql(user);
    expect(mockResponse.status.callCount).to.equal(1);
    expect(mockResponse.status.firstCall.args[0]).to.equal(202);
  });
});
