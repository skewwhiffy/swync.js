'use strict';

const expect = require('chai').expect;
const safeId = require('generate-safe-id');
const querystring = require('querystring');
const sinon = require('sinon');
const url = require('url');
const proxyquire = require('proxyquire');

describe('Onedrive service', () => {
  let axios;
  let onedrive;

  beforeEach(() => {
    axios = {
      get: sinon.stub(),
      post: sinon.stub()
    };
    const Onedrive = proxyquire('./onedrive', {
      'axios': axios
    });
    onedrive = new Onedrive();
  });

  it('returns correct authentication URL', () => {
    const test = safeId();

    const result = onedrive.getAuthenticationUrl(test);

    const parsed = url.parse(result, true);
    expect(parsed.protocol).to.equal('https:');
    expect(parsed.host).to.equal('login.live.com');
    expect(parsed.pathname).to.equal('/oauth20_authorize.srf');
    expect(Object.keys(parsed.query))
      .to
      .include
      .members(['client_id', 'scope', 'redirect_uri', 'response_type']);
  });

  it('makes correct call to get access token', async () => {
    const authCode = safeId();
    const redirectUrl = safeId();
    const onedriveResponse = {
      refresh_token: safeId(),
      access_token: safeId(),
      expires_in: 69
    };
    const expectedResponse = {
      refreshToken: onedriveResponse.refresh_token,
      accessToken: onedriveResponse.access_token,
      expiresIn: 69
    };
    axios.post.resolves({ data: onedriveResponse });

    const result = await onedrive.getAccessTokenFromAuthCode(authCode, redirectUrl);

    expect(axios.post.callCount).to.equal(1);
    const axiosCall = axios.post.firstCall.args[0];
    const axiosQuery = querystring.parse(axios.post.firstCall.args[1]);
    const axiosOptions = axios.post.firstCall.args[2];
    expect(result).to.be.eql(expectedResponse);
    expect(axiosCall).to.be.equal('https://login.live.com/oauth20_token.srf');
    expect(Object.keys(axiosQuery)).to.eql([
      'client_id',
      'redirect_uri',
      'client_secret',
      'grant_type',
      'code'
    ]);
    expect(axiosQuery.redirect_uri).to.equal(redirectUrl);
    expect(axiosQuery.grant_type).to.equal('authorization_code');
    expect(axiosQuery.code).to.equal(authCode);
    expect(axiosOptions.headers['Content-Type']).to.equal('application/x-www-form-urlencoded');
  });


  it('makes correct call to get user details', async () => {
    const accessToken = {
      refreshToken: safeId(),
      accessToken: safeId(),
      expiresIn: 70
    };
    const redirectUrl = safeId();
    const expectedResponse = {
      id: safeId(),
      displayName: safeId(),
      redirectUri: redirectUrl,
      refreshToken: accessToken.refreshToken
    };
    const onedriveResponse = {
      owner: {
        user: {
          id: expectedResponse.id,
          displayName: expectedResponse.displayName
        }
      }
    };
    axios.get.resolves({ data: onedriveResponse });

    const result = await onedrive.getUser(accessToken, redirectUrl);

    expect(axios.get.callCount).to.equal(1);
    expect(result).to.be.eql(expectedResponse);
  });
});
