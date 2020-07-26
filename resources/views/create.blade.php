@extends('laravel-hubble::layouts.hubble')
@section('content')
    <hubble-create :resource='@json($resource)'></hubble-create>
@endsection()
