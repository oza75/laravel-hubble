<template>
    <div class="container dashboard--container dashboard--edit">
        <header class="header">
            <h2 class="title">Création - {{resource.title}}</h2>
        </header>
        <section class="content--list">
            <form method="post" :action="resource.urls.store.url">
                <input type="hidden" name="_token" :value="resource.token">
                <hubble-form :resource="resource" :form-data="formData" @input="input" type="creating"/>
                <div class="form--actions">
                    <button type="submit" class="btn btn-primary btn-normal btn-radius">Enregister</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>

    import HubbleForm from "./components/hubble-form";

    export default {
        name: "dashboard-create",
        data: () => ({
            formData: {},
            creating: false,
        }),
        components: {HubbleForm},
        props: {
            resource: {type: Object, required: true}
        },
        computed: {
            fields() {
                return Object.values(this.resource.fields)
            }
        },
        methods: {
            input(field, value) {
                this.$set(this.formData, field, value);
            }
        },
    }
</script>

<style scoped>

</style>
