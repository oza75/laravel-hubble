<template>
    <div class="container dashboard--container dashboard--edit">
        <header class="header">
            <h2 class="title">{{$t('dashboard.create_title', {name: resource.title})}}</h2>
        </header>
        <section class="content--list">
            <form method="post" :action="resource.urls.store.url" enctype="multipart/form-data">
                <input type="hidden" name="_token" :value="resource.token">
                <hubble-form :item="item" :resource="resource" :form-data="formData" @input="input" type="creating"/>
                <div class="form--actions">
                    <button type="submit" class="btn btn-primary btn-normal btn-radius">{{$t('dashboard.save')}}</button>
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
