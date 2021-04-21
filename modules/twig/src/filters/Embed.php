<?php

namespace modules\twig\filters;

use modules\twig\abstracts\Filter;

use Craft;

class Embed extends Filter
{
    public function getFilters()
    {
        return [
            'youtube' => 'youtube',
        ];
    }

    public function youtube($src, $thumbnail = null)
    {
        if (empty($src) || strlen($src) > 2083) {
            if ($this->isDevMode()) {
                throw new \Exception('Input value is null or is longer than 2032 characters.');
            }
            return '';
        }
        $reg = '/(?:https?:\/{2}(?:(?:www.youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))|(?:youtu\.be\/)))([a-zA-Z0-9_-]{11})/';
        preg_match($reg, $src, $match);
        $thumbnailAttr = $thumbnail ? 'style="background-image: url(' . $thumbnail . ');"' : '';
        if (isset($match[1])) {
            return '<lite-youtube ' . $thumbnailAttr . 'videoid="' . $match[1] . '" params="modestbranding=1&rel=0&autoplay=1"></lite-youtube>';
        } elseif ($this->isDevMode()) {
            throw new \Exception('Not a valid Youtube link.');
        } else {
            return '';
        }
    }
}
