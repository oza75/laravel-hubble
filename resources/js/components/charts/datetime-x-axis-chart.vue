<template>
    <div class="chart big-chart--chart-container">
        <div class="title">{{chart.title}}</div>
        <div class="toolbar">
            <button class="btn btn-normal" :id="tool.name" @click="updateData(tool)"
                    :class="{active: selection.name===tool.name}" :key="k" v-for="(tool, k) in toolbar">
                {{tool.text}}
            </button>
        </div>
        <div>
            <vue-apex-charts type="area" height="350" ref="chart" :options="options" :series="series"></vue-apex-charts>
        </div>
    </div>
</template>

<script>
    import VueApexCharts from "vue-apexcharts";
    import {encodeUrl} from "../../../../utils";

    export default {
        name: "datetime-x-axis-chart",
        data: () => ({
            toolbar: [
                {name: 'one_month', text: '1M', value: {start: {month: -1}}},
                {name: 'three_month', text: '3M', value: {start: {month: -3}}},
                {name: 'six_month', text: '6M', value: {start: {month: -6}}},
                {name: 'one_year', text: '1A', value: {start: {year: -1}}},
                {name: 'all', text: 'Tous', value: {all: true}},
            ],
            selection: {name: 'one_month', text: '1M', value: {month: -1}},
            items: []
        }),
        props: {
            chart: {type: Object, required: true},
        },
        components: {VueApexCharts},
        computed: {
            series() {
                return [{
                    name: this.chart.title,
                    data: this.items
                }]
            },
            options() {
                return {
                    chart: {
                        id: 'area-datetime',
                        type: 'area',
                        height: 350,
                        zoom: {
                            autoScaleYaxis: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        size: 0,
                        style: 'hollow',
                    },
                    xaxis: {
                        type: 'datetime',
                        tickAmount: 6,
                        labels: {
                            format: 'dd/MM'
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd MMM yyyy'
                        }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 100]
                        }
                    },
                }
            }
        },
        methods: {
            fetchItems(target = {start: {month: -1}}) {
                let url = this.chart.source + "?" + encodeUrl(target);
                return this.$axios.get(url).then(res => {
                    this.items = res.data.data
                    // this.$refs.chart.updateSeries(this.series)
                })
            },
            updateData: function (timeline) {
                this.selection = timeline

                this.fetchItems(timeline.value)
            }
        },
        created() {
            this.fetchItems()
        }
    }
</script>
