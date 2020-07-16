@extends('laravel-hubble::layouts.hubble')
@section('content')
    <hubble-index :resource='@json($resource)'></hubble-index>
@endsection
