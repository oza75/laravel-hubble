<template>
    <div class="search--filter--wrapper" ref="wrapper">
        <button type="button" class="label" :class="labelClasses" @click="hasFocus = !hasFocus">
            <span class="label-content">
                 <slot name="label"></slot>
            <svg viewBox="0 0 16 16">
                <path d="M8 12L2 6h12z" fill="currentColor"></path>
            </svg>
            </span>
        </button>
        <div class="content " :class="{[position]: true, [contentClasses]: true}" v-show="hasFocus">
            <slot name="content"></slot>
<!--            <button class="mt-16 btn btn-primary btn-thin btn-full btn-radius" @click="hasFocus = false">Fermer</button>-->
        </div>
    </div>
</template>

<script>

    export default {
        name: "filter-wrapper",
        data: () => ({
            hasFocus: false,
        }),
        props: {
            position: {default: "", type: String},
            labelClasses: {default: "", type: String},
            contentClasses: {default: "", type: String},
        },
        computed: {
            getOutSideClickHandler() {
                return (event) => {
                    if (!this.$refs['wrapper'].contains(event.target)) {
                        this.hasFocus = false
                        setTimeout(() => {
                            window.removeEventListener('click', this.getOutSideClickHandler)
                        })
                    }
                }
            },
        },
        watch: {
            hasFocus(value) {
                if (value) {
                    window.addEventListener('click', this.getOutSideClickHandler)
                } else {
                    window.removeEventListener('click', this.getOutSideClickHandler)
                }
            }
        }
    }
</script>

<style scoped>

</style>
