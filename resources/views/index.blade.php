@extends('laravel-hubble::layouts.hubble')
@section('head')
    <meta name="turbolinks-cache-control" content="no-preview">
@endsection
@section('content')
    <hubble-index :resource='@json($resource)'></hubble-index>
@endsection
