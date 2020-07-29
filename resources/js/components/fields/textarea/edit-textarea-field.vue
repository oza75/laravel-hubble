<template>
    <div>
        <textarea :value="value" :class="{error: hasErrors}" :id="field.name" rows="5" :name="field.name" v-bind="$attrs"
                  @input="$emit('input', $event.target.value)">
        </textarea>
        <input-errors :errors="errors"/>
    </div>
</template>

<script>
    import {EditMixin} from "../mixins";


    export default {
        name: "edit-textarea-field",
        mixins: [EditMixin],
        props: {}
    }
</script>

<style scoped>

</style>
