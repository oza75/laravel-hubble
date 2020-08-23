@extends('laravel-hubble::layouts.hubble')
@section('head')
{{--    <meta name="turbolinks-cache-control" content="no-cache">--}}
@endsection
@section('content')
    <hubble-details :resource='@json($resource)' :item='@json($item)'></hubble-details>
@endsection()
