<?php


namespace Oza75\LaravelHubble\Commands\Concerns;


use Illuminate\Support\Facades\File;

trait HandlesStub
{
    protected function getPath(string $filename)
    {
        return __DIR__ . '/../../../stubs/' . $filename;
    }

    /**
     * @param string $path
     * @return string
     */
    protected function getContent(string $path)
    {
        return File::get($path);
    }

    /**
     * @param $content
     * @param $data
     * @return string|string[]
     */
    protected function parseContent($content, $data)
    {
        foreach ($data as $key => $datum) {
            $content = str_replace('%' . $key . '%', $datum, $content);
        }

        return $content;
    }

    /**
     * @param string $filename
     * @param array $data
     * @param string $outputPath
     * @return int
     */
    protected function createStubFile(string $filename, array $data, string $outputPath)
    {
        $content = $this->getContent($this->getPath($filename));

        $content = $this->parseContent($content, $data);

        if (File::exists($outputPath)) {
            return -1;
        }

        File::put($outputPath, $content);

        return 0;
    }
}
