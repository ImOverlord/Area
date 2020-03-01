import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  // issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  issuer: 'https://github.com/login/oauth/authorize?client_id=d98405ce896b0f910209&scope=admin:repo_hook,repo',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'd98405ce896b0f910209',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'repo_hook,repo',
  showDebugInformation: true,
  responseType: 'code'
};
