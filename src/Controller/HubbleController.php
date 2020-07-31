<?php


namespace Oza75\LaravelHubble\Controller;


use Exception;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;
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
    use HandlesAuthorization;

    public function home()
    {
        return view('laravel-hubble::home');
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @return Application|Factory|View
     * @throws Exception
     */
    public function index(Hubble $dashboard, $name)
    {
        $resource = $dashboard->getResource($name);

        $this->authorizes('index', get_class($resource->baseQuery()->getModel()));

        $resource = $resource->toArray();

        return view('laravel-hubble::index', compact('resource'));
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @param $key
     * @return Application|Factory|View
     * @throws Exception
     */
    public function edit(Hubble $dashboard, $name, $key)
    {
        $match = $dashboard->getResource($name);

        $founded = $match->findItem($key);

        $this->authorizes('edit', $founded);

        $match->setCurrentItem($founded);

        $item = new EditResource($founded, $match);

        $resource = $match->toArray('editing', $founded);

        return view('laravel-hubble::edit', compact('resource', 'item'));
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @param $key
     * @return Application|Factory|View
     * @throws Exception
     */
    public function show(Hubble $dashboard, $name, $key)
    {
        $match = $dashboard->getResource($name);

        $founded = $match->findItem($key);

        $this->authorizes('show', $founded);

        $match->setCurrentItem($founded);

        $item = new DetailResource($founded, $match);

        $resource = $match->toArray('details', $founded);

        return view('laravel-hubble::details', compact('resource', 'item'));
    }

    /**
     * @param Hubble $dashboard
     * @param $name
     * @return Application|Factory|View
     * @throws Exception
     */
    public function create(Hubble $dashboard, $name)
    {
        $resource = $dashboard->getResource($name);

        $this->authorizes('create', $resource->baseQuery()->getModel());

        $resource = $resource->toArray('creating');

        return view('laravel-hubble::create', compact('resource'));
    }

    /**
     * @param Hubble $dashboard
     * @param Request $request
     * @param $name
     * @return Application|RedirectResponse|Redirector
     * @throws Exception
     */
    public function store(Hubble $dashboard, Request $request, $name)
    {
        $resource = $dashboard->getResource($name);

        $this->authorizes('create', $resource->baseQuery()->getModel());

        $url = $resource->createItem($request);

        return redirect($url);
    }

    /**
     * @param Hubble $dashboard
     * @param Request $request
     * @param $name
     * @param $key
     * @return Application|RedirectResponse|Redirector
     * @throws Exception
     */
    public function update(Hubble $dashboard, Request $request, $name, $key)
    {
        $resource = $dashboard->getResource($name);

        $item = $resource->findItem($key);

        $resource->setCurrentItem($item);

        $this->authorizes('update', $item);

        $resource->updateItem($item, $request);

        return redirect()->route('hubble.show', ['name' => $resource->getName(), 'key' => $key]);
    }

    /***
     * @param Hubble $dashboard
     * @param $name
     * @param $key
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Hubble $dashboard, $name, $key)
    {
        $resource = $dashboard->getResource($name);

        $item = $resource->findItem($key);

        $this->authorizes('delete', $item);

        $resource->setCurrentItem($item);

        $resource->delete($item);

        return redirect()->route('hubble.index', ['name' => $resource->getName()]);
    }
}
