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

### Resources

A hubble resource is a simple php class which aims to represent the resource you want to add, namely the different fields, actions, filters, etc. that it has.

#### Create resource 
You can create a new resource by running `hubble:resource` command
``` php
php artisan hubble:resource UserResource
```
This will automatically create a new resource under `app/Hubble` folder

```php 
<?php

namespace App\Hubble;

use Illuminate\Database\Eloquent\Builder;
use Oza75\LaravelHubble\Action;
use Oza75\LaravelHubble\Field;
use Oza75\LaravelHubble\Filter;
use Oza75\LaravelHubble\Actions\DeleteAction;

use App\Hubble\Resource;

class UserResource extends Resource
{

    /**
     * @var string The title will be used as your resource name in the ui
     */
    protected $title = "Users";

    /**
     * @var string[]
     */
    protected $searchColumns = ['id'];

    /**
     * @var string used to show resource value in relationship
     */
    protected $displayColumn = 'id';

    /**
     * Get the fields displayed that the user resource
     *
     * @return Field[] array of fields
     */
    public function fields()
    {
        return [
            Field::make('id', 'ID'),
            Field::make('name', 'Name')
        ];
    }

    /**
     * Register all actions that the user resource have
     *
     * @return Action[] array of actions
     */
    public function actions()
    {
        return [
            DeleteAction::make(\App\User::query()),

        ];
    }

    /**
     * Register all filters that the user resource have
     *
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return [];
    }

    /**
     * @return Builder
     */
    public function baseQuery(): Builder
    {
        return \App\User::query();
    }

    /**
     * Return this resource icon
     *
     * @return string|null
     */
    public function icon()
    {
        return null;
    }
}
```
After your resource is generated, you need to set the `eloquent builder` hubble should use to get your data. When generating this resource we will try to obtain the eloquent builder according to the name of the resource passed in `php artisan hubble:resource` command.
You can modify this query builder to add some computed fields.
```php 
    /**
     * @return Builder
     */
    public function baseQuery(): Builder
    {
        return \App\User::query()->select('*')->selectRaw('age > 18 as is_adult');
    }
```

`fields` method is used to return all fields your want to display. By default, hubble comes with some fields like `TextField`, `TextareaField`, `ImageField` and more. But you can also create your own custom field.  
```php
    /**
     * Get the fields displayed that the user resource
     *
     * @return Field[] array of fields
     */
    public function fields()
    {
        return [
            Field::make('id', 'ID'),

            TextField::make('name', 'Name')->sortable(),

            TextareaField::make('bio', 'Bio')->onlyOnDetails(),

            TextField::make('email', 'Email')->displayOnIndexUsing(function ($value) {
                return "<a href='mailto:$value'>$value</a>";
            })->type('email')->sortable(),
        ];
    }
```
#### Registering your resource
By default, hubble will automatically register all resources you have under `app/Hubble` folder.

Just go to `http://yourapp.tld/hubble` and you will see the new user resource that we add.

You can customize the folder within hubble must look for your resources in config file. The auto registration is very useful when developing your dashboard
but you may disable it in production to gain a small performance.

In your AppServiceProvider :
```php
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       \Oza75\LaravelHubble\Facades\Hubble::disableAutoDiscovering(); // will disable auto registration of your resources.
        
        \Oza75\LaravelHubble\Facades\Hubble::addResources([
            UserResource::class,
            PostResource::class,
        ]); // to add manually your resources
    }
```  

### Actions

Action is used to perform custom tasks on one or more Eloquent models. You can generate action using :
```bash
php artisan hubble:action ActiveUsers
```
This command will generate a new `ActiveUsers` class under `app/Hubble/Actions`
```php
<?php

namespace App\Hubble\Actions;

use Oza75\LaravelHubble\Action;

class ActiveUsers extends Action
{
    /**
     * @var string the title of this action
     */
    protected $title = 'ActiveUsers';

    /**
     * @var string the confirmation message to warn user before running this action. Set to null to disable it
     */
    protected $confirmationMessage = 'Do you really want to perform this action ?';

    /**
     * Handle your action
     *
     * @param $ids
     * @return void
     */
    public function handle($ids)
    {
        // TODO: Implement handle() method.
    }
}
```
The `title` property contains the name of the action that will be shown on the User Interface

In the `handle` method you can perform your action. For our example, let's assume that our users table has an active column which determine whether the user is active or not. 
```php
    /**
     * Handle your action
     *
     * @param $ids
     * @return void
     */
    public function handle($ids)
    {
        User::query()->whereIn('id', $ids)->update(['active' => true]);
    }
```
When you created your action you can add it in your resource with the `actions` method.
```php 
    /**
     * Register all actions that the user resource have
     *
     * @return Action[] array of actions
     */
    public function actions()
    {
        return [
            DeleteAction::make(\App\User::query()),
            new ActiveUsers(),

        ];
    }
```

### Filters
As the name suggests, filters are used to filter your data and display only data that satisfy certain conditions.
There are many ways to add filter into your resource : 

- the first way (the easiest way ) :

```php
    /**
     * Register all filters that the user resource have
     *
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return [
            Filter::make('is_active', 'Only Active Users', ['Yes' => 1, 'No' => 0]),
        ];
    }
```
`Filter::make` take as is first argument, the column in the database. The second argument is the title and then the third array of options.
 
The options' argument is an associative array where the key is the label and the value, the value of the option. You can also pass an url where the options
 should be fetched or a custom array. for those cases you may set the valueKey and the textKey
 using the `setValueKey(string $key)`, and the `setTextKey(string $key)`. 
 
 For example:
 ```php
    /**
     * Register all filters that the user resource have
     *
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return [
            Filter::make('is_active', 'Users Status', [ 
                ['name' => 'All', 'value' => null], 
                ['name' => 'Active', 'value' => 1], 
                ['name' => 'Non active', 'value' => 0]
            ])->setValueKey('value')->setTextKey('name'),
        ];
    }
```
Another example:
```php
    /**
     * Register all filters that the user resource have
     *
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return [
            Filter::make('state', 'Users State', "https://restcountries.eu/rest/v2/all")
                ->setValueKey('alpha3Code')
                ->setTextKey('name')
                ->searchable('Start typing a state...'),
        ];
    }
```
- the second way to define a filter (more powerful) :

```php
    /**
     * Register all filters that the user resource have
     *
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return [
            Filter::make('state', 'Users State', "https://restcountries.eu/rest/v2/all")
                ->setValueKey('alpha3Code')
                ->setTextKey('name')
                ->setHandler(function (Builder $builder, $value) {
                    $builder->whereHas('state', function ($query) use ($value) {
                        $query->where('code', $value);
                    });
                }),
        ];
    }
```
With this way, you can use the `setHandler` method to pass a callable that takes the `query builder` as his first argument and the value of the filter, you can add any `where clause` you want. 

- The last way is to generate a new filter class.
```bash
php artisan hubble:filter MyCustomFilter
```
This command will generate a new filter class under `app/Hubble/Filters`.
```php
<?php

namespace App\Hubble\Filters;

use Illuminate\Database\Eloquent\Builder;
use Oza75\LaravelHubble\Filter;

class MyCustomFilter extends Filter
{
    /**
     * @var string the title of your filter that will be shown on the ui.
     */
    protected $title = 'My custom filter';

    /**
     * @var string the VueJs component that will be used to display this filter
     */
    protected $component = 'hubble-checkbox-filter';

    /**
     * Apply your filter
     *
     * @param Builder $query
     * @param $value
     * @return void
     */
    public function handle(Builder $query, $value)
    {
        // apply your filter here. 
        return null;
    }

    /**
     * Return all options for this filter
     *
     * @return array
     */
    public function options()
    {
        // first way
        return ['Option 1' => 1, 'Option 2' => 2]; // the key is the label and the value is the option value
        // second way
        return [
                    ['name' => 'Option 1', 'value' => 1],
                    ['name' => 'Option 2', 'value' => 2],
               ]; 
        // third way
        return "https://restcountries.eu/rest/v2/all";
        
        // do not forget to use `setValueKey(string $key)` and `setTextKey(string $key)` in the constructor of this class
        // or when instantiating this class to set the value key and the text key

    }
}

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
