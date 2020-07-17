<template>
    <div class="container dashboard--container dashboard--index">
        <header class="header">
            <h2 class="title">{{resource.title}}</h2>
            <div class="filters">
                <div v-for="(filter, k) in (resource.filters || [])" :key="'filter-'+k">
                    <hubble-filter :filter="filter" :value="customFilters[filter.name]"
                                      @input="selectFilter(filter, $event)"/>
                </div>
            </div>
        </header>
        <section class="content--list">
            <div class="total--wrapper">
                <div class="total">
                    <span v-if="total > 0">
                        {{total}} résultats
                    </span>
                </div>
            </div>

            <div class="actions--header" :class="{'not-searchable': !resource.searchable}">
                <div class="search--input--wrapper" v-if="resource.searchable">
                    <svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 17L13.846 11.846C14.7988 10.3979 15.1804 8.64774 14.917 6.93442C14.6535 5.22111 13.7637 3.66648 12.4199 2.57154C11.076 1.47659 9.37366 0.919227 7.64245 1.00735C5.91123 1.09547 4.27429 1.82281 3.04855 3.04855C1.82281 4.27429 1.09547 5.91123 1.00735 7.64245C0.919227 9.37366 1.47659 11.076 2.57154 12.4199C3.66648 13.7637 5.22111 14.6535 6.93442 14.917C8.64774 15.1804 10.3979 14.7988 11.846 13.846L17 19L19 17ZM2.99998 7.99998C2.99998 5.24298 5.24298 2.99998 7.99998 2.99998C10.757 2.99998 13 5.24298 13 7.99998C13 10.757 10.757 13 7.99998 13C5.24298 13 2.99998 10.757 2.99998 7.99998Z"/>
                    </svg>
                    <input type="text" placeholder="Faites une recherche ici" @input="search">
                </div>
                <div class="actions--header--right">
                    <div class="resources--actions--wrapper"
                         v-if="resource.actions && resource.actions.length > 0 && selected.length > 0">
                        <label class="resources--actions--wrapper">
                            <select name="action" id="action" v-model="action">
                                <option :value="null" selected>Choisir une action</option>
                                <option :value="k" v-for="(action, k) in resource.actions" :key="'action-'+k">
                                    {{action.title}}
                                </option>
                            </select>
                        </label>
                        <button @click="runAction(false)" class="btn btn-coral btn-radius btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px"
                                 v-show="!runningAction"
                                 height="24px">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 120 30"
                                 fill="#fff"
                                 v-show="runningAction">
                                <circle cx="15" cy="15" r="14.7499">
                                    <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15"
                                             calcMode="linear" repeatCount="indefinite"/>
                                    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s"
                                             values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="60" cy="15" r="9.25014" fill-opacity="0.3">
                                    <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9"
                                             calcMode="linear" repeatCount="indefinite"/>
                                    <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s"
                                             values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="105" cy="15" r="14.7499">
                                    <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15"
                                             calcMode="linear" repeatCount="indefinite"/>
                                    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s"
                                             values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>
                                </circle>
                            </svg>
                        </button>
                    </div>
                    <a :href="resource.urls.create.url" :target="resource.urls.create.target"
                       class="create-btn btn btn-radius btn-primary btn-normal" v-if="!resource.isManyRelation">
                        Créer
                    </a>

                    <button @click="attach" class="create-btn btn btn-radius btn-primary btn-normal"
                            v-if="resource.isManyRelation">
                        Attacher
                    </button>

                </div>
            </div>
            <ol class="table--list"
                :class="{'has-actions': resource.actions && resource.actions.length > 0 && selected.length > 0}">
                <li class="table--list--row list--header">
                    <div class="fake-checkbox--wrapper table--list--cell table--header--cell table--select--all">
                        <div class="fake-checkbox" :class="{active: isAllSelected}" @click="selectAll()"></div>
                    </div>
                    <div class="table--list--cell table--header--cell"
                         :class="{['table--'+ field.name+ '-header']: true, 'numeric-field': field.attributes.is_numeric || false}"
                         v-for="field in fields" :key="field.name">
                        <div class="table--header--cell--content"
                             @click="field.sortable ? sortBy(field.name): null">
                            <template v-if="field.sortable">
                                <svg height="20px" viewBox="0 0 64 64" width="20px" v-if="!isSortedBy(field.name)"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m31.414 15.586-7-7c-.78-.781-2.048-.781-2.828 0l-7 7c-.781.781-.781 2.047 0 2.828.78.781 2.048.781 2.828 0l3.586-3.586v39.172c0 1.104.896 2 2 2s2-.896 2-2v-39.172l3.586 3.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828z"/>
                                    <path
                                        d="m49.414 45.586c-.781-.781-2.047-.781-2.828 0l-3.586 3.586v-39.172c0-1.104-.896-2-2-2s-2 .896-2 2v39.172l-3.586-3.586c-.781-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l7 7c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l7-7c.781-.781.781-2.047 0-2.828z"/>
                                </svg>
                                <svg v-if="isSortedBy(field.name, 'desc')" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24"
                                     width="24px" height="24px">
                                    <path d="M7 10l5 5 5-5z"/>
                                </svg>
                                <svg v-if="isSortedBy(field.name, 'asc')" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24"
                                     width="24px"
                                     height="24px">
                                    <path d="M7 14l5-5 5 5z"/>
                                </svg>
                            </template>
                            <span class="name">
                                {{field.title}}
                            </span>
                        </div>
                    </div>
                    <div class="table--list--cell table--header--cell"></div>
                </li>
                <li v-for="(item, k) in items" :key="'item-'+k" :class="{selected: isSelected(item)}"
                    class="table--list--row table--list--item" @click="select(item)">
                    <div class="fake-checkbox--wrapper table--list--data">
                        <div class="fake-checkbox" :class="{active: isSelected(item)}"></div>
                    </div>
                    <div class="table--list--data" :class="{['table--'+field.name]: true}"
                         v-for="field in fields" :key="'table-row--'+k+'-'+field.name"
                    >
                        <div class="table--list--data--content">
                            <component :is="field.components.index" :field="field"
                                       :value="item[field.name]" v-bind="field.attributes" :data="item"></component>
                        </div>
                    </div>

                    <div class="table--list--data table--list--data--actions">
                        <div class="wrapper">
                            <a :href="item['@urls']['show']['url']" :target="item['@urls']['show']['target'] || '_self'"
                               v-if="item['@urls']['show']  && item['@urls']['show']['url']" title="Voir">
                                <svg width="24" height="12" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.9999 0C5.74794 0 0.937443 5.508 0.937443 5.508L0.491943 6L0.937443 6.492C0.937443 6.492 5.32344 11.493 11.1562 11.9535C11.4344 11.988 11.7127 12 11.9999 12C12.2872 12 12.5654 11.988 12.8437 11.9528C18.6764 11.493 23.0624 6.49275 23.0624 6.49275L23.5079 6L23.0624 5.508C23.0624 5.508 18.2519 0 11.9999 0ZM11.9999 1.5C13.6522 1.5 15.1754 1.9515 16.4999 2.5545C16.9777 3.34575 17.2499 4.257 17.2499 5.25C17.2531 6.54284 16.7788 7.79132 15.918 8.75593C15.0572 9.72053 13.8706 10.3333 12.5857 10.4767C12.5707 10.4797 12.5534 10.4737 12.5392 10.4767C12.3599 10.485 12.1814 10.5 11.9999 10.5C11.8004 10.5 11.6077 10.488 11.4142 10.4767C10.1293 10.3333 8.94267 9.72053 8.08187 8.75593C7.22108 7.79132 6.74677 6.54284 6.74994 5.25C6.74994 4.27125 7.01394 3.36 7.47669 2.57775H7.45344C8.78769 1.96275 10.3297 1.5 11.9999 1.5ZM11.9999 3C11.403 3.0002 10.8306 3.23752 10.4086 3.65976C9.98668 4.082 9.74974 4.65456 9.74994 5.2515C9.75014 5.84844 9.98746 6.42084 10.4097 6.8428C10.8319 7.26476 11.4045 7.5017 12.0014 7.5015C12.297 7.5014 12.5897 7.44309 12.8627 7.32989C13.1357 7.21668 13.3838 7.05081 13.5927 6.84174C13.8017 6.63267 13.9674 6.38449 14.0804 6.11138C14.1934 5.83827 14.2515 5.54557 14.2514 5.25C14.2513 4.95443 14.193 4.66177 14.0798 4.38873C13.9666 4.1157 13.8008 3.86763 13.5917 3.6587C13.3826 3.44977 13.1344 3.28406 12.8613 3.17104C12.5882 3.05802 12.2955 2.9999 11.9999 3V3ZM5.43744 3.7035C5.31551 4.21004 5.25259 4.72899 5.24994 5.25C5.24994 6.5655 5.62494 7.79625 6.28119 8.83575C4.94979 8.0558 3.72808 7.10218 2.64819 6C3.49829 5.14237 4.43278 4.37272 5.43744 3.70275V3.7035ZM18.5624 3.7035C19.5671 4.37323 20.5016 5.14263 21.3517 6C20.2718 7.10218 19.0501 8.0558 17.7187 8.83575C18.3952 7.76233 18.7528 6.51881 18.7499 5.25C18.7499 4.71375 18.6794 4.2015 18.5624 3.70275V3.7035Z"/>
                                </svg>
                            </a>
                            <a :href="item['@urls']['edit']['url']" :target="item['@urls']['edit']['target']|| '_self'"
                               v-if="item['@urls']['edit'] && item['@urls']['edit']['url']" title="Modifier">
                                <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.4001 3.33998L13.6601 0.59998C13.3024 0.264076 12.8338 0.0713388 12.3434 0.058432C11.8529 0.0455252 11.3748 0.213349 11.0001 0.52998L2.00005 9.52998C1.67682 9.85594 1.47556 10.2832 1.43005 10.74L1.00005 14.91C0.986582 15.0564 1.00559 15.2041 1.05571 15.3424C1.10584 15.4806 1.18585 15.6062 1.29005 15.71C1.38349 15.8027 1.49431 15.876 1.61615 15.9258C1.73798 15.9755 1.86845 16.0007 2.00005 16H2.09005L6.26005 15.62C6.71685 15.5745 7.14409 15.3732 7.47005 15.05L16.4701 6.04998C16.8194 5.68095 17.0082 5.18849 16.995 4.68052C16.9819 4.17254 16.768 3.69049 16.4001 3.33998V3.33998ZM6.08005 13.62L3.08005 13.9L3.35005 10.9L9.00005 5.31998L11.7001 8.01998L6.08005 13.62ZM13.0001 6.67998L10.3201 3.99998L12.2701 1.99998L15.0001 4.72998L13.0001 6.67998Z"/>
                                </svg>
                            </a>
                            <div @click="setItemToRemove(item, k)"
                                 :title="resource.isManyRelation ?'Détacher' : 'Supprimer'"
                                 v-if="item['@urls']['delete']">
                                <svg width="19" height="20" viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.00293 18C2.00293 19.103 2.89993 20 4.00293 20H14.0029C15.1059 20 16.0029 19.103 16.0029 18V6H18.0029V4H14.0029V2C14.0029 0.897 13.1059 0 12.0029 0H6.00293C4.89993 0 4.00293 0.897 4.00293 2V4H0.00292969V6H2.00293V18ZM6.00293 2H12.0029V4H6.00293V2ZM5.00293 6H14.0029L14.0039 18H4.00293V6H5.00293Z"/>
                                    <path d="M6.00293 8H8.00293V16H6.00293V8ZM10.0029 8H12.0029V16H10.0029V8Z"/>
                                </svg>
                            </div>
                            <additional-actions v-if="(item['@urls']['more'] || []).length > 0"
                                                :options="item['@urls']['more']"/>
                        </div>
                    </div>
                </li>
            </ol>
            <div class="empty--states" v-if="isEmpty">
                <div class="wrapper">
                    <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="m7.323 10.5h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                        <g>
                            <path
                                d="m19.323 10.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                        <g>
                            <path
                                d="m7.323 14.5h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                        <g>
                            <path
                                d="m19.323 14.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                        <g>
                            <path
                                d="m7.323 18.5h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                        <g>
                            <path
                                d="m19.323 18.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                        <g>
                            <path
                                d="m21.25 23h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-16.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v16.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-20.5c-.689 0-1.25.561-1.25 1.25v16.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-16.5c0-.689-.561-1.25-1.25-1.25z"/>
                        </g>
                        <g>
                            <path
                                d="m23.25 6h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                        </g>
                    </svg>
                    <h4>Aucun élément ne correspondant à ces critères</h4>
                </div>
            </div>
            <v-pagination :page-count="lastPage" page-link-class="item" v-if="lastPage > 1"
                          disabled-class="disabled" :value="page"
                          @input="paginate"
                          prev-link-class="item" next-link-class="item"
                          container-class="pagination--container"
                          prev-text="Precedent" next-text="Suivant"/>
        </section>
        <v-modal label="Confirmation" v-if="actionModalConfirmation" @close="actionModalConfirmation = false">
            <template v-slot:body>
                <p v-html="currentAction.confirm_message"></p>
            </template>
            <template v-slot:footer>
                <button class="btn btn-text btn-normal" @click="actionModalConfirmation = false">Annuler</button>
                <button class="btn btn-normal btn-primary" @click="runAction(true)">Confirmer</button>
            </template>
        </v-modal>
        <v-modal label="Confirmation" v-if="deleteItemModal" @close="deleteItemModal = false">
            <template v-slot:body>
                <span v-if="resource.isManyRelation">Voulez-vous vraiment détacher cet enregistrement ?</span>
                <span v-else> Voulez-vous vraiment supprimer cet enregistrement ?</span>
            </template>
            <template v-slot:footer>
                <button class="btn btn-normal btn-text" @click="deleteItemModal = false">Annuler</button>
                <button class="btn btn-normal btn-radius"
                        :class="{'btn-primary': !resource.isManyRelation, 'btn-coral': resource.isManyRelation}"
                        @click="removeItem">
                    <span v-show="!removing">
                        <span v-if="resource.isManyRelation">Détacher</span>
                        <span v-else>Confirmer</span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 120 30" fill="#fff"
                         v-show="removing">
                        <circle cx="15" cy="15" r="12.9998">
                            <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15"
                                     calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1"
                                     calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="60" cy="15" r="11.0002" fill-opacity="0.3">
                            <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9"
                                     calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s"
                                     values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="105" cy="15" r="12.9998">
                            <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15"
                                     calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1"
                                     calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                </button>
            </template>
        </v-modal>
        <v-modal label="Associer" v-if="attachModalState" @close="attachModalState = false" card-classes="attach-modal">
            <template v-slot:body>
                <component :is="resource.field.components.creating" :field="resource.field"
                           :form-data="{}" :multiple="false" v-model="itemToAttach"
                           v-bind="resource.field.attributes"></component>
            </template>
            <template v-slot:footer>
                <button class="btn btn-normal btn-text" @click="attachModalState = false">Annuler</button>
                <button class="btn btn-normal btn-primary btn-radius" :disabled="!itemToAttach" @click="attachItem">
                    <span v-show="!attaching">Attacher</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 120 30" fill="#fff"
                         v-show="attaching">
                        <circle cx="15" cy="15" r="12.9998">
                            <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15"
                                     calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1"
                                     calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="60" cy="15" r="11.0002" fill-opacity="0.3">
                            <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9"
                                     calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s"
                                     values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="105" cy="15" r="12.9998">
                            <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15"
                                     calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1"
                                     calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                </button>
            </template>
        </v-modal>
    </div>
</template>

<script>
    import VModal from './components/v-modal.vue'
    import VPagination from "./components/VPagination";
    import {encodeUrl} from "./utils";
    // import CheckboxFilter from "../search/checkbox-filter";
    import AdditionalActions from "./components/additional-actions";
    import HubbleFilter from "./components/filters/hubble-filter";

    export default {
        name: "hubble-index",
        data: () => ({
            items: [],
            filtersOptions: {},
            fetching: true,
            removing: false,
            selected: [],
            page: 1,
            action: null,
            itemToRemove: null,
            deleteItemModal: false,
            actionModalConfirmation: false,
            runningAction: false,
            lastPage: 0,
            total: 0,
            searchTimer: null,
            customFilters: {},
            filters: {
                sort: {by: null, type: null},
                search: null
            },
            attachModalState: false,
            itemToAttach: null,
            attaching: false,
        }),
        components: {HubbleFilter, AdditionalActions, VPagination, VModal},
        props: {
            resource: {type: Object, required: true}
        },
        computed: {
            isEmpty() {
                return this.items.length === 0 && this.fetching === false
            },
            isAllSelected() {
                return this.selected.length === this.items.length
            },
            key() {
                return this.resource.key || 'id'
            },
            currentAction() {
                if (this.action === null || this.action === undefined) return null;
                return this.resource.actions[this.action]
            },
            url() {
                let params = {
                    ...this.filters,
                    page: this.page
                }

                let filters = this.resource.filters || [];

                filters.forEach(filter => {
                    if (!this.customFilters[filter.name]) return;
                    params[filter.name] = Array.isArray(this.customFilters[filter.name])
                        ? this.customFilters[filter.name].map(it => it[filter.attributes.valueKey])
                        : this.customFilters[filter.name][filter.attributes.valueKey]
                })

                return this.resource.urls.api.index + '?' + encodeUrl(params)
            },
            fields() {
                return Object.values(this.resource.fields)
            }
        },
        methods: {
            fetchItems(params = {}) {
                this.fetching = true;
                this.$axios.get(this.url + `&${encodeUrl(params)}`).then(res => {
                    this.items = res.data.data
                    this.lastPage = res.data.meta.last_page
                    this.total = res.data.meta.total
                }).finally(_ => {
                    this.fetching = false;
                })
            },
            select(item) {
                let index = this.selected.findIndex(it => it === item[this.key])
                if (index === -1) this.selected.push(item[this.key])
                else this.selected.splice(index, 1)
            },
            isSelected(item) {
                let index = this.selected.findIndex(it => it === item[this.key])

                return index !== -1
            },
            selectAll() {
                if (this.isAllSelected) {
                    this.selected = []
                    return;
                }

                this.selected = this.items.map(it => it[this.key])
            },
            runAction(confirmed = false) {
                if (!this.currentAction) return;
                if (this.currentAction.confirm_message && !confirmed) {
                    this.actionModalConfirmation = true;
                    return false;
                }
                this.actionModalConfirmation = false;
                this.runningAction = true;
                return this.$axios.post(this.currentAction.url, {items: this.selected})
                    .then(res => {
                        this.selected = [];
                        this.fetchItems({'after-running-action': true});
                    }).finally(_ => {
                        this.runningAction = false;
                    })
            },
            paginate(page) {
                this.page = page;
                this.fetchItems()
                document.querySelector('.admin-dashboard--content').scroll(0, 0)
            },
            isSortedBy(field, type = null) {
                if (this.filters.sort.by !== field) return false;

                if (!type) return true;

                return this.filters.sort.type === type;
            },
            sortBy(field) {
                if (!this.isSortedBy(field)) {
                    this.filters.sort = {by: field, type: 'asc'}
                    return;
                }

                if (this.isSortedBy(field, 'asc')) {
                    this.filters.sort = {by: field, type: 'desc'}
                    return;
                }

                if (this.isSortedBy(field, 'desc')) {
                    this.filters.sort = {by: null, type: null}
                    return;
                }
            },
            search(event) {
                let query = event.target.value;
                clearTimeout(this.searchTimer)
                this.searchTimer = setTimeout(() => {
                    this.filters.search = query;
                    // this.fetchItems();
                }, 350)
            },
            selectFilter(filter, value) {
                this.$set(this.customFilters, filter.name, value)
            },

            setItemToRemove(item, index) {
                this.itemToRemove = {value: item, index: index}
                this.deleteItemModal = true;
            },
            removeItem() {
                if (!this.itemToRemove) return;
                this.removing = true;
                this.$axios.delete(this.itemToRemove.value['@urls']['delete']['url']).then(res => {
                    this.items.splice(this.itemToRemove.index, 1);
                    this.itemToRemove = null;
                    this.deleteItemModal = false;
                }).finally(_ => {
                    this.removing = false;
                })
            },
            attach() {
                this.attachModalState = true;
            },
            attachItem() {
                if (!this.itemToAttach) return;
                let value = this.itemToAttach[this.resource.field.attributes.valueKey];
                this.attaching = true;
                this.$axios.post(this.itemToAttach['attach_url'], {
                    id: value
                }).then(res => {
                    this.attachModalState = false
                    this.fetchItems()
                    this.itemToAttach = null;
                }).finally(_ => {
                    this.attaching = false;
                })
            }
        },
        watch: {
            filters: {
                handler() {
                    this.page = 1
                    this.fetchItems()
                },
                deep: true
            },
            customFilters: {
                handler() {
                    this.page = 1
                    this.fetchItems()
                },
                deep: true
            }
        },
        created() {
            this.fetchItems()
        }
    }
</script>
