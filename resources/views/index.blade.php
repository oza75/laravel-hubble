@extends('layouts.hubble')
@section('content')
    <hubble-index :resource='@json($resource)'></hubble-index>
@endsection
