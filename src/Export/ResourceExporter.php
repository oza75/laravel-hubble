<?php


namespace Oza75\LaravelHubble\Export;


use Illuminate\Foundation\Bus\PendingDispatch;
use Illuminate\Http\Response;
use Maatwebsite\Excel\Exceptions\NoFilenameGivenException;
use Maatwebsite\Excel\Exceptions\NoFilePathGivenException;
use Oza75\LaravelHubble\HubbleResource;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface ResourceExporter
{
    /**
     * @param HubbleResource $resource
     * @return self
     */
    public function boot(HubbleResource $resource): ResourceExporter;

    /**
     * @param string|null $fileName
     * @param string|null $writerType
     * @param array|null $headers
     * @return Response|BinaryFileResponse
     * @throws NoFilenameGivenException
     */
    public function download(string $fileName = null, string $writerType = null, array $headers = null);

    /**
     * @param string|null $filePath
     * @param string|null $disk
     * @param string|null $writerType
     * @param array $diskOptions
     * @return bool|PendingDispatch
     * @throws NoFilePathGivenException
     */
    public function store(string $filePath = null, string $disk = null, string $writerType = null, $diskOptions = []);
}
