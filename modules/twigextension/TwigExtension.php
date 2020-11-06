<?php
/**
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\twigextension;

use modules\twigextension\twigextension\TwigExtension as TwigExtensionClass;

use Craft;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;

class TwigExtension extends Module
{
    public static $instance;

    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/twigextension', $this->getBasePath());

        // Set this as the global instance of this module class
        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
		self::$instance = $this;

		if (Craft::$app->request->getIsSiteRequest()) {
			$extension = new TwigExtensionClass();
			Craft::$app->view->registerTwigExtension($extension);
		}

        Craft::info('Twig extension module loaded', __METHOD__);
    }
}
