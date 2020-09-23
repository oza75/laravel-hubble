<?php


namespace Oza75\LaravelHubble\Fields;


use Oza75\LaravelHubble\HubbleResource;
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
    protected $useDiffForHumans = false;

    /**
     * DateTimeField constructor.
     * @param string $name
     * @param string|null $title
     * @param string|null $format
     * @param string|null $locale
     * @param bool $sortable
     */
    public function __construct(string $name, ?string $title = null, ?string $format = null, ?string $locale = null, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);

        $this->format($format);

        $this->locale = $locale ?? config('app.locale');

        $this->addProp('locale', $this->locale);
        $this->type('datetime');
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components['editing'] = 'edit-datetime-field';
        $this->components['creating'] = 'edit-datetime-field';
    }

    /**
     * @param HubbleResource $resource
     */
    public function boot(HubbleResource $resource)
    {
        parent::boot($resource);

        $this->registerDisplayResolvers();
    }


    protected function registerDisplayResolvers()
    {
        $callable = function ($value) {
            $carbon = Carbon::parse($value)->locale($this->locale);
            if (!is_null($this->dateFormat)) {
                return $carbon->format($this->dateFormat);
            } else if ($this->useDiffForHumans) {
                return $carbon->diffForHumans();
            } else if ($value) {
                return $carbon->toDateTimeString();
            } else {
                return $value;
            }
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
            $this->addProp('format', $format);
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
        $this->addProp('locale', $locale);

        return $this;
    }

    public function diffForHumans(bool $useDiffForHuman = true)
    {
        $this->useDiffForHumans = $useDiffForHuman;
        return $this;
    }
}
