'use strict';

const clientId = '21133f26-e5d8-486b-8b27-0801db6496a9'
const clientSecret = 'gcyhkJZK73!$:zqHNBE243}'
const scopes = [ 'files.readwrite', 'offline_access' ]

const getAuthenticationUrl = redirectUrl => {
  const queryVariables = {
    client_id: clientId,
    scope: scopes.join(' '),
    redirect_uri: redirectUrl,
    response_type: 'code'
  };
  const queryVariablesString = Object
    .keys(queryVariables)
    .map(it => `${it}=${queryVariables[it]}`)
    .join('&');
  return `https://login.live.com/oauth20_authorize.srf?${queryVariablesString}`;
};

module.exports = {
  getAuthenticationUrl
};
