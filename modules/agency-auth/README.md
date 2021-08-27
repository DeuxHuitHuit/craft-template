# Agency Auth

## src/AgencyAuth.php
This file will prevent the manual login with a password into craft's CP. It will also add js and css into the login page for the oauth2 dialog button.

## src/controllers/DialogController.php
This will only redirect the user to the oauth2 dialog.

## src/controllers/CallbackController.php
This will handle the oauth2 callback and login the user.
