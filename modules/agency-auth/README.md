# Agency Auth

## Create and save the credentials
1. [Create OAuth client ID here](https://console.cloud.google.com/apis/credentials/oauthclient?folder=&organizationId=&project=deux-huit-huit-craft-login)
2. Application type to Web application
3. Name the credentials with the client's project name
4. Add the authorized redirect URIs according to your setup. e.g. `https://mywebsite.288dev.com/actions/agency-auth/callback` no language are required.
5. Save the credentials
6. Fill the credentials in the `/config/agency-auth.php` file
7. Commit the changes

## src/AgencyAuth.php
This file will prevent the manual login with a password into craft's CP. It will also add js and css into the login page for the oauth2 dialog button.

## src/controllers/DialogController.php
This will only redirect the user to the oauth2 dialog.

## src/controllers/CallbackController.php
This will handle the oauth2 callback and login the user.
