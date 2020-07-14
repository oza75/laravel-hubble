@extends('layouts.hubble')
@section('content')
    <hubble-details :resource='@json($resource)' :item='@json($item)'></hubble-details>
@endsection()
