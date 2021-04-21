<?php

namespace modules\twig\filters;

use modules\twig\abstracts\Filter;

use Craft;
use craft\elements\Asset;

class Video extends Filter
{
    public function getFilters()
    {
        return [
            'video' => 'videoTag',
            'video_url' => 'videoUrl'
        ];
    }

    public function videoUrl($asset, $options = [])
    {
        if (empty($asset) || !$asset instanceof Asset) {
            if ($this->isDevMode()) {
                throw new \Exception('Input value is null or not a craft\elements\Asset instance.');
            }
            return '';
        }

        $config = Craft::$app->config->getConfigFromFile('general');
        $src = $asset->getUrl();

        return $src;
    }

    public function videoTag($asset, $options = [], $track = [])
    {
        if (empty($asset) || !$asset instanceof Asset) {
            if ($this->isDevMode()) {
                throw new \Exception('Input value is null or not a craft\elements\Asset instance.');
            }
            return '';
        }

        $src = $this->videoUrl($asset);
        $type = $asset->mimeType;

        $computedAttributes = [];
        $computedTrackAttributes = [];

        foreach ($options as $key => $value) {
            if (!empty($value)) {
                $computedAttributes[] = $key . '="' . $value . '"';
            }
        }
        foreach ($track as $key => $value) {
            $computedTrackAttributes[] = $key . '="' . $value . '"';
        }

        $computedAttributes = implode(' ', $computedAttributes);
        $computedTrackAttributes = implode(' ', $computedTrackAttributes);

        return '<video ' . $computedAttributes . '>
                    <source src="' . $src . '" type="' . $type . '" />
                    ' . (count($track) > 0 ? '<track ' . $computedTrackAttributes . ' />' : '') . '
                </video>';
    }
}
