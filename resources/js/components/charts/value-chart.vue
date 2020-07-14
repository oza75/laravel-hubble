<template>
    <div class="chart value--chart-container">
        <div class="title">{{chart.title}}</div>
        <div class="value--wrapper">
            <div class="value">{{chart.value}}</div>
            <div class="evolution" :class="{increase: increasing, decrease: !increasing}">
                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" v-if="increasing"
                     stroke-width="2" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>

                <svg fill="none" stroke-linecap="round" v-else
                     stroke-linejoin="round" stroke-width="2"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
                <span class="percent">{{chart.evolution}}%</span>
            </div>
        </div>
        <div id="chart">
            <vue-apex-charts type="area" :height="50" :options="options" :series="series"></vue-apex-charts>
        </div>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: "value-chart",
        components: {VueApexCharts},
        props: {
            chart: {type: Object, required: true}
        },
        computed: {
            increasing() {
                return this.chart.evolution >= 0;
            },
            series() {
                return [{
                    name: this.chart.title,
                    data: Object.values(this.chart.data)
                }]
            },
            options() {
                return {
                    chart: {
                        height: 200,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    grid: {
                        padding: {
                            left: -15,
                            right: 0,
                            top: -30,
                        },
                        row: {
                            colors: ['#738a94', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0
                        },
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        },
                        categories: Object.keys(this.chart.data),
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
