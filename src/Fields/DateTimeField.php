<?php


namespace Oza75\LaravelHubble\Fields;


use Oza75\LaravelHubble\Resource;
use Illuminate\Config\Repository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Carbon;

class DateTimeField extends TextField
{
    /**
     * @var string format
     */
    protected $dateFormat = null;

    protected $locale;
    /**
     * @var bool
     */
    protected $useDiffForHumans = true;

    /**
     * DateTimeField constructor.
     * @param string $name
     * @param string $title
     * @param string $format
     * @param string|null $locale
     * @param bool $sortable
     */
    public function __construct(string $name, string $title, ?string $format = null, ?string $locale = null, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);

        $this->format($format);
        $this->locale = $locale ?? config('app.locale');

        $this->addAttribute('locale', $this->locale);
        $this->type('datetime');
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components['editing'] = 'edit-datetime-field';
        $this->components['creating'] = 'edit-datetime-field';
    }

    /**
     * @param Resource $resource
     */
    public function prepare(Resource $resource)
    {
        parent::prepare($resource);

        $this->registerDisplayResolvers();
    }


    protected function registerDisplayResolvers()
    {
        $callable = function ($value) {
            if (is_null($value)) return 'N/A';
            $carbon = Carbon::parse($value)->locale($this->locale);
            if ($this->useDiffForHumans) return $carbon->diffForHumans();
            else return $carbon->format($this->dateFormat);
        };

        $this->addDisplayResolver($callable, 'index');
        $this->addDisplayResolver($callable, 'details');
    }

    /**
     * @param string $format
     * @return DateTimeField
     */
    public function format(?string $format = null): DateTimeField
    {
        if ($format) {
            $this->useDiffForHumans = false;
            $this->addAttribute('format', $format);
        }

        $this->dateFormat = $format;
        return $this;
    }

    /**
     * @param Repository|Application|mixed|string $locale
     * @return DateTimeField
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;
        $this->addAttribute('locale', $locale);

        return $this;
    }

    public function diffForHumans()
    {
        $this->useDiffForHumans = true;
        return $this;
    }
}
