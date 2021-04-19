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

        $user = Craft::$app->users->getUserByUsernameOrEmail($providerData['email']);

        if (empty($user)) {
            $newUser = new User();
            $newUser->username = $providerData['email'];
            $newUser->email = $providerData['email'];
            $newUser->firstName = $providerData['given_name'];
            $newUser->lastName = $providerData['family_name'];
            $newUser->suspended = false;
            $newUser->pending = false;
            $newUser->unverifiedEmail = null;
            $newUser->newPassword = 'Deuxhuithuit!';
            $newUser->admin  = true;

            try {
                Craft::$app->elements->saveElement($newUser, false);
                Craft::$app->getUsers()->activateUser($newUser);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $user = $newUser;
        }

        Craft::$app->getUser()->logout();

        if (!empty($user)) {

            if (!!$user->suspended) {
                return $this->asErrorJson('Your account is suspended.');
            }

            Craft::$app->getUser()->login($user);
            return $this->redirect(UrlHelper::cpUrl());
        }
    }
}
