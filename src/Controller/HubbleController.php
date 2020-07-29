<?php


namespace Oza75\LaravelHubble\Controller;


use Oza75\LaravelHubble\Contracts\Hubble;
use Oza75\LaravelHubble\Resources\DetailResource;
use Oza75\LaravelHubble\Resources\EditResource;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

class HubbleController
{

    public function home()
    {
        return view('laravel-hubble::home');
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @return Application|Factory|View
     */
    public function index(Hubble $dashboard, $name)
    {
        $resource = $dashboard->getResource($name)->toArray();

        return view('laravel-hubble::index', compact('resource'));
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @param $key
     * @return Application|Factory|View
     */
    public function edit(Hubble $dashboard, $name, $key)
    {
        $match = $dashboard->getResource($name);

        $item = new EditResource($match->findItem($key), $match);

        $resource = $match->toArray('editing');

        return view('laravel-hubble::edit', compact('resource', 'item'));
    }

    public function show(Hubble $dashboard, $name, $key)
    {
        $match = $dashboard->getResource($name);

        $item = new DetailResource($match->findItem($key), $match);

        $resource = $match->toArray('details');

        return view('laravel-hubble::details', compact('resource', 'item'));
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @return Application|Factory|View
     */
    public function create(Hubble $dashboard, $name)
    {
        $resource = $dashboard->getResource($name)->toArray('creating');

        return view('laravel-hubble::create', compact('resource'));
    }

    /**
     * @param Hubble $dashboard
     * @param Request $request
     * @param $name
     * @return Application|RedirectResponse|Redirector
     */
    public function store(Hubble $dashboard, Request $request, $name)
    {
        $resource = $dashboard->getResource($name);

        $url = $resource->createItem($request);

        return redirect($url);
    }

    /**
     * @param Hubble $dashboard
     * @param Request $request
     * @param $name
     * @param $key
     * @return Application|RedirectResponse|Redirector
     */
    public function update(Hubble $dashboard, Request $request, $name, $key)
    {
        $resource = $dashboard->getResource($name);

        $resource->updateItem($request, $key);

        return redirect()->route('hubble.show', ['name' => $resource->getName(), 'key' => $key]);
    }

    /***
     * @param Hubble $dashboard
     * @param $name
     * @param $key
     * @return RedirectResponse
     */
    public function destroy(Hubble $dashboard, $name, $key)
    {
        $resource = $dashboard->getResource($name);

        $resource->delete($key);

        return redirect()->route('hubble.index', ['name' => $resource->getName()]);
    }
}
