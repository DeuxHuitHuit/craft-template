<?php
/**
 * Build module for Craft CMS 3.x
 *
 * Build system for 288 dev
 *
 * @link      https://deuxhuithuit.com
 * @copyright Copyright (c) 2020 Deux Huit Huit
 */

namespace modules\build\variables;

use modules\build\Build;

use Craft;


class BuildVariable
{

    private function loadJson($file = null)
    {
        $result = [];

        $rawContent = @file_get_contents(CRAFT_BASE_PATH . $file);

        if (!$rawContent) {
            $result['error'] = $file . ' not readable or not found';
            return $result;
        }

        $json = json_decode($rawContent);

        if (empty($json)) {
            $result['error'] = 'invalid json in ' . $file;
            return $result;
        }

        $result = $json;

        return $result;
    }

    public function js()
    {
        return $this->loadJson('/js.json');
    }

    public function css()
    {
        return $this->loadJson('/css.json');
    }

    public function build()
    {
        return $this->loadJson('/build.json');
    }

    public function package()
    {
        return $this->loadJson('/package.json');
    }
    
    public function fonts()
    {
		$fontsPath = CRAFT_BASE_PATH.'/web/assets/fonts/';
		$fonts = array();
		$files = array_diff(scandir($fontsPath), array('.', '..'));;

		forEach ($files as $file)
		{
			$font = explode('.', $file)[0];

			if (!in_array($font, $fonts)) {
				array_push($fonts, $font);
			}
		}

		return $fonts;
	}

    public function livereload()
    {
        $isLivereload = false;
        $devServerHost = '.288dev.com';
        $qs = Craft::$app->request->queryParams;
        $isLivereloadInQuery = isset($qs['livereload']);
        $inDevServer = strpos(Craft::$app->request->hostName, $devServerHost) !== false && Craft::$app->config->env === 'dev';
        $cookieTime = 2123798400;
        $cookieSet = isset($_COOKIE['livereload']);

        if (!$inDevServer) {
            return false;
        }

        if ($isLivereloadInQuery) {
            $isLivereload = true;

            if ($qs['livereload'] === 'no') {
                $cookieTime = time() - 3600;
                $isLivereload = false;
            }

            setcookie(
                'livereload',
                '1',
                $cookieTime,
                '/',
                $devServerHost,
                true,
                true
            );
        } else {
            $isLivereload = $cookieSet;
        }

        return $isLivereload;
    }

    public function debug()
    {
        $isDebug = false;
        $devServerHost = '.288dev.com';
        $qs = Craft::$app->request->queryParams;
        $isUseDevInQuery = isset($qs['use-dev']);
        $inDevServer = strpos(Craft::$app->request->hostName, $devServerHost) !== false && Craft::$app->config->env === 'dev';
        $cookieTime = 2123798400;
        $cookieSet = isset($_COOKIE['use-dev']);

        if (!$inDevServer) {
            return false;
        }

        if ($isUseDevInQuery) {
            $isDebug = true;

            if ($qs['use-dev'] === 'no') {
                $cookieTime = time() - 3600;
                $isDebug = false;
            }

            setcookie(
                'use-dev',
                '1',
                $cookieTime,
                '/',
                $devServerHost,
                true,
                true
            );
        } else {
            $isDebug = $cookieSet;
        }

        return $isDebug;
    }

    public function integrity($file = 'null')
    {
        $raw = @file_get_contents(CRAFT_BASE_PATH . $file);

        if (!$raw) {
            return 'Error while computing subresource integrity for ' . $file;
        }

        return 'sha256-' . base64_encode(hash('sha256', $raw, true));
    }
}
