<?php

namespace modules\twig\filters;

use modules\twig\abstracts\Filter;

use Craft;
use craft\elements\Asset;

class Image extends Filter
{
    public function getFilters()
    {
        return [
            'img' => 'imgTag',
            'img_url' => 'imgUrl'
        ];
    }

    public function imgUrl($asset, $options = [])
    {
        if (empty($asset) || !$asset instanceof Asset) {
            if ($this->isDevMode()) {
                throw new \Exception('Input value is null or not a craft\elements\Asset instance.');
            }
            return '';
        }

        $size = !!isset($options['size']) ? $options['size'] : [
            'width' => 1920,
            'height' => 0,
        ];

        $config = Craft::$app->config->getConfigFromFile('general');
        $url = '';

        if (isset($config['ficelle']) && !empty($config['ficelle'])) {
            $transform = '';

            if (!empty($size['width'])) {
                $transform .= '&width=' . $size['width'];
            }

            if (!empty($size['height'])) {
                $transform .= '&height=' . $size['height'];
            }

            $url = 'https://' . $config['ficelle'] . '.ficelle.app/v1?src=' . urlencode($asset->getUrl()) . $transform;
        } else {
            $url = $asset->getUrl([
                'width' => $size['width'] ?? 0,
                'height' => $size['height'] ?? 0
            ]);
        }

        return $url;
    }

    public function imgTag($asset, $options = [])
    {
        if (empty($asset) || !$asset instanceof Asset) {
            if ($this->isDevMode()) {
                throw new \Exception('Input value is null or not a craft\elements\Asset instance.');
            }
            return '';
        }

        $images = [
            [
                'width' => '400',
                'height' => '0'
            ],
            [
                'width' => '600',
                'height' => '0'
            ],
            [
                'width' => '800',
                'height' => '0'
            ],
            [
                'width' => '1000',
                'height' => '0'
            ],
            [
                'width' => '1200',
                'height' => '0'
            ],
            [
                'width' => '1600',
                'height' => '0'
            ],
            [
                'width' => '1920',
                'height' => '0'
            ]
        ];

        foreach ($images as $index => $image) {
            $images[$index]['url'] = $this->imgUrl($asset, [
                'size' => $image,
            ]);
        }

        $srcset = implode(', ', array_map(function ($image) {
            return trim($image['url'] . ' ' . $image['width'] . 'w');
        }, $images));

        $sizes = !!isset($options['sizes']) ? implode(', ', array_map(function ($size) {
            $mq = isset($size['mq']) ? $size['mq'] : '';
            return trim($mq . ' ' . $size['width']);
        }, $options['sizes'])) : '100vw';

        $attributes = [
            'srcset' => $srcset,
            'sizes' => $sizes,
            'src' => $this->imgUrl($asset),
            'alt' => $asset->alt,
        ];

        $attributes = array_merge(isset($options) ? $options : [], $attributes);
        $computedAttributes = [];

        foreach ($attributes as $key => $value) {
            $computedAttributes[] = $key . '="' . $value . '"';
        }

        $computedAttributes = implode(' ', $computedAttributes);

        return '<picture><img ' . $computedAttributes . ' /></picture>';
    }
}
