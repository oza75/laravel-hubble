<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#01A3A4">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
{{--    @include("partials.js-php-vars")--}}
    @yield('js')
    <script src="https://npmcdn.com/flatpickr/dist/l10n/fr.js" defer></script>
    <script src="{{ asset('vendor/laravel-hubble/hubble.js') }}" defer></script>
    @yield('scripts')

<!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    {{--    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Sofia&display=swap"--}}
    {{--          rel="stylesheet">--}}

<!-- Styles -->
    <link href="{{ asset('vendor/laravel-hubble/hubble.css') }}" media="screen" rel="stylesheet">
    @yield('css')
</head>
<body>
<div id="hubble" class="admin-dashboard">
    @if(!(isset($hideSidebar) && $hideSidebar))
        @include("laravel-hubble::partials.sidebar")
    @endif
    <main class="admin-dashboard--content">
        @yield('content')
    </main>
</div>
@yield('body-scripts')
</body>
</html>
