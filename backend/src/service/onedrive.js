'use strict';

const axios = require('axios');
const querystring = require('querystring');
const clientId = '21133f26-e5d8-486b-8b27-0801db6496a9'
const clientSecret = 'gcyhkJZK73!$:zqHNBE243}'
const scopes = [ 'files.readwrite', 'offline_access' ]

class Onedrive {
  getAuthenticationUrl(redirectUrl) {
    const queryVariables = {
      client_id: clientId,
      scope: scopes.join(' '),
      redirect_uri: redirectUrl,
      response_type: 'code'
    };
    const queryVariablesString = querystring.stringify(queryVariables);
    return `https://login.live.com/oauth20_authorize.srf?${queryVariablesString}`;
  };

  async getAccessTokenFromAuthCode(authCode, redirectUri) {
    const requestParameters = {
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: authCode
    };
    const response = await axios.post(
      'https://login.live.com/oauth20_token.srf',
      querystring.stringify(requestParameters),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return {
      refreshToken: response.data.refresh_token,
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in
    };
  };

  async getUser(accessToken, redirectUri) {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/drive',
      { headers: { Authorization: `bearer ${accessToken.accessToken}` } }
    );
    const user = response.data.owner.user;
    return {
      id: user.id,
      displayName: user.displayName,
      redirectUri,
      refreshToken: accessToken.refreshToken
    };
  };
}

module.exports = Onedrive;
