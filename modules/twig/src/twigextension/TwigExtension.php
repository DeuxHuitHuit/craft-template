<?php

namespace modules\twig\twigextension;

use Craft;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class TwigExtension extends AbstractExtension
{
    public function getFilters()
    {
        $filters = [];

        $filtersFolder = realpath(__DIR__ . '/../filters');
        $filtersFiles = scandir($filtersFolder);
        $filtersFiles = array_diff($filtersFiles, array('.', '..'));

        foreach ($filtersFiles as $file) {
            $file = current(explode('.', $file));
            $class = "\\modules\\twig\\filters\\$file";
            $i = new $class;
            $classFilters = $i->getFilters();

            foreach ($classFilters as $key => $value) {
                $filters[] = new TwigFilter($key, [$i, $value]);
            }
        }

        return $filters;
    }
}
