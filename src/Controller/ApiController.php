<?php


namespace Oza75\LaravelHubble\Controller;


use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;
use Oza75\LaravelHubble\Contracts\Hubble;
use Oza75\LaravelHubble\Export\ExcelExport;
use Oza75\LaravelHubble\Export\ResourceExporter;
use Oza75\LaravelHubble\Field;
use Oza75\LaravelHubble\HubbleResource;
use Oza75\LaravelHubble\Resources\DetailResource;
use Oza75\LaravelHubble\Resources\IndexResource;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiController
{
    use HandlesAuthorization;

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @return JsonResponse
     * @throws Exception
     */
    public function index(Hubble $hubble, Request $request, $name)
    {
        $resource = $hubble->getResource($name);

        $this->authorizes('index', get_class($resource->getModel()));

        $data = $resource->findItems($request);

        return $this->indexResponse($hubble, $resource, $data);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $key
     * @return DetailResource
     * @throws Exception
     */
    public function show(Hubble $hubble, Request $request, $name, $key)
    {
        $resource = $hubble->getResource($name);

        $item = $resource->findItem($key);

        $this->authorizes('show', $item);

        return new DetailResource($item, $resource);
    }

    /**
     * @param Hubble $hubble
     * @param $resource
     * @param $data
     * @return JsonResponse
     */
    private function indexResponse(Hubble $hubble, $resource, $data)
    {
        $items = $data->items();

        $mapper = $hubble->config('mappers.index', IndexResource::class);

        $collection = collect($items)->map(function ($item) use ($mapper, $resource) {
            return new $mapper($item, $resource);
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

        $notification = $resource->runAction($action, $request);

        return response()->json(['success' => true, 'notification' => $notification]);
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

        $item = $resource->findItem($key);

        $resource->delete($item);

        return response()->json([
            'success' => true,
            'notification' => [
                'message' => trans('laravel-hubble::dashboard.deleted'),
                'state' => 'success'
            ]
        ]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @return JsonResponse
     * @throws Exception
     */
    public function create(Hubble $hubble, Request $request, $name)
    {
        $resource = $hubble->getResource($name);

        $this->authorizes('create', get_class($resource->getModel()));

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

        return $this->indexResponse($hubble, $related, $data);
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

        return response([
            'success' => $data,
            'notification' => [
                'message' => trans('laravel-hubble::dashboard.detached'),
                'state' => 'success'
            ]
        ]);
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

        return response()->json(
            [
                'success' => $data,
                'notification' => [
                    'message' => trans('laravel-hubble::dashboard.attached'),
                    'state' => 'success'
                ]
            ]);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param string $name
     * @param string|int $key
     * @param Field $field
     * @param string $action
     * @return JsonResponse
     */
    public function relatedAction(Hubble $hubble, Request $request, $name, $key, $field, $action)
    {
        $resource = $hubble->getResource($name);

        $related = $resource->getRelatedFieldResource($field);

        $notification = $related->runAction($action, $request);

        return response()->json(['success' => true, 'notification' => $notification]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function validate(Request $request)
    {
        $value = $request->get('value') ?? $request->file('value') ?? [];
        $rules = $request->get('rules');

        Validator::make($value, $rules)->validate();
//        $request->validate($rules);

        return response()->json(['data' => 'passed']);
    }

    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @return JsonResponse
     * @throws Exception
     */
    public function export(Hubble $hubble, Request $request, $name)
    {
        /** @var HubbleResource $resource */
        $resource = $hubble->getResource($name);

        $this->authorizes('index', get_class($resource->getModel()));

        $filename = Str::snake($resource->getTitle()) . '_' . now()->format('Y_m_d_h_i_s') . '.xlsx';

        /** @var ResourceExporter $exporter */
        $exporter = app(ResourceExporter::class);
        $exporter->boot($resource)->store($filename, 'public');

        return response()->json([
            'file' => Storage::disk('public')->url($filename),
            'filename' => $filename
        ]);
    }


    /**
     * @param Hubble $hubble
     * @param Request $request
     * @param $name
     * @param $key
     * @param $field
     * @return JsonResponse
     * @throws Exception
     */
    public function relatedExport(Hubble $hubble, Request $request, $name, $key, $field): JsonResponse
    {
        $resource = $hubble->getResource($name);

        $related = $resource->getRelatedFieldResource($field);

        $this->authorizes('index', get_class($resource->getModel()));

        $filename = Str::snake($related->getTitle()) . '_' . $key . '_' . now()->format('Y_m_d_h_i_s') . '.xlsx';

        /** @var ResourceExporter $exporter */
        $exporter = app(ResourceExporter::class);
        $exporter->boot($related)->store($filename, 'public');

        return response()->json([
            'file' => Storage::disk('public')->url($filename),
            'filename' => $filename
        ]);
    }
}
