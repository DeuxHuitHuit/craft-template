<?php

namespace modules\agencyauth\controllers;

use Craft;
use craft\web\Controller;
use craft\elements\User;


class LoginController extends Controller
{

    protected $allowAnonymous = ['index'];

    public function actionIndex()
    {
        $config = Craft::$app->config->getConfigFromFile('agency-auth');
        $currentSite = Craft::$app->getSites()->currentSite;

        $callbackUrl = $currentSite->getBaseUrl() . 'actions/agency-auth/callback';

        $base = 'https://accounts.google.com/o/oauth2/auth';
        $query = [
            'scope='. urlencode('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'),
            'redirect_uri='. urlencode($callbackUrl),
            'response_type=code',
            'client_id=' . $config['client_id'],
            'access_type=online',
        ];

        return $this->redirect($base . '?' . implode('&', $query));
    }
}
