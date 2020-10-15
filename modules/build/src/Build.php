<?php
/**
 * Build module for Craft CMS 3.x
 *
 * Build system for 288 dev
 *
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\build;

use modules\build\variables\BuildVariable;

use Craft;
use craft\web\twig\variables\CraftVariable;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;

class Build extends Module
{

    public static $instance;

    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/build', $this->getBasePath());

        // Set this as the global instance of this module class
        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;

        // Register our variables
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                $variable = $event->sender;
                $variable->set('build', BuildVariable::class);
            }
        );

        Craft::info('Build module loaded', __METHOD__);
    }
}
