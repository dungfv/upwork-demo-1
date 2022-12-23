<template>
  <Chart :options="data"></Chart>
</template>

<script lang="ts" setup>
import { Chart } from 'highcharts-vue'
import { SeriesPie } from './../../@types/chart'
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string,
  series: Array<SeriesPie>
}>()

const data = computed(() => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: props.title
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: props.series
  }]
}))
</script>