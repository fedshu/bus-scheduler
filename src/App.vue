<template>
  <Error v-if="error"> {{ error }} </Error>
  <div class="timetable container-xxl vh-100 d-flex flex-column">
    <h1 class="fw-semibold fs-4 py-3">Timetable</h1>
    <Tab
      id="nav-bus"
      :nav="[
        { label: 'Bus Lines', route: ROUTE.BUS_LINES, component: Lines },
        { label: 'Stops', route: ROUTE.BUS_STOPS, component: Stops },
      ]"
    >
    </Tab>
  </div>
</template>

<script setup lang="ts">
import Tab from '@/components/Tab.vue'
import { ROUTE } from '@/constans'
import Lines from '@/pages/Lines.vue'
import Stops from '@/pages/Stops.vue'
import Error from '@/components/Error.vue'

import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const error = computed(() => store.state.error)

onBeforeMount(() => {
  store.dispatch('getBusLines')
})
</script>

<style lang="scss" scoped>
.timetable {
  overflow: auto;
  min-height: 44rem;
  padding: 2.5rem 0;
}
</style>
