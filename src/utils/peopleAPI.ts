import { google } from 'googleapis'
import { Credentials } from 'google-auth-library'

export const getNewGoogleClient = (token: Credentials) => {
  const authClient = new google.auth.OAuth2()

  authClient.setCredentials(token)

  return google.people({ version: 'v1', auth: authClient })
}
