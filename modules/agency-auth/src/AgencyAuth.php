<?php
/**
 * Agency auth module for Craft CMS 3.x
 *
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\agencyauth;

use modules\agencyauth\web\assets\login\LoginAsset;

use Craft;

use craft\web\User;
use craft\services\Plugins;

use yii\base\Event;
use yii\base\Module;

class AgencyAuth extends Module
{
    public static $instance;

    public function __construct($id, $parent = null, array $config = [])
    {
        static::setInstance($this);
        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;

        Craft::setAlias('@modules/agencyauth', $this->getBasePath());

        $this->controllerNamespace = 'modules\agencyauth\controllers';

        Event::on(
            User::class,
            User::EVENT_BEFORE_LOGIN,
            [$this, 'onBeforeLogin']
        );

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_LOAD_PLUGINS,
            [$this, 'onAfterPluginLoad']
        );

        Craft::info('Agency Auth module loaded', __METHOD__);
    }

    public function onAfterPluginLoad($event)
    {
        $isConsoleRequest = Craft::$app->getRequest()->getIsConsoleRequest();

        if ($isConsoleRequest) {
            return;
        }

        $isCPRequest = Craft::$app->getRequest()->getIsCpRequest();
        $isLoginPage = Craft::$app->getRequest()->getSegment(1) === 'login';

        if (!$isConsoleRequest && !!$isCPRequest && !!$isLoginPage) {
            Craft::$app->getView()->registerAssetBundle(LoginAsset::class);
        }
    }

    public function onBeforeLogin($event)
    {
        $user = $event->identity;

        if (!!str_ends_with($user->email, '@deuxhuithuit.co')) {
            $request = Craft::$app->getRequest();
            $body = $request->getBodyParams();
            if (isset($body['password'])) {
                throw new \Exception('Deux Huit Huit users can\'t login with their password. Please use your Google Workspace account.');
            }
        }
    }
}
