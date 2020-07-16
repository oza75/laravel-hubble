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
Then install laravel-hubble
```bash
php artisan hubble:install
```
Now go to : http://yourapp.tld/hubble (or http://localhost:8000/hubble if you use `artisan serve`)

## Authentification
Hubble uses the default Laravel authorization gate to check if a user can access to the dashboard. 
By default, everyone can access to hubble dashboard. You are free to modify this gate in your `App\Providers\AppServiceProvider` boot method to restrict access.

```php 
 Gate::define('viewHubble', function (User $user) {
      return $user->isAdmin();
 });
```

## Usage

``` php
// Usage description here
```
### Filter
 - options
 
 An associative array of your filter's options where the key is the label 
 and the value, the value of the option. You can also return an url where the options
 should be fetched or a custom array. for those cases you may set the valueKey and the textKey
 using the setValueKey(string $key), and the setTextKey(string $key) in the constructor of this filter. 
 
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
