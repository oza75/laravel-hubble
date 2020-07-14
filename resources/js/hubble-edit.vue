<template>
    <div class="container dashboard--container dashboard--edit">
        <header class="header">
            <h2 class="title">Modification - {{resource.title}}</h2>
        </header>
        <section class="content--list">
            <form :action="item['@urls']['update']['url']" method="post">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="_token" :value="resource.token">
                <hubble-form :resource="resource" :form-data="formData" @input="input" type="editing"/>
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
        name: "dashboard-edit",
        data: () => ({
            formData: {}
        }),
        components: {HubbleForm},
        props: {
            resource: {type: Object, required: true},
            item: {type: Object, required: true}
        },
        computed: {
            fields() {
                return Object.values(this.resource.fields)
            }
        },
        methods: {
            input(field, value) {
                this.$set(this.formData, field, value)
            }
        },
        created() {
            this.fields.forEach(field => {
                this.input(field.name, this.item[field.name])
            })
        }
    }
</script>

<style scoped>

</style>
