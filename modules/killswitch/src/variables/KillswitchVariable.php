<?php

namespace modules\killswitch\variables;

use Craft;

class KillswitchVariable
{
    public function __construct()
    {
        $configs = Craft::$app->config->getConfigFromFile('switch');

        foreach ($configs as $key => $value) {
            $this->{$key} = $value;
        }
    }
}
