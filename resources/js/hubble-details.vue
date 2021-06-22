<template>
    <div class="container dashboard--container dashboard--details">
        <header class="header">
            <h2 class="title">{{resource.config.title}}</h2>
            <div class="ctas">
                <div class="ctas--wrapper">
                    <a v-if="datum['@urls']['edit']" :href="datum['@urls']['edit']['url']"
                       class="btn btn-normal btn-primary btn-radius" :title="$t('dashboard.edit')">
                        <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.4001 3.33998L13.6601 0.59998C13.3024 0.264076 12.8338 0.0713388 12.3434 0.058432C11.8529 0.0455252 11.3748 0.213349 11.0001 0.52998L2.00005 9.52998C1.67682 9.85594 1.47556 10.2832 1.43005 10.74L1.00005 14.91C0.986582 15.0564 1.00559 15.2041 1.05571 15.3424C1.10584 15.4806 1.18585 15.6062 1.29005 15.71C1.38349 15.8027 1.49431 15.876 1.61615 15.9258C1.73798 15.9755 1.86845 16.0007 2.00005 16H2.09005L6.26005 15.62C6.71685 15.5745 7.14409 15.3732 7.47005 15.05L16.4701 6.04998C16.8194 5.68095 17.0082 5.18849 16.995 4.68052C16.9819 4.17254 16.768 3.69049 16.4001 3.33998V3.33998ZM6.08005 13.62L3.08005 13.9L3.35005 10.9L9.00005 5.31998L11.7001 8.01998L6.08005 13.62ZM13.0001 6.67998L10.3201 3.99998L12.2701 1.99998L15.0001 4.72998L13.0001 6.67998Z"/>
                        </svg>
                    </a>
                    <button v-if="datum['@urls']['delete']" @click.stop="openDeleteModal = true"
                            class="btn btn-radius btn-white btn-normal"
                            :title="$t('dashboard.delete')">
                        <svg width="19" height="20" viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.00293 18C2.00293 19.103 2.89993 20 4.00293 20H14.0029C15.1059 20 16.0029 19.103 16.0029 18V6H18.0029V4H14.0029V2C14.0029 0.897 13.1059 0 12.0029 0H6.00293C4.89993 0 4.00293 0.897 4.00293 2V4H0.00292969V6H2.00293V18ZM6.00293 2H12.0029V4H6.00293V2ZM5.00293 6H14.0029L14.0039 18H4.00293V6H5.00293Z"/>
                            <path d="M6.00293 8H8.00293V16H6.00293V8ZM10.0029 8H12.0029V16H10.0029V8Z"/>
                        </svg>
                    </button>
                    <button v-for="(action, k) in iconActions" :key="'icon-action-'+k"
                            @click.stop="runIconAction(action)"
                            class="btn btn-radius btn-white btn-normal"
                            :title="action.title">
                        <img :src="action.icon" :alt="action.title" v-show="runningAction !== action.name">
                        <inline-loader fill="#000" v-show="runningAction === action.name"/>
                    </button>
                    <div class="resources--actions--wrapper"
                         v-if="selectActions.length > 0">
                        <label class="resources--actions--wrapper">
                            <select name="action" id="action" @input="selectAction">
                                <option :value="null" selected> {{$t('dashboard.choose_an_action')}}</option>
                                <option :value="k" v-for="(action, k) in selectActions" :key="'action-'+k">
                                    {{action.title}}
                                </option>
                            </select>
                        </label>
                        <button @click="openAction" class="btn btn-coral btn-radius btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px"
                                 v-show="runningAction === false"
                                 height="24px">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <inline-loader v-show="runningAction === true"/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <section class="content--list">
            <ol class="table--list">
                <li class="table--list--row" v-for="(field, k) in fields" :key="'field-'+k"
                    :class="{['field-'+field.name+'-row']: true}">
                    <label class="table--list--cell label--cell" :for="field.name">{{field.title}}</label>
                    <div class="table--list--cell input--cell">
                        <component :is="field.components.details" v-bind="field.props" :attributes="field.attributes"
                                   :field="field"
                                   :value="datum[field.name]"></component>
                    </div>
                </li>
            </ol>
            <component :is="panel.component" :resource="resource" page="details" :panel="panel" v-for="(panel, k) in resource.panels" :key="k"></component>
        </section>
        <v-modal :label="$t('dashboard.confirmation')" @close="openDeleteModal = false" v-if="openDeleteModal">
            <template v-slot:body>
                <p>{{$t('dashboard.delete_item_message')}}</p>
            </template>
            <template v-slot:footer>
                <button @click="openDeleteModal = false" class="btn btn-normal btn-text">{{$t('dashboard.cancel')}}
                </button>
                <form :action="datum['@urls']['show']['url']" method="post">
                    <input type="hidden" name="_token" :value="resource.token">
                    <input type="hidden" name="_method" value="DELETE">
                    <button type="submit" class="btn btn-normal btn-primary">{{$t('dashboard.delete')}}</button>
                </form>
            </template>
        </v-modal>
        <div class="related-resources--container">
            <div class="" v-for="(res, k) in resource.relatedResource" :key="'related-resource-'+k">
                <hubble-index :resource="res"></hubble-index>
            </div>
        </div>

        <component v-if="action && showActionComponent" :is="action.component"
                   :selected="[datum]" :resource="resource" v-bind="action.props" :action="action"
                   @close="closeAction" @ran="actionRan"
        ></component>
    </div>
</template>

<script>

    import VModal from './components/v-modal.vue'
    import InlineLoader from "./components/inline-loader";

    export default {
        name: "dashboard-details",
        data: () => ({
            datum: {},
            openDeleteModal: false,
            action: null,
            runningAction: false,
            showActionComponent: false,
        }),
        components: {InlineLoader, VModal},
        props: {
            resource: {type: Object, required: true},
            item: {type: Object, required: true}
        },
        computed: {
            fields() {
                return Object.values(this.resource.fields)
            },
            actions() {
                return this.resource.actions;
            },
            iconActions() {
                return this.actions.filter(action => !!action.icon)
            },
            selectActions() {
                return this.actions.filter(action => !action.icon)
            },
        },
        methods: {
            runIconAction(action) {
                this.action = action;
                this.openAction();
            },
            fetchItem(params) {
                this.$axios.get(this.resource.urls.api.show).then(res => {
                    this.datum = res.data.data;
                }).catch(err => {
                    if (err.response.status === 404) {
                        try {
                           Turbolinks.visit(this.resource.urls.index.url)
                        } catch (e) {
                            window.location.href = this.resource.urls.index.url;
                        }
                    }
                })
            },
            selectAction(event) {
                let index = event.target.value;
                this.action = this.resource.actions[index] || null;
            },
            closeAction() {
                this.showActionComponent = false;
            },
            actionRan() {
                this.selected = [];
                this.fetchItems({'after-running-action': true});
            },
            openAction() {
                if (!this.action) return;
                this.showActionComponent = true;
            },
        },
        created() {
            this.datum = this.item;
        }
    }
</script>

<style scoped>

</style>
