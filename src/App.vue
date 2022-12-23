<template>
  <Navbar @gone="start"></Navbar>
  <template v-if="started">
    <div v-if="loading" class="flex justify-center self-center items-center h-screen">
      <Loading></Loading>
    </div>
    <div v-else class="bg-gray-50 flex justify-center h-screen">
      <div class="max-w-7xl bg-white w-full p-5">
        <div class="grid grid-cols-3 gap-x-5">
          <div>
            <p>Continents</p>
            <Multiselect v-model="continentSelected" :options="continents"></Multiselect>
          </div>
          <div>
            <p>Metric</p>
            <Multiselect v-model="metricSelected" :options="MetricOptions"></Multiselect>
          </div>
          <div>
            <p>Limit</p>
            <Multiselect v-model="limit" :options="LimitOptions"></Multiselect>
          </div>
        </div>
  
        <div 
          class="mt-5" 
          :class="[metricSelected == 'ALL' ? 'sm:grid-cols-2 grid grid-cols-1' : 'flex justify-center']">
          <PieChat v-if="metricSelected == 'ALL' || metricSelected == 'population'"
            :title="metricSelected" 
            :series="populationChartData"></PieChat>
          <PieChat v-if="metricSelected == 'ALL' || metricSelected == 'areaInSqKm'"   
            :title="metricSelected" 
            :series="areaChartData"></PieChat>
        </div>
  
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300" ref="tableRef">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Continent name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Country name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Area
                        (Km<sup>2</sup>)</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Population</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(item, index) in visibleTableData" :key="index">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{
                          item.continent
                      }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ item.countryName }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ item.areaInSqKm }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ item.population }}
                      </td>
                    </tr>
                    <tr v-if="busy">
                      <td colspan="4">
                        <div class="flex justify-center p-3">
                          <Loading></Loading>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left"
                        colspan="2">
                        Total
                      </th>
                      <th class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        {{ totalPopulation }}
                      </th>
                      <th class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        {{ totalArea }}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import Navbar from './components/partials/Navbar.vue'
import Loading from './components/elements/Loading.vue'
import PieChat from './components/charts/PieChart.vue'
import useData from './hooks/useData'
import Multiselect from '@vueform/multiselect'
import { MetricOptions, LimitOptions } from './data/metric'
import { onMounted, ref } from 'vue'

const started = ref(false)
const start = async () => {
  started.value = true
  await getData()
}

const tableRef = ref<InstanceType<typeof HTMLTableElement>>()
const busy = ref(false)
onMounted(() => {
  window.addEventListener('scroll', () => {
    const bottomOfWindow = window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight - 100);
    if (bottomOfWindow && currentPage.value <= totalPage.value && !busy.value) {
      busy.value = true
      setTimeout(() => {
        currentPage.value += 1
      }, 300)
      setTimeout(() => {
        busy.value = false
      }, 600)
    }
  })
})

const {
  getData,
  loading,
  continentSelected,
  metricSelected,
  limit,
  continents,
  totalArea,
  totalPopulation,
  populationChartData,
  areaChartData,
  currentPage,
  totalPage,
  visibleTableData
} = useData()

</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
<style scoped>

</style>
