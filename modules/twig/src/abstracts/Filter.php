<?php
namespace modules\twig\abstracts;

use Craft;

abstract class Filter
{
    abstract public function getFilters();

    protected function isDevMode()
    {
        return Craft::$app->getConfig()->getGeneral()->devMode;
    }
}
