<nav class="admin-dashboard--sidebar">
    <header class="sidebar--header">
{{--        <img src="{{asset('images/logo.webp')}}" class="logo" alt="Logo">--}}
        <div class="title">{{config('app.name')}}</div>
    </header>
    <section class="sidebar--body">
        <div class="sidebar--body-top">
            <ul class="sidebar--list sidebar--list--main">
                <li class="sidebar--list--item-wrapper">
                <span>
                    <a href="#" class="sidebar--list--item">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M14.254 22.924a.75.75 0 01-.75-.75v-6a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75v-8.25a.75.75 0 011.5 0v7.5h4.5v-5.25a2.252 2.252 0 012.25-2.25h1.5a2.252 2.252 0 012.25 2.25v5.25h4.5v-7.5a.75.75 0 011.5 0v8.25a.75.75 0 01-.75.75h-6zm-13.5-9.75a.752.752 0 01-.53-1.281l10.19-10.189a2.235 2.235 0 011.591-.658c.601 0 1.166.234 1.591.658l2.206 2.206a.751.751 0 01.702-.487h3.75a.75.75 0 01.75.75v4.939l2.78 2.78a.752.752 0 01-.53 1.281.743.743 0 01-.53-.22L12.535 2.766a.748.748 0 00-1.061 0L1.284 12.955a.746.746 0 01-.53.219zm18.75-5.56v-2.69h-2.25v.439l2.25 2.251z"></path></svg>
                        Voir le site
                    </a>
                </span>
                    <a href="#" class="sidebar--list--item--action" title="Ouvrir dans un autre onglet"
                       target="_blank">
                        <span class="action--wrapper">
                            <svg viewBox="0 0 24 24"><path
                                    d="M5.5 20c-.827 0-1.5-.673-1.5-1.5v-10C4 7.673 4.673 7 5.5 7h5a.5.5 0 010 1h-5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-4.97a.5.5 0 011 0v4.97c0 .827-.673 1.5-1.5 1.5h-10z"></path><path
                                    d="M7.5 17.014a.5.5 0 01-.354-.854L18.293 5.014H13.5a.5.5 0 010-1h6a.5.5 0 01.5.5v6a.5.5 0 01-1 0V5.721L7.854 16.867a.496.496 0 01-.354.147z"></path></svg></span>
                    </a>
                </li>
                <li class="sidebar--list--item-wrapper">
                <span>
                    <a href="#" class="sidebar--list--item">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M14.254 22.924a.75.75 0 01-.75-.75v-6a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75v-8.25a.75.75 0 011.5 0v7.5h4.5v-5.25a2.252 2.252 0 012.25-2.25h1.5a2.252 2.252 0 012.25 2.25v5.25h4.5v-7.5a.75.75 0 011.5 0v8.25a.75.75 0 01-.75.75h-6zm-13.5-9.75a.752.752 0 01-.53-1.281l10.19-10.189a2.235 2.235 0 011.591-.658c.601 0 1.166.234 1.591.658l2.206 2.206a.751.751 0 01.702-.487h3.75a.75.75 0 01.75.75v4.939l2.78 2.78a.752.752 0 01-.53 1.281.743.743 0 01-.53-.22L12.535 2.766a.748.748 0 00-1.061 0L1.284 12.955a.746.746 0 01-.53.219zm18.75-5.56v-2.69h-2.25v.439l2.25 2.251z"></path></svg>
                       Tableau de bord
                    </a>
                </span>
                </li>
            </ul>
            <ul class="sidebar--list sidebar--list--manage">
                <li class="sidebar--list--header">Gérer</li>
                @foreach(app(\Oza75\LaravelHubble\Contracts\Hubble::class)->sidebarLinks() as $link)
                    <li class="sidebar--list--item-wrapper">
                        <a href="{{$link['url']}}"
                           class="sidebar--list--item @if(request()->fullUrlIs($link['url'])) active @endif">
                            <img src="{!! $link['icon'] !!}" alt="">
                            {{$link['title']}}
                        </a>
                    </li>
                @endforeach
            </ul>
            <ul class="sidebar--list"></ul>
        </div>
        <div class="sidebar--body-bottom">
            <div class="user--settings popover" data-popover--classes="user--settings--popover">
                <div class="user--details ">
                    <img src="https://www.gravatar.com/avatar/{{md5(auth()->user()->email)}}" alt="">
                    <div class="content">
                        <div class="title">{{auth()->user()->name ?? 'Mon compte'}}</div>
                        <div class="email">{{auth()->user()->email}}</div>
                    </div>
                </div>
                <svg viewBox="0 0 48 48">
                    <path fill="#343f44"
                          d="M47.658 10.104a.999.999 0 00-1.411.095L24 35.624 1.753 10.2a1 1 0 00-1.506 1.316l23 26.285a.999.999 0 001.506-.001l23-26.285a1 1 0 00-.095-1.411z"></path>
                </svg>
                <ul class="popover--content">
                    <li>
{{--                        <a href="{{ route('admin.logout') }}"--}}
                        <a href="{{route('logout')}}"
                           onclick="event.preventDefault();document.getElementById('logout-form').submit();"
                           class="popover--item">
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M19.499 16.504a.752.752 0 01-.53-1.281l2.47-2.47H7.499a.75.75 0 010-1.5h13.939l-2.47-2.47c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53a.749.749 0 011.06 0l3.75 3.75a.791.791 0 01.094.114c.007.01.015.025.022.038a.716.716 0 01.045.087c.007.016.016.045.021.061a.728.728 0 01-.066.607.716.716 0 01-.116.153l-3.75 3.75a.737.737 0 01-.529.221z"></path>
                                <path
                                    d="M2.093 23.25C.885 23.189-.055 22.165 0 20.966L-.001 3C-.056 1.828.875.811 2.075.751L14.385.75c1.228.06 2.167 1.085 2.113 2.284l.001 4.466a.75.75 0 01-1.5 0V3c.018-.403-.275-.732-.652-.751L2.112 2.25c-.341.018-.631.346-.614.716L1.499 21c-.018.403.275.732.651.751l12.235-.001c.341-.018.632-.346.615-.716l-.001-4.534a.75.75 0 011.5 0V21c.054 1.173-.878 2.189-2.077 2.249l-12.31.001h-.019z"></path>
                            </svg>
                            Déconnexion
                        </a>
{{--                        <form id="logout-form" action="{{ route('admin.logout') }}" method="POST"--}}
                        <form id="logout-form" action="{{route('logout')}}" method="POST"
                              style="display: none;">
                            @csrf
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</nav>
