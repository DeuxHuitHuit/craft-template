<?php
/**
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\twigextensionmodule;

use modules\twigextensionmodule\twigextension\TwigExtension;

use Craft;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;

/**
 * Craft plugins are very much like little applications in and of themselves. We’ve made
 * it as simple as we can, but the training wheels are off. A little prior knowledge is
 * going to be required to write a plugin.
 *
 * For the purposes of the plugin docs, we’re going to assume that you know PHP and SQL,
 * as well as some semi-advanced concepts like object-oriented programming and PHP namespaces.
 *
 * https://craftcms.com/docs/plugins/introduction
 *
 * @author    Deux Huit Huit
 * @package   Build
 * @since     0.1.0
 *
 */
class TwigExtensionModule extends Module
{
    // Static Properties
    // =========================================================================

    /**
     * Static property that is an instance of this module class so that it can be accessed via
     * TwigExtensionModule::$instance
     *
     * @var TwigExtensionModule
     */
    public static $instance;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/twigextensionmodule', $this->getBasePath());

        // Set this as the global instance of this module class
        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
		self::$instance = $this;

		if (Craft::$app->request->getIsSiteRequest()) {
			$extension = new TwigExtension();
			Craft::$app->view->registerTwigExtension($extension);
		}

        Craft::info('Twig extension module loaded', __METHOD__);
    }
}
