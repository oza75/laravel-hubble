# Laravel Hubble

[![Latest Version on Packagist](https://img.shields.io/packagist/v/oza75/laravel-hubble.svg?style=flat-square)](https://packagist.org/packages/oza75/laravel-hubble)
[![Build Status](https://img.shields.io/travis/oza75/laravel-hubble/master.svg?style=flat-square)](https://travis-ci.org/oza75/laravel-hubble)
[![Quality Score](https://img.shields.io/scrutinizer/g/oza75/laravel-hubble.svg?style=flat-square)](https://scrutinizer-ci.com/g/oza75/laravel-hubble)
[![Total Downloads](https://img.shields.io/packagist/dt/oza75/laravel-hubble.svg?style=flat-square)](https://packagist.org/packages/oza75/laravel-hubble)

Build a beautiful dashboard with laravel in no time.

## Requirements
- php : ^7.1
- Laravel : ^6.0

## Installation
You can install the package via composer:

```bash
composer require oza75/laravel-hubble
```
Make sure you already have `login` and `logout` routes. You can install [laravel-ui](https://github.com/laravel/ui) package in order to register those routes.

Publish public assets. **`(required)`**
```bash
php artisan vendor:publish --provider="Oza75\LaravelHubble\HubbleServiceProvider" --tag="public"
```
or publish all assets, views, config ... if you want more customization
```bash
php artisan vendor:publish --provider="Oza75\LaravelHubble\HubbleServiceProvider"
```

now go to : yourapp.tld/hubble (or localhost:8000/hubble if you use `artisan serve`)
## Usage

``` php
// Usage description here
```

### Testing

``` bash
composer test
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email abouba181@gmail.com instead of using the issue tracker.

## Credits

- [Zié Aboubacar OUATTARA](https://github.com/oza75)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Laravel Package Boilerplate

This package was generated using the [Laravel Package Boilerplate](https://laravelpackageboilerplate.com).
