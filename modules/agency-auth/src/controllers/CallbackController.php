<?php

namespace modules\agencyauth\controllers;

use Craft;
use craft\web\Controller;
use craft\elements\User;
use craft\helpers\UrlHelper;

use GuzzleHttp;

class CallbackController extends Controller
{

    protected $allowAnonymous = ['index'];

    public function actionIndex()
    {
        $config = Craft::$app->config->getConfigFromFile('agency-auth');

        $query = Craft::$app->request->getQueryParams();
        $code = $query['code'];

        $client = new GuzzleHttp\Client();

        $currentSite = Craft::$app->getSites()->currentSite;

        $callbackUrl = $currentSite->getBaseUrl() . 'actions/agency-auth/callback';

        // see: https://developers.google.com/identity/protocols/oauth2/web-server#httprest

        // 1. Get access token from Google with ?code= qs param

        $url = 'https://oauth2.googleapis.com/token';

        $r = $client->request('POST', $url, [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
            'form_params' => [
                'client_id' => $config['client_id'],
                'client_secret' => $config['client_secret'],
                'code' => $code,
                'grant_type' => 'authorization_code',
                'redirect_uri' => $callbackUrl,
            ],
            'http_errors' => false,
        ]);

        if ($r->getStatusCode() !== 200) {
            return 'false';
        }

        $r = json_decode($r->getBody(), true);




        // 2. With the access token, get the user info from Google

        $url = 'https://www.googleapis.com/oauth2/v2/userinfo?fields=name,given_name,family_name,email,locale,picture,verified_email';

        $r = $client->request('GET', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $r['access_token'],
            ],
            'http_errors' => false,
        ]);

        if ($r->getStatusCode() !== 200) {
            return false;
        }

        $providerData = json_decode($r->getBody(), true);




        // 3. With the Google's user info, find or create a user in Craft

        $user = Craft::$app->users->getUserByUsernameOrEmail($providerData['email']);

        // if no one was found, create a new admin user
        if (empty($user)) {
            $newUser = new User();
            $newUser->username = $providerData['email'];
            $newUser->email = $providerData['email'];
            $newUser->firstName = $providerData['given_name'];
            $newUser->lastName = $providerData['family_name'];
            $newUser->suspended = false;
            $newUser->pending = false;
            $newUser->unverifiedEmail = null;
            $newUser->admin  = true;

            // set the password to a generic, unusable password from an anonymous user
            $newUser->newPassword = 'Deuxhuithuit!';

            try {
                Craft::$app->elements->saveElement($newUser, false);
                Craft::$app->getUsers()->activateUser($newUser);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $user = $newUser;
        }

        // make sure if someone is logged in, they are logged out with this
        Craft::$app->getUser()->logout();

        if (!empty($user)) {

            // Even though the Google Workspace account is valid and active we can always suspend
            // the craft account if need be.
            if (!!$user->suspended) {
                return $this->asErrorJson('Your account is suspended.');
            }

            Craft::$app->getUser()->login($user);

            // redirect to the dashboard
            return $this->redirect(UrlHelper::cpUrl());
        }
    }
}
