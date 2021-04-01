<template>
    <div class="container dashboard--container dashboard--edit">
        <header class="header">
            <h2 class="title">{{resource.config.title}}</h2>
        </header>
        <section class="content--list">
            <form :action="item['@urls']['update']['url']" method="post" enctype="multipart/form-data">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="_token" :value="resource.token">
                <hubble-form :resource="resource" :fields="Object.values(resource.fields)" :item="item" :form-data="formData" @input="input" type="editing"/>
                <div class="form--actions">
                    <button type="submit" class="btn btn-primary btn-normal btn-radius">{{$t('dashboard.save')}}</button>
                </div>
                <component :is="panel.component" page="edit" :resource="resource"   :form-data="formData"  @input="input" :panel="panel" v-for="(panel, k) in resource.panels" :key="k"></component>
            </form>
        </section>
    </div>
</template>

<script>
    export default {
        name: "dashboard-edit",
        data: () => ({
            formData: {}
        }),
        components: {},
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
                if (field.props.isFile) {
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
