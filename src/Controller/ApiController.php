<?php


namespace Oza75\LaravelHubble\Controller;


use Oza75\LaravelHubble\Contracts\Hubble;
use Oza75\LaravelHubble\HubbleResource;
use Oza75\LaravelHubble\Resources\IndexResource;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiController
{
    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @return JsonResponse
     */
    public function index(Hubble $hubble, Request $request, $name)
    {
        $resource = $hubble->getResource($name);

        $data = $resource->findItems($request);

        return $this->indexResponse($resource, $data);
    }

    /**
     * @param $resource
     * @param $data
     * @return JsonResponse
     */
    private function indexResponse($resource, $data)
    {
        $items = $data->items();

        $collection = collect($items)->map(function ($item) use ($resource) {
            return new IndexResource($item, $resource);
        });

        return response()->json([
            'data' => $collection,
            'meta' => [
                'last_page' => $data->lastPage(),
                'total' => $data->total(),
                'per_page' => $data->perPage()
            ]
        ]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $action
     * @return JsonResponse
     */
    public function action(Hubble $hubble, Request $request, $name, $action)
    {
        $resource = $hubble->getResource($name);

        $resource->runAction($action, $request);

        return response()->json(['success' => true]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $key
     * @return JsonResponse
     */
    public function destroy(Hubble $hubble, Request $request, $name, $key)
    {
        $resource = $hubble->getResource($name);

        $resource->delete($key);

        return response()->json(['success' => true]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @return JsonResponse
     */
    public function create(Hubble $hubble, Request $request, $name)
    {
        $resource = $hubble->getResource($name);

        $url = $resource->createItem($request);

        return response()->json(['data' => ['url' => $url]]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $key
     * @param $name
     * @param $field
     * @return JsonResponse
     */
    public function fieldRelatedOptions(Hubble $hubble, Request $request, $name, $key, $field)
    {
        $resource = $hubble->getResource($name);

        $options = $resource->getRelatedFieldOptions($field, $request);

        return response()->json($options);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $key
     * @param $field
     * @return JsonResponse
     */
    public function relatedIndex(Hubble $hubble, Request $request, $name, $key, $field)
    {
        $resource = $hubble->getResource($name);

        $related = $resource->getRelatedFieldResource($field);

        $data = $related->findItems($request);

        return $this->indexResponse($related, $data);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $key
     * @param $field
     * @param $id
     * @return Application|ResponseFactory|Response
     */
    public function detachItem(Hubble $hubble, Request $request, $name, $key, $field, $id)
    {
        $resource = $hubble->getResource($name);

        $related = $resource->getRelatedFieldResource($field);

        $data = $related->detach($id, $request);

        return response(['success' => $data]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $key
     * @param $field
     * @return JsonResponse
     */
    public function attachItem(Hubble $hubble, Request $request, $name, $key, $field)
    {
        $resource = $hubble->getResource($name);

        $related = $resource->getRelatedFieldResource($field);

        $data = $related->attach($request);

        return response()->json(['success' => $data]);
    }
}
