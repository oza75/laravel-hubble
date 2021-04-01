<template>
    <div class="container dashboard--container dashboard--edit">
        <header class="header">
            <h2 class="title">{{resource.config.title}}</h2>
        </header>
        <section class="content--list">
            <form method="post" :action="resource.urls.store.url" enctype="multipart/form-data">
                <input type="hidden" name="_token" :value="resource.token">
                <hubble-form :item="item" :resource="resource" :fields="Object.values(resource.fields)" :form-data="formData" @input="input" type="creating"/>
                <div class="form--actions">
                    <button type="submit" class="btn btn-primary btn-normal btn-radius">{{$t('dashboard.save')}}</button>
                </div>
                <component :is="panel.component" page="create" :resource="resource" :form-data="formData" @input="input" :panel="panel" v-for="(panel, k) in resource.panels" :key="k"></component>
            </form>
        </section>
    </div>
</template>

<script>
    export default {
        name: "dashboard-create",
        data: () => ({
            formData: {},
            creating: false,
        }),
        components: {},
        props: {
            resource: {type: Object, required: true},
            item: {type: Object, default: () => ({})}
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
        created() {
            this.fields.forEach(field => {
                if (field.attributes.isFile) {
                    this.input(field.name + '_files', this.item[field.name])
                } else {
                    this.input(field.name, this.item[field.name])
                }
            })
        }
    }
</script>

<style scoped>

</style>
