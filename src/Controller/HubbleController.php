<?php


namespace Oza75\LaravelHubble\Controller;


use Exception;
use Illuminate\Contracts\Support\Responsable;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;
use Oza75\LaravelHubble\Contracts\Hubble;
use Oza75\LaravelHubble\Resources\CreateResource;
use Oza75\LaravelHubble\Resources\DetailResource;
use Oza75\LaravelHubble\Resources\EditResource;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\Response;

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

        $this->authorizes('index', get_class($resource->getModel()));

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

        $mapper = $dashboard->config('mappers.edit', EditResource::class);
        $item = new $mapper($founded, $match);

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

        $mapper = $dashboard->config('mappers.detail', DetailResource::class);
        $item = new $mapper($founded, $match);

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

        $this->authorizes('create', $resource->getModel());

        $mapper = $dashboard->config('mappers.create', CreateResource::class);
        $item = new $mapper($resource->getModel(), $resource);

        $resource = $resource->toArray('creating');

        return view('laravel-hubble::create', compact('resource', 'item'));
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

        $this->authorizes('create', $resource->getModel());

        $response = $resource->createItem($request);

        return $this->isAResponse($response) ? $response : redirect(route('hubble.index', ['name' => $response->getName()]));
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
        $response = $resource->updateItem($item, $request);

        if ($this->isAResponse($response)) {
            return $response;
        }

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

        $response = $resource->delete($item);

        session()->flash('notification', ['message' => trans('laravel-hubble::dashboard.deleted'), 'state' => 'success']);

        return $this->isAResponse($response) ? $response : redirect()->route('hubble.index', ['name' => $resource->getName()]);
    }

    protected function isAResponse($value): bool
    {
        if (is_null($value)) return false;

        return $value instanceof Response ||
            $value instanceof \Illuminate\Http\Response ||
            $value instanceof Responsable;
    }

    public function showLoginForm()
    {
//        if (! Str::contains(session('url.intended'), HubbleFacade::prefix())) {
//            session('url.intended', route('hubble.home'));
//        }

        return view('laravel-hubble::login');
    }
}
