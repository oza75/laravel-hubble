<template>
    <div class="hubble-panel">
        <div class="panel-header">
            <h2 class="panel-title" v-if="panel.title">{{ panel.title }}</h2>
        </div>
        <div class="panel-body">
            <hubble-form v-if="['edit', 'create'].includes(page)" :resource="resource" :form-data="formData"
                         @input="input" :fields="Object.values(panel.fields)"></hubble-form>
        </div>
    </div>
</template>

<script>
import {PanelMixins} from "./components/fields/mixins";

export default {
    name: "hubble-panel",
    mixins: [PanelMixins]
}
</script>

<style scoped>

</style>
