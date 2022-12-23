import axios from 'axios'
import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue'
import { Geoname } from '../@types/geoname'
const PER_PAGE = 20

export default function useData() {
  const continentSelected = ref('ALL')
  const metricSelected = ref('ALL')
  const limit = ref(5)
  const loading = ref(true)
  const originGeonames = ref<Array<Geoname & { percent_population: number, percent_area: number }>>([])

  const getData = async () => {
    await axios.get('/data/geonames.json', {
      withCredentials: false
    })
      .then(result => {
        originGeonames.value = result.data.geonames
      })
      .finally(() => {
        loading.value = false
      })
  }

  // Filter data by continent
  const geonames = computed(() => {
    return originGeonames.value.filter(item => {
      if (continentSelected.value == 'ALL') {
        return true
      }
      return item.continent == continentSelected.value
    }).sort((a, b) => a.continent.localeCompare(b.continent))
  })

  // Calculator total population
  const totalPopulation = computed(() => {
    let total = 0
    geonames.value.forEach(item => {
      total += parseInt(item.population)
    })

    return total
  })

  // Calculator total area
  const totalArea = computed(() => {
    let total = 0
    geonames.value.forEach(item => {
      total += parseFloat(item.areaInSqKm)
    })

    return total
  })

  // Get continents
  const continents = computed(() => {
    const conts = originGeonames.value.map(item => {
      return item.continent
    }).sort()

    return ['ALL', ...new Set(conts)]

  })

  const populationChartData = computed(() => {
    let totalPercent = 0
  
    const goalData = geonames.value
      .map(item => {
        item.percent_population = parseFloat((parseInt(item.population) / totalPopulation.value * 100).toFixed(2))
        return item
      })
      .sort((a, b) => (a.percent_population ?? 0) > (b.percent_population ?? 0) ? -1 : 1)
      .slice(0, limit.value).map(item => {
        totalPercent += item.percent_population
        return {
          name: item.countryName,
          y: item.percent_population,
          sliced: true,
          selected: true
        }
    })
    return [...goalData, { name: 'Other', y: 100 - totalPercent }]

  })
  const areaChartData = computed(() => {
    let totalPercent = 0
  
    const goalData = geonames.value
      .map(item => {
        item.percent_area = parseFloat((parseInt(item.population) / totalArea.value * 100).toFixed(2))
        return item
      })
      .sort((a, b) => (a.percent_area ?? 0) > (b.percent_area ?? 0) ? -1 : 1)
      .slice(0, limit.value).map(item => {
        totalPercent += item.percent_area
        return {
          name: item.countryName,
          y: item.percent_area,
          sliced: true,
          selected: true
        }
    })
    return [...goalData, { name: 'Other', y: 100 - totalPercent }]
  })


  // Infinity load more table
  const visibleTableData = computed(() => {
    return geonames.value.slice(0, currentPage.value * PER_PAGE)
  })
  const currentPage = ref(1)
  const totalPage = computed(() => {
    return Math.floor(geonames.value.length / PER_PAGE)
  })
  


  return {
    getData,
    loading,
    continentSelected,
    metricSelected,
    limit,
    geonames,
    continents,
    totalPopulation,
    totalArea,
    populationChartData,
    areaChartData,
    visibleTableData,
    currentPage,
    totalPage,
  }
}