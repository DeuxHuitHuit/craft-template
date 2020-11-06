<?php
/**
 *
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\twigextension\twigextension;

use Craft;

use Twig_Extension;
use Twig_SimpleFilter;

/**
 * Twig Extension
 *
 * @author    Deux Huit Huit
 * @package   Build
 * @since     0.1.0
 */
class TwigExtension extends Twig_Extension
{
    public function getFilters(): array
    {
        return [
            new Twig_SimpleFilter('autoUrl', [$this, 'autoUrl'])
        ];
    }

    public function autoUrl($button) {
        $target = $button->targetPage->one();
        $absolute = $button->absoluteUrl;
        $url = $target->url ?? $absolute;
        return $url;
    }
}
