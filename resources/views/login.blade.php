@extends('laravel-hubble::layouts.hubble', ['hideSidebar' => true])
@section('content')
    <div class="login--container">
        <form action="{{\Illuminate\Support\Facades\Route::has('login') ? route('login') : '/login'}}" method="post" class="login--form-card">
            @csrf
            <div class="login--form--group">
                <label for="email" class="login--input--group">
                    <svg viewBox="0 0 24 24" class="icon">
                        <path
                            d="M2.25 20.25A2.252 2.252 0 010 18V6a2.25 2.25 0 01.599-1.524A2.255 2.255 0 012.25 3.75h19.5a2.253 2.253 0 011.703.784c.351.404.547.927.547 1.466v12a2.252 2.252 0 01-2.25 2.25H2.25zM1.5 18c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V6.187l-5.616 3.873 3.125 2.889a.751.751 0 01-.509 1.301.75.75 0 01-.509-.199l-3.373-3.118-1.825 1.259a3.135 3.135 0 01-1.793.556 3.14 3.14 0 01-1.793-.556l-1.825-1.258-3.373 3.118a.754.754 0 01-1.06-.042.751.751 0 01.041-1.06l3.125-2.889L1.5 6.187V18zm9.559-7.043c.276.191.601.291.941.291.34 0 .665-.101.941-.291l8.276-5.707H2.783l8.276 5.707z"></path>
                    </svg>
                    <input type="email"  value="{{old('email')}}" name="email" id="email" placeholder="@lang('laravel-hubble::dashboard.email_placeholder')">
                </label>
                @error('email')
                <span class="error">{{$message}}</span>
                @enderror
            </div>
            <div class="login--form--group">
                <label for="password" class="login--input--group">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M12 14c-.552 0-1 .449-1 1 0 .365.207.672.5.846V18.5a.5.5 0 001 0v-2.654A.987.987 0 0013 15c0-.551-.448-1-1-1zm8.5-5H18V6c0-3.309-2.691-6-6-6S6 2.691 6 6v3H3.5a.5.5 0 00-.5.5v14a.5.5 0 00.5.5h17a.5.5 0 00.5-.5v-14a.5.5 0 00-.5-.5zM7 6c0-2.757 2.243-5 5-5s5 2.243 5 5v3H7V6zm13 17H4V10h16v13z"></path>
                    </svg>
                    <input type="password" name="password" id="password" placeholder="@lang('laravel-hubble::dashboard.password_placeholder')">
                </label>
            </div>
            <button type="submit" class="btn btn-normal btn-full btn-primary btn-radius">
                @lang('laravel-hubble::dashboard.login')
            </button>
        </form>
    </div>
@endsection()
