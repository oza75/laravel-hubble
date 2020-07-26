@extends('laravel-hubble::layouts.hubble')
@section('content')
    <hubble-edit :resource='@json($resource)' :item='@json($item)'></hubble-edit>
@endsection()
