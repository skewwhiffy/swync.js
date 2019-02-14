'use strict';

const expect = require('chai').expect;
const safeId = require('generate-safe-id');
const url = require('url');

describe('Onedrive service', () => {
  let onedrive;

  beforeEach(() => {
    onedrive = require('./onedrive');
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
});
