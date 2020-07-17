## Table of contents

- [\Oza75\LaravelHubble\HubbleResource (abstract)](#class-oza75laravelhubblehubbleresource-abstract)
- [\Oza75\LaravelHubble\HubbleServiceProvider](#class-oza75laravelhubblehubbleserviceprovider)
- [\Oza75\LaravelHubble\RelatedResource](#class-oza75laravelhubblerelatedresource)
- [\Oza75\LaravelHubble\Hubble](#class-oza75laravelhubblehubble)
- [\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)
- [\Oza75\LaravelHubble\Action (abstract)](#class-oza75laravelhubbleaction-abstract)
- [\Oza75\LaravelHubble\Filter](#class-oza75laravelhubblefilter)
- [\Oza75\LaravelHubble\Actions\DeleteActionOld](#class-oza75laravelhubbleactionsdeleteactionold)
- [\Oza75\LaravelHubble\Actions\DeleteAction](#class-oza75laravelhubbleactionsdeleteaction)
- [\Oza75\LaravelHubble\Commands\CreateActionCommand](#class-oza75laravelhubblecommandscreateactioncommand)
- [\Oza75\LaravelHubble\Commands\CreateResourceCommand](#class-oza75laravelhubblecommandscreateresourcecommand)
- [\Oza75\LaravelHubble\Commands\CreateFieldCommand](#class-oza75laravelhubblecommandscreatefieldcommand)
- [\Oza75\LaravelHubble\Commands\InstallationCommand](#class-oza75laravelhubblecommandsinstallationcommand)
- [\Oza75\LaravelHubble\Commands\CreateFilterCommand](#class-oza75laravelhubblecommandscreatefiltercommand)
- [\Oza75\LaravelHubble\Contracts\Hubble (interface)](#interface-oza75laravelhubblecontractshubble)
- [\Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship (interface)](#interface-oza75laravelhubblecontractsrelationshandlemanyrelationship)
- [\Oza75\LaravelHubble\Controller\ApiController](#class-oza75laravelhubblecontrollerapicontroller)
- [\Oza75\LaravelHubble\Controller\HubbleController](#class-oza75laravelhubblecontrollerhubblecontroller)
- [\Oza75\LaravelHubble\Facades\Hubble](#class-oza75laravelhubblefacadeshubble)
- [\Oza75\LaravelHubble\Fields\TextareaField](#class-oza75laravelhubblefieldstextareafield)
- [\Oza75\LaravelHubble\Fields\HasManyField](#class-oza75laravelhubblefieldshasmanyfield)
- [\Oza75\LaravelHubble\Fields\ColorPicker](#class-oza75laravelhubblefieldscolorpicker)
- [\Oza75\LaravelHubble\Fields\NumberField](#class-oza75laravelhubblefieldsnumberfield)
- [\Oza75\LaravelHubble\Fields\DateTimeField](#class-oza75laravelhubblefieldsdatetimefield)
- [\Oza75\LaravelHubble\Fields\TextField](#class-oza75laravelhubblefieldstextfield)
- [\Oza75\LaravelHubble\Fields\SelectField](#class-oza75laravelhubblefieldsselectfield)
- [\Oza75\LaravelHubble\Fields\BelongsToField](#class-oza75laravelhubblefieldsbelongstofield)
- [\Oza75\LaravelHubble\Fields\BooleanField](#class-oza75laravelhubblefieldsbooleanfield)
- [\Oza75\LaravelHubble\Middleware\HubbleAuthMiddleware](#class-oza75laravelhubblemiddlewarehubbleauthmiddleware)
- [\Oza75\LaravelHubble\Resources\IndexResource](#class-oza75laravelhubbleresourcesindexresource)
- [\Oza75\LaravelHubble\Resources\DetailResource](#class-oza75laravelhubbleresourcesdetailresource)
- [\Oza75\LaravelHubble\Resources\DefaultResource](#class-oza75laravelhubbleresourcesdefaultresource)
- [\Oza75\LaravelHubble\Resources\EditResource](#class-oza75laravelhubbleresourceseditresource)

<hr />

### Class: \Oza75\LaravelHubble\HubbleResource (abstract)

| Visibility | Function |
|:-----------|:---------|
| public | <strong>abstract actions()</strong> : <em>Action[] array of actions</em> |
| public | <strong>abstract baseQuery()</strong> : <em>\Illuminate\Database\Eloquent\Builder</em> |
| public | <strong>boot()</strong> : <em>void</em> |
| public | <strong>create(</strong><em>array</em> <strong>$data</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>mixed</em> |
| public | <strong>createItem(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>string</em> |
| public | <strong>created(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>creating(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>delete(</strong><em>mixed</em> <strong>$id</strong>)</strong> : <em>mixed</em> |
| public | <strong>deleted(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>deleting(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>abstract fields()</strong> : <em>Field[] array of fields</em> |
| public | <strong>abstract filters()</strong> : <em>Filter[] array of filters</em> |
| public | <strong>findItem(</strong><em>mixed</em> <strong>$id</strong>)</strong> : <em>mixed</em> |
| public | <strong>findItems(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>\Oza75\LaravelHubble\LengthAwarePaginator</em> |
| public | <strong>getDisplayColumn()</strong> : <em>string</em> |
| public | <strong>getKey()</strong> : <em>string</em> |
| public | <strong>getLoadedFields()</strong> : <em>mixed</em> |
| public | <strong>getName()</strong> : <em>null</em> |
| public | <strong>getPerPage()</strong> : <em>int</em> |
| public | <strong>getRelatedFieldOptions(</strong><em>mixed</em> <strong>$field</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>mixed</em> |
| public | <strong>getRelatedFieldResource(</strong><em>mixed</em> <strong>$name</strong>)</strong> : <em>mixed</em> |
| public | <strong>getSearchColumns()</strong> : <em>array</em> |
| public | <strong>getTitle()</strong> : <em>null</em> |
| public | <strong>getVisibleFields(</strong><em>\string</em> <strong>$section</strong>)</strong> : <em>array</em> |
| public | <strong>registerEvent(</strong><em>\string</em> <strong>$name</strong>, <em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>resolveItemUrls(</strong><em>mixed</em> <strong>$resource</strong>)</strong> : <em>array</em> |
| public | <strong>retrieveFormData(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>\string</em> <strong>$section</strong>)</strong> : <em>array</em> |
| public | <strong>runAction(</strong><em>\string</em> <strong>$name</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>void</em> |
| public | <strong>searchable()</strong> : <em>bool</em> |
| public | <strong>setPerPage(</strong><em>\int</em> <strong>$perPage</strong>)</strong> : <em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> |
| public | <strong>toArray(</strong><em>\string</em> <strong>$section=`'index'`</strong>)</strong> : <em>array</em> |
| public | <strong>update(</strong><em>mixed</em> <strong>$id</strong>, <em>array</em> <strong>$data</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>mixed</em> |
| public | <strong>updateItem(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$id</strong>)</strong> : <em>mixed</em> |
| public | <strong>updated(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>updating(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| protected | <strong>applyDefaultSort(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$query</strong>, <em>mixed</em> <strong>$fields</strong>)</strong> : <em>void</em> |
| protected | <strong>applyFilters(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$query</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>void</em> |
| protected | <strong>applySearch(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$query</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>void</em> |
| protected | <strong>applySorts(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$query</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>void/null</em> |
| protected | <strong>creatingToArray()</strong> : <em>array</em> |
| protected | <strong>editingToArray()</strong> : <em>array</em> |
| protected | <strong>fireEvent(</strong><em>\string</em> <strong>$name</strong>, <em>mixed</em> <strong>$arguments</strong>)</strong> : <em>void</em> |
| protected | <strong>getRelatedResources()</strong> : <em>\Illuminate\Support\Collection</em> |
| protected | <strong>indexingToArray()</strong> : <em>array</em> |
| protected | <strong>urls()</strong> : <em>array</em> |

<hr />

### Class: \Oza75\LaravelHubble\HubbleServiceProvider

| Visibility | Function |
|:-----------|:---------|
| public | <strong>boot()</strong> : <em>void</em><br /><em>Bootstrap the application services.</em> |
| public | <strong>register()</strong> : <em>void</em><br /><em>Register the application services.</em> |

*This class extends \Illuminate\Support\ServiceProvider*

<hr />

### Class: \Oza75\LaravelHubble\RelatedResource

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$related</strong>, <em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$parent</strong>, <em>\Illuminate\Database\Eloquent\Model</em> <strong>$parentModel</strong>, <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)</em> <strong>$field</strong>, <em>mixed</em> <strong>$relationship</strong>)</strong> : <em>void</em><br /><em>RelatedResource constructor.</em> |
| public | <strong>actions()</strong> : <em>Action[] array of actions</em> |
| public | <strong>attach(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>bool</em> |
| public | <strong>baseQuery()</strong> : <em>\Illuminate\Database\Eloquent\Builder</em> |
| public | <strong>detach(</strong><em>mixed</em> <strong>$id</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>mixed/bool</em> |
| public | <strong>fields()</strong> : <em>Field[] array of fields</em> |
| public | <strong>filters()</strong> : <em>Filter[] array of filters</em> |
| public | <strong>resolveItemUrls(</strong><em>mixed</em> <strong>$resource</strong>)</strong> : <em>array</em> |
| public | <strong>toArray(</strong><em>\string</em> <strong>$section=`'index'`</strong>)</strong> : <em>void</em> |
| protected | <strong>urls()</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)*

<hr />

### Class: \Oza75\LaravelHubble\Hubble

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>array/array/null/array</em> <strong>$resources=array()</strong>)</strong> : <em>void</em><br /><em>Hubble constructor.</em> |
| public | <strong>addResource(</strong><em>\string</em> <strong>$resource</strong>)</strong> : <em>[\Oza75\LaravelHubble\Hubble](#class-oza75laravelhubblehubble)</em><br /><em>Add manually a new resource to Hubble</em> |
| public | <strong>addResources(</strong><em>array</em> <strong>$resources</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>autoRegisterResources()</strong> : <em>bool/mixed</em><br /><em>Register all resources defined in the resource namespace and boot them</em> |
| public | <strong>disableAutoDiscovering()</strong> : <em>mixed</em> |
| public | <strong>getBooted()</strong> : <em>array</em> |
| public | <strong>getResource(</strong><em>\string</em> <strong>$name</strong>)</strong> : <em>mixed</em> |
| public | <strong>getResourceByName(</strong><em>\string</em> <strong>$name</strong>)</strong> : <em>mixed/null</em> |
| public | <strong>getResources()</strong> : <em>array/null</em> |
| public | <strong>getResourcesFolder()</strong> : <em>string</em> |
| public | <strong>getResourcesNamespace()</strong> : <em>mixed</em> |
| public | <strong>namespace(</strong><em>\string</em> <strong>$namespace=null</strong>)</strong> : <em>string</em> |
| public | <strong>prefix()</strong> : <em>string</em> |
| public | <strong>setResources(</strong><em>array</em> <strong>$resources</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em><br /><em>Set hubble resources</em> |
| public | <strong>setResourcesFolder(</strong><em>\string</em> <strong>$path</strong>, <em>\string</em> <strong>$namespace</strong>)</strong> : <em>mixed</em> |
| public | <strong>sidebarLinks()</strong> : <em>mixed</em> |

*This class implements [\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)*

<hr />

### Class: \Oza75\LaravelHubble\Field

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>Field constructor.</em> |
| public | <strong>addAttribute(</strong><em>\string</em> <strong>$name</strong>, <em>mixed</em> <strong>$value</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>default(</strong><em>mixed</em> <strong>$value</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>displayOnDetailsUsing(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>displayOnFormsUsing(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>displayOnIndexUsing(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>displayUsing(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>displayWhenCreatingUsing(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>displayWhenEditingUsing(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>getAttribute(</strong><em>\string</em> <strong>$name</strong>, <em>mixed</em> <strong>$default=null</strong>)</strong> : <em>mixed</em> |
| public | <strong>getDefaultSortType()</strong> : <em>string</em> |
| public | <strong>getName()</strong> : <em>string</em> |
| public | <strong>getTitle()</strong> : <em>string</em> |
| public | <strong>hide()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>hideOnDetails()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>hideOnForms()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>hideOnIndex()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>hideWhenCreating()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>hideWhenEditing()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>isSortable()</strong> : <em>bool</em> |
| public | <strong>isUsedAsDefaultSort()</strong> : <em>bool</em> |
| public | <strong>isVisibleOn(</strong><em>\string</em> <strong>$section</strong>)</strong> : <em>bool</em> |
| public static | <strong>make(</strong><em>array</em> <strong>$arguments</strong>)</strong> : <em>\Oza75\LaravelHubble\static</em> |
| public | <strong>onlyOnCreating()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>onlyOnDetails()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>onlyOnEditing()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>onlyOnForms()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>onlyOnIndex()</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>placeholder(</strong><em>\string</em> <strong>$value</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)</em> |
| public | <strong>prepare(</strong><em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$resource</strong>)</strong> : <em>void</em> |
| public | <strong>resolveData(</strong><em>mixed</em> <strong>$value</strong>, <em>mixed</em> <strong>$resource</strong>, <em>\string</em> <strong>$type</strong>)</strong> : <em>void</em> |
| public | <strong>retrieveFormData(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>\string</em> <strong>$section</strong>)</strong> : <em>mixed</em> |
| public | <strong>setName(</strong><em>\string</em> <strong>$name</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)</em> |
| public | <strong>setTitle(</strong><em>\string</em> <strong>$title</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)</em> |
| public | <strong>sortable(</strong><em>\bool</em> <strong>$default=false</strong>, <em>\string</em> <strong>$defaultType=`'asc'`</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)</em> |
| public | <strong>toArray(</strong><em>\string</em> <strong>$section=`'index'`</strong>)</strong> : <em>array[]</em> |
| protected | <strong>addDisplayResolver(</strong><em>\callable</em> <strong>$callable</strong>, <em>\string</em> <strong>$type</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| protected | <strong>registerComponents()</strong> : <em>void</em> |

<hr />

### Class: \Oza75\LaravelHubble\Action (abstract)

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name=null</strong>, <em>\string</em> <strong>$title=null</strong>, <em>\string</em> <strong>$confirmationMessage=null</strong>)</strong> : <em>void</em><br /><em>Action constructor.</em> |
| public | <strong>afterRunning(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>[\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)</em> |
| public | <strong>beforeRunning(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>[\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)</em> |
| public | <strong>getName()</strong> : <em>string</em> |
| public | <strong>getTitle()</strong> : <em>string</em> |
| public | <strong>abstract handle(</strong><em>mixed</em> <strong>$ids</strong>)</strong> : <em>void</em> |
| public static | <strong>make(</strong><em>array</em> <strong>$arguments</strong>)</strong> : <em>\Oza75\LaravelHubble\self</em> |
| public | <strong>run(</strong><em>mixed</em> <strong>$items</strong>)</strong> : <em>void</em> |
| public | <strong>setConfirmationMessage(</strong><em>string/null/\string</em> <strong>$confirmationMessage</strong>)</strong> : <em>[\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)</em> |
| public | <strong>setName(</strong><em>\string</em> <strong>$name</strong>)</strong> : <em>[\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)</em> |
| public | <strong>setTitle(</strong><em>\string</em> <strong>$title</strong>)</strong> : <em>[\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)</em> |
| public | <strong>toArray()</strong> : <em>void</em> |
| protected | <strong>runHook(</strong><em>mixed</em> <strong>$items</strong>, <em>\string</em> <strong>$type</strong>)</strong> : <em>void</em> |

<hr />

### Class: \Oza75\LaravelHubble\Filter

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$column=null</strong>, <em>\string</em> <strong>$title=null</strong>, <em>array</em> <strong>$options=array()</strong>)</strong> : <em>void</em><br /><em>Filter constructor.</em> |
| public | <strong>addAttribute(</strong><em>\string</em> <strong>$name</strong>, <em>mixed</em> <strong>$value</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>getColumn()</strong> : <em>string</em> |
| public | <strong>getName()</strong> : <em>string</em> |
| public | <strong>getTitle()</strong> : <em>string</em> |
| public | <strong>handle(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$query</strong>, <em>mixed</em> <strong>$value</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public static | <strong>make(</strong><em>array</em> <strong>$arguments</strong>)</strong> : <em>\Oza75\LaravelHubble\static</em> |
| public | <strong>multiple()</strong> : <em>[\Oza75\LaravelHubble\Filter](#class-oza75laravelhubblefilter)</em> |
| public | <strong>searchable(</strong><em>\string</em> <strong>$placeholder=null</strong>)</strong> : <em>[\Oza75\LaravelHubble\Filter](#class-oza75laravelhubblefilter)</em> |
| public | <strong>setColumn(</strong><em>\string</em> <strong>$column</strong>)</strong> : <em>[\Oza75\LaravelHubble\Filter](#class-oza75laravelhubblefilter)</em> |
| public | <strong>setHandler(</strong><em>\callable</em> <strong>$callable</strong>)</strong> : <em>[\Oza75\LaravelHubble\Filter](#class-oza75laravelhubblefilter)</em> |
| public | <strong>setTextKey(</strong><em>\string</em> <strong>$key</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>setTitle(</strong><em>\string</em> <strong>$title</strong>)</strong> : <em>[\Oza75\LaravelHubble\Filter](#class-oza75laravelhubblefilter)</em> |
| public | <strong>setValueKey(</strong><em>\string</em> <strong>$key</strong>)</strong> : <em>\Oza75\LaravelHubble\$this</em> |
| public | <strong>toArray()</strong> : <em>array</em> |
| protected | <strong>getOptions()</strong> : <em>array/string</em> |

<hr />

### Class: \Oza75\LaravelHubble\Actions\DeleteActionOld

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\string</em> <strong>$confirmationMessage=null</strong>)</strong> : <em>void</em> |
| public | <strong>handle(</strong><em>mixed</em> <strong>$items</strong>)</strong> : <em>mixed</em> |
| public | <strong>setQuery(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$query</strong>)</strong> : <em>[\Oza75\LaravelHubble\Actions\DeleteActionOld](#class-oza75laravelhubbleactionsdeleteactionold)</em> |

*This class extends [\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)*

<hr />

### Class: \Oza75\LaravelHubble\Actions\DeleteAction

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\Illuminate\Database\Eloquent\Builder</em> <strong>$builder</strong>, <em>\string</em> <strong>$name=null</strong>, <em>\string</em> <strong>$title=null</strong>, <em>\string</em> <strong>$confirmationMessage=null</strong>)</strong> : <em>void</em><br /><em>DeleteAction constructor.</em> |
| public | <strong>handle(</strong><em>mixed</em> <strong>$ids</strong>)</strong> : <em>mixed</em><br /><em>Handle your action</em> |

*This class extends [\Oza75\LaravelHubble\Action](#class-oza75laravelhubbleaction-abstract)*

<hr />

### Class: \Oza75\LaravelHubble\Commands\CreateActionCommand

| Visibility | Function |
|:-----------|:---------|
| public | <strong>handle()</strong> : <em>void</em> |
| protected | <strong>createStubFile(</strong><em>\string</em> <strong>$filename</strong>, <em>array</em> <strong>$data</strong>, <em>\string</em> <strong>$outputPath</strong>)</strong> : <em>int</em> |
| protected | <strong>getContent(</strong><em>\string</em> <strong>$path</strong>)</strong> : <em>string</em> |
| protected | <strong>getPath(</strong><em>\string</em> <strong>$filename</strong>)</strong> : <em>mixed</em> |
| protected | <strong>parseContent(</strong><em>mixed</em> <strong>$content</strong>, <em>mixed</em> <strong>$data</strong>)</strong> : <em>string/string[]</em> |

*This class extends \Illuminate\Console\Command*

<hr />

### Class: \Oza75\LaravelHubble\Commands\CreateResourceCommand

| Visibility | Function |
|:-----------|:---------|
| public | <strong>handle()</strong> : <em>void</em> |
| protected | <strong>createStubFile(</strong><em>\string</em> <strong>$filename</strong>, <em>array</em> <strong>$data</strong>, <em>\string</em> <strong>$outputPath</strong>)</strong> : <em>int</em> |
| protected | <strong>getContent(</strong><em>\string</em> <strong>$path</strong>)</strong> : <em>string</em> |
| protected | <strong>getPath(</strong><em>\string</em> <strong>$filename</strong>)</strong> : <em>mixed</em> |
| protected | <strong>parseContent(</strong><em>mixed</em> <strong>$content</strong>, <em>mixed</em> <strong>$data</strong>)</strong> : <em>string/string[]</em> |

*This class extends \Illuminate\Console\Command*

<hr />

### Class: \Oza75\LaravelHubble\Commands\CreateFieldCommand

| Visibility | Function |
|:-----------|:---------|
| public | <strong>handle()</strong> : <em>void</em> |
| protected | <strong>createStubFile(</strong><em>\string</em> <strong>$filename</strong>, <em>array</em> <strong>$data</strong>, <em>\string</em> <strong>$outputPath</strong>)</strong> : <em>int</em> |
| protected | <strong>getContent(</strong><em>\string</em> <strong>$path</strong>)</strong> : <em>string</em> |
| protected | <strong>getPath(</strong><em>\string</em> <strong>$filename</strong>)</strong> : <em>mixed</em> |
| protected | <strong>parseContent(</strong><em>mixed</em> <strong>$content</strong>, <em>mixed</em> <strong>$data</strong>)</strong> : <em>string/string[]</em> |

*This class extends \Illuminate\Console\Command*

<hr />

### Class: \Oza75\LaravelHubble\Commands\InstallationCommand

| Visibility | Function |
|:-----------|:---------|
| public | <strong>handle()</strong> : <em>void</em> |
| protected | <strong>createStubFile(</strong><em>\string</em> <strong>$filename</strong>, <em>array</em> <strong>$data</strong>, <em>\string</em> <strong>$outputPath</strong>)</strong> : <em>int</em> |
| protected | <strong>getContent(</strong><em>\string</em> <strong>$path</strong>)</strong> : <em>string</em> |
| protected | <strong>getPath(</strong><em>\string</em> <strong>$filename</strong>)</strong> : <em>mixed</em> |
| protected | <strong>parseContent(</strong><em>mixed</em> <strong>$content</strong>, <em>mixed</em> <strong>$data</strong>)</strong> : <em>string/string[]</em> |

*This class extends \Illuminate\Console\Command*

<hr />

### Class: \Oza75\LaravelHubble\Commands\CreateFilterCommand

| Visibility | Function |
|:-----------|:---------|
| public | <strong>handle()</strong> : <em>void</em> |
| protected | <strong>createStubFile(</strong><em>\string</em> <strong>$filename</strong>, <em>array</em> <strong>$data</strong>, <em>\string</em> <strong>$outputPath</strong>)</strong> : <em>int</em> |
| protected | <strong>getContent(</strong><em>\string</em> <strong>$path</strong>)</strong> : <em>string</em> |
| protected | <strong>getPath(</strong><em>\string</em> <strong>$filename</strong>)</strong> : <em>mixed</em> |
| protected | <strong>parseContent(</strong><em>mixed</em> <strong>$content</strong>, <em>mixed</em> <strong>$data</strong>)</strong> : <em>string/string[]</em> |

*This class extends \Illuminate\Console\Command*

<hr />

### Interface: \Oza75\LaravelHubble\Contracts\Hubble

| Visibility | Function |
|:-----------|:---------|
| public | <strong>autoRegisterResources()</strong> : <em>mixed</em> |
| public | <strong>disableAutoDiscovering()</strong> : <em>mixed</em> |
| public | <strong>getResource(</strong><em>\string</em> <strong>$name</strong>)</strong> : <em>mixed</em> |
| public | <strong>getResourceByName(</strong><em>\string</em> <strong>$name</strong>)</strong> : <em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)Resource/null</em> |
| public | <strong>getResourcesFolder()</strong> : <em>string</em> |
| public | <strong>namespace(</strong><em>\string</em> <strong>$namespace=null</strong>)</strong> : <em>string</em> |
| public | <strong>prefix()</strong> : <em>string</em> |
| public | <strong>setResourcesFolder(</strong><em>\string</em> <strong>$path</strong>, <em>\string</em> <strong>$namespace</strong>)</strong> : <em>mixed</em> |
| public | <strong>sidebarLinks()</strong> : <em>mixed</em> |

<hr />

### Interface: \Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship

| Visibility | Function |
|:-----------|:---------|
| public | <strong>getRelatedResource()</strong> : <em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> |

<hr />

### Class: \Oza75\LaravelHubble\Controller\ApiController

| Visibility | Function |
|:-----------|:---------|
| public | <strong>action(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$action</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |
| public | <strong>attachItem(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>, <em>mixed</em> <strong>$field</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |
| public | <strong>create(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |
| public | <strong>destroy(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |
| public | <strong>detachItem(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>, <em>mixed</em> <strong>$field</strong>, <em>mixed</em> <strong>$id</strong>)</strong> : <em>\Oza75\LaravelHubble\Controller\Application/\Oza75\LaravelHubble\Controller\ResponseFactory/\Oza75\LaravelHubble\Controller\Response</em> |
| public | <strong>fieldRelatedOptions(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>, <em>mixed</em> <strong>$field</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |
| public | <strong>index(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |
| public | <strong>relatedIndex(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$hubble</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>, <em>mixed</em> <strong>$field</strong>)</strong> : <em>\Illuminate\Http\JsonResponse</em> |

<hr />

### Class: \Oza75\LaravelHubble\Controller\HubbleController

| Visibility | Function |
|:-----------|:---------|
| public | <strong>create(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>mixed</em> <strong>$name</strong>)</strong> : <em>\Oza75\LaravelHubble\Controller\Application/\Oza75\LaravelHubble\Controller\Factory/\Oza75\LaravelHubble\Controller\View</em> |
| public | <strong>destroy(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>)</strong> : <em>void</em> |
| public | <strong>edit(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>)</strong> : <em>\Oza75\LaravelHubble\Controller\Application/\Oza75\LaravelHubble\Controller\Factory/\Oza75\LaravelHubble\Controller\View</em> |
| public | <strong>home()</strong> : <em>void</em> |
| public | <strong>index(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>mixed</em> <strong>$name</strong>)</strong> : <em>\Oza75\LaravelHubble\Controller\Application/\Oza75\LaravelHubble\Controller\Factory/\Oza75\LaravelHubble\Controller\View</em> |
| public | <strong>show(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>)</strong> : <em>void</em> |
| public | <strong>store(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>)</strong> : <em>\Oza75\LaravelHubble\Controller\Application/\Oza75\LaravelHubble\Controller\RedirectResponse/\Oza75\LaravelHubble\Controller\Redirector</em> |
| public | <strong>update(</strong><em>[\Oza75\LaravelHubble\Contracts\Hubble](#interface-oza75laravelhubblecontractshubble)</em> <strong>$dashboard</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>mixed</em> <strong>$name</strong>, <em>mixed</em> <strong>$key</strong>)</strong> : <em>\Oza75\LaravelHubble\Controller\Application/\Oza75\LaravelHubble\Controller\RedirectResponse/\Oza75\LaravelHubble\Controller\Redirector</em> |

<hr />

### Class: \Oza75\LaravelHubble\Facades\Hubble

| Visibility | Function |
|:-----------|:---------|
| protected static | <strong>getFacadeAccessor()</strong> : <em>string</em><br /><em>Get the registered name of the component.</em> |

*This class extends \Illuminate\Support\Facades\Facade*

<hr />

### Class: \Oza75\LaravelHubble\Fields\TextareaField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>TextareaField constructor.</em> |
| protected | <strong>registerComponents()</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\Fields\TextField](#class-oza75laravelhubblefieldstextfield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\HasManyField

> Class HasManyField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$methodName</strong>, <em>\string</em> <strong>$title</strong>, <em>\string</em> <strong>$related</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>HasManyField constructor.</em> |
| public | <strong>getPerPage()</strong> : <em>null</em> |
| public | <strong>getRelatedOptions(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>mixed</em> |
| public | <strong>getRelatedResource()</strong> : <em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> |
| public | <strong>onlyOnDetails()</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this/[\Oza75\LaravelHubble\Fields\HasManyField](#class-oza75laravelhubblefieldshasmanyfield)</em> |
| public | <strong>prepare(</strong><em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$resource</strong>)</strong> : <em>void</em> |
| public | <strong>retrieveFormData(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>\string</em> <strong>$section</strong>)</strong> : <em>mixed/null</em> |
| public | <strong>setPerPage(</strong><em>null</em> <strong>$perPage</strong>)</strong> : <em>[\Oza75\LaravelHubble\Fields\HasManyField](#class-oza75laravelhubblefieldshasmanyfield)</em> |
| public | <strong>toArray(</strong><em>\string</em> <strong>$section=`'index'`</strong>)</strong> : <em>array[]</em> |
| protected | <strong>getModel()</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\Model/null</em> |

*This class extends [\Oza75\LaravelHubble\Fields\SelectField](#class-oza75laravelhubblefieldsselectfield)*

*This class implements [\Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship](#interface-oza75laravelhubblecontractsrelationshandlemanyrelationship)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\ColorPicker

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em> |
| public | <strong>displayUsingHex()</strong> : <em>void</em> |
| protected | <strong>registerComponents()</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\Fields\TextField](#class-oza75laravelhubblefieldstextfield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\NumberField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>NumberField constructor.</em> |

*This class extends [\Oza75\LaravelHubble\Fields\TextField](#class-oza75laravelhubblefieldstextfield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\DateTimeField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\string</em> <strong>$format=null</strong>, <em>\string</em> <strong>$locale=null</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>DateTimeField constructor.</em> |
| public | <strong>diffForHumans()</strong> : <em>void</em> |
| public | <strong>format(</strong><em>\string</em> <strong>$format=null</strong>)</strong> : <em>[\Oza75\LaravelHubble\Fields\DateTimeField](#class-oza75laravelhubblefieldsdatetimefield)</em> |
| public | <strong>prepare(</strong><em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$resource</strong>)</strong> : <em>void</em> |
| public | <strong>setLocale(</strong><em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\Repository/[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\Application/mixed/string</em> <strong>$locale</strong>)</strong> : <em>[\Oza75\LaravelHubble\Fields\DateTimeField](#class-oza75laravelhubblefieldsdatetimefield)</em> |
| protected | <strong>registerComponents()</strong> : <em>void</em> |
| protected | <strong>registerDisplayResolvers()</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\Fields\TextField](#class-oza75laravelhubblefieldstextfield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\TextField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>limit(</strong><em>\int</em> <strong>$limit</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this</em> |
| public | <strong>type(</strong><em>\string</em> <strong>$type</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this</em> |

*This class extends [\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\SelectField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>array</em> <strong>$options=array()</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>SelectField constructor.</em> |
| public | <strong>displayUsingLabel()</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this</em> |
| public | <strong>options(</strong><em>mixed</em> <strong>$options</strong>)</strong> : <em>[\Oza75\LaravelHubble\Fields\SelectField](#class-oza75laravelhubblefieldsselectfield)</em> |
| public | <strong>setOptions(</strong><em>array</em> <strong>$options</strong>)</strong> : <em>[\Oza75\LaravelHubble\Fields\SelectField](#class-oza75laravelhubblefieldsselectfield)</em> |
| public | <strong>setTextKey(</strong><em>\string</em> <strong>$key</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this</em> |
| public | <strong>setValueKey(</strong><em>\string</em> <strong>$key</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this</em> |
| public | <strong>toArray(</strong><em>\string</em> <strong>$section=`'index'`</strong>)</strong> : <em>void</em> |
| protected | <strong>formatOptions()</strong> : <em>array/string</em> |
| protected | <strong>registerComponents()</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\BelongsToField

> Class BelongsToField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$methodName</strong>, <em>\string</em> <strong>$title</strong>, <em>\string</em> <strong>$related</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em><br /><em>BelongsToField constructor.</em> |
| public | <strong>prepare(</strong><em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$resource</strong>)</strong> : <em>void</em> |
| public | <strong>toArray(</strong><em>\string</em> <strong>$section=`'index'`</strong>)</strong> : <em>void</em> |
| protected | <strong>registerDisplayResolver(</strong><em>[\Oza75\LaravelHubble\HubbleResource](#class-oza75laravelhubblehubbleresource-abstract)</em> <strong>$resource</strong>)</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\Fields\SelectField](#class-oza75laravelhubblefieldsselectfield)*

<hr />

### Class: \Oza75\LaravelHubble\Fields\BooleanField

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>\string</em> <strong>$name</strong>, <em>\string</em> <strong>$title</strong>, <em>\bool</em> <strong>$sortable=false</strong>)</strong> : <em>void</em> |
| public | <strong>text(</strong><em>\string</em> <strong>$checked</strong>, <em>\string</em> <strong>$unchecked=`'No'`</strong>)</strong> : <em>[\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)s\$this</em> |
| protected | <strong>registerComponents()</strong> : <em>void</em> |

*This class extends [\Oza75\LaravelHubble\Field](#class-oza75laravelhubblefield)*

<hr />

### Class: \Oza75\LaravelHubble\Middleware\HubbleAuthMiddleware

| Visibility | Function |
|:-----------|:---------|
| public | <strong>handle(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>, <em>[\Closure](http://php.net/manual/en/class.closure.php)</em> <strong>$next</strong>, <em>mixed</em> <strong>$guards</strong>)</strong> : <em>mixed</em> |
| public | <strong>unauthenticated(</strong><em>array</em> <strong>$guards</strong>, <em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>void</em> |
| protected | <strong>redirectTo(</strong><em>\Illuminate\Http\Request</em> <strong>$request</strong>)</strong> : <em>string</em> |

<hr />

### Class: \Oza75\LaravelHubble\Resources\IndexResource

| Visibility | Function |
|:-----------|:---------|

*This class extends [\Oza75\LaravelHubble\Resources\DefaultResource](#class-oza75laravelhubbleresourcesdefaultresource)*

*This class implements \ArrayAccess, \JsonSerializable, \Illuminate\Contracts\Support\Responsable, \Illuminate\Contracts\Routing\UrlRoutable*

<hr />

### Class: \Oza75\LaravelHubble\Resources\DetailResource

| Visibility | Function |
|:-----------|:---------|

*This class extends [\Oza75\LaravelHubble\Resources\DefaultResource](#class-oza75laravelhubbleresourcesdefaultresource)*

*This class implements \ArrayAccess, \JsonSerializable, \Illuminate\Contracts\Support\Responsable, \Illuminate\Contracts\Routing\UrlRoutable*

<hr />

### Class: \Oza75\LaravelHubble\Resources\DefaultResource

| Visibility | Function |
|:-----------|:---------|
| public | <strong>__construct(</strong><em>mixed</em> <strong>$resource</strong>, <em>mixed</em> <strong>$presenter</strong>)</strong> : <em>void</em><br /><em>IndexResource constructor.</em> |
| public | <strong>toArray(</strong><em>mixed</em> <strong>$request</strong>)</strong> : <em>void</em> |
| protected | <strong>additionalItemManagementOptions()</strong> : <em>\Illuminate\Support\Collection</em> |
| protected | <strong>itemUrls()</strong> : <em>\Illuminate\Support\Collection</em> |

*This class extends \Illuminate\Http\Resources\Json\JsonResource*

*This class implements \Illuminate\Contracts\Routing\UrlRoutable, \Illuminate\Contracts\Support\Responsable, \JsonSerializable, \ArrayAccess*

<hr />

### Class: \Oza75\LaravelHubble\Resources\EditResource

| Visibility | Function |
|:-----------|:---------|

*This class extends [\Oza75\LaravelHubble\Resources\DefaultResource](#class-oza75laravelhubbleresourcesdefaultresource)*

*This class implements \ArrayAccess, \JsonSerializable, \Illuminate\Contracts\Support\Responsable, \Illuminate\Contracts\Routing\UrlRoutable*

