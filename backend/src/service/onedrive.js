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
    const request = await axios.post(
      'https://login.live.com/oauth20_token.srf',
      querystring.stringify(requestParameters),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return {
      refreshToken: request.refresh_token,
      accessToken: request.access_token,
      expiresIn: request.expires_in
    };
  };

  async getUser(accessToken, redirectUri) {
    throw Error('TODO');
    /*
        fun getUser(accessToken: AccessToken, redirectUri: URI): User {
        return Request(Method.GET, "v1.0/me/drive")
                .header("Authorization", "bearer ${accessToken.access_token}")
                .let { onedriveClients.graphClient(it) }
                .let { DriveResource(it) }
                .let { it.owner.user }
                .let { User(
                it.id,
                it.displayName,
                redirectUri.toString(),
                accessToken.refresh_token) }



  data class User(
    val id: String,
    val displayName: String,
    val redirectUri: String,
    val refreshToken: String
)
                */
  };
}

module.exports = Onedrive;
