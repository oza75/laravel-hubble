@extends('laravel-hubble::layouts.hubble')
@section('content')
    <hubble-create :resource='@json($resource)' :item='@json($item)'></hubble-create>
@endsection()
