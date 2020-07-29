<template>
    <div>
        <input :type="type" :value="value" :id="field.name"
               :class="{error: hasErrors}"
               :name="field.name" v-bind="{...$attrs, ...rulesAttrs}"
               @input="input($event.target.value)">

        <input-errors v-if="hasErrors" :errors="errors"/>
    </div>
</template>

<script>
    import {EditMixin} from "../mixins";
    import InputErrors from "../input-errors";

    export default {
        name: "edit-text-field",
        components: {InputErrors},
        mixins: [EditMixin],
    }
</script>

<style scoped>

</style>
