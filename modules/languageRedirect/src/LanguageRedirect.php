<?php
/**
 * LanguageRedirect module for Craft CMS 3.x
 *
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\languageRedirect;

use Craft;
use craft\web\Request;

use yii\base\Module;

class LanguageRedirect extends Module
{

    public static $instance;

    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/languageRedirect', $this->getBasePath());

        // Set this as the global instance of this module class
        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;
        $request = Craft::$app->request;

        if (!$request instanceof Request) {
            return;
        }

        $path = $request->fullPath;
        $firstFrag = current(explode('/', $path));
        $sites = Craft::$app->sites->allSites;
        $supportedLangs = [];
        foreach ($sites as $site) {
            $supportedLangs[$site->language] = $site->getBaseUrl();
        }

        // check if siteRequest (for front-end)
        // check if first fragment is a supported language
        if ($request->isSiteRequest && empty($supportedLangs[$firstFrag]) && $request->method === 'GET' && !isset($request->queryParams['action'])) {
            $acceptLangs = explode(',', $request->headers->get('accept-language'));
            $acceptedLangs = [];
            $qs = empty($request->queryStringWithoutPath) ? '' : '?' . $request->queryStringWithoutPath;

            $url = Craft::$app->sites->primarySite->getBaseUrl();

            foreach ($acceptLangs as $acceptLang) {
                $acceptLang = explode(';', $acceptLang);
                $acceptLang = current($acceptLang);
                if (!empty($supportedLangs[$acceptLang])) {
                    $url = $supportedLangs[$acceptLang];
                    break;
                }
            }

            Craft::$app->response->redirect($url . $path . $qs);
        }

        Craft::info('LanguageRedirect module loaded', __METHOD__);
    }
}
