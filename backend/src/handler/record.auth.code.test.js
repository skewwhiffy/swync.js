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
    handler = new RecordAuthCodeHandler(userRepo);
  });

  it('populates refresh token', () => {
    const authCode = safeId();
    const accessToken = {
      refreshToken: safeId(),
      accessToken: safeId(),
      expiresIn: 5
    };
    const id = safeId();
    const displayName = safeId();
    mockRequest.body = { authCode };

    handler.handle(mockRequest, mockResponse);

    expect(userRepo.addUser.callCount).to.equal(1);
    const userAdded = userRepo.addUser.firstCall.args[0];
    expect(userAdded).to.eql({
      refreshToken: accessToken.refreshToken,
      displayName
    });
    expect(mockResponse.status.callCount).to.equal(1);
    expect(mockResponse.status.firstCall.args[0]).to.equal(202);
  });
  /*
    @Test
    fun `one drive callback populates refresh token`() {
        every { oneDrive.getAccessToken(authCode, redirectUri) } returns accessToken
        every { oneDrive.getUser(accessToken, redirectUri) } returns
            User(id, displayName, redirectUri.toString(), accessToken.refresh_token)

        val response = """{"authCode":"$authCode"}"""
            .let { Request(POST, "/onedrive/authcode").body(it) }
            .let { api(it) }

        verify { oneDrive.getAccessToken(authCode, redirectUri) }
        val user = dependencies.userRepository.getUser() ?: throw AssertionError("Expected user entry")
        assertThat(user.refreshToken).isEqualTo(accessToken.refresh_token)
        assertThat(user.displayName).isEqualTo(displayName)
        assertThat(response.status).isEqualTo(ACCEPTED)
    }
  */
});
