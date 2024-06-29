<template>
  <LineList :bus-lines="lines" @select-bus="handleSelectLine" />
  <div class="d-flex gap-3 flex-grow-1 overflow-y-auto">
    <BusScheduleList
      class="w-50"
      title="Bus Line"
      subTitle="Bus Stops"
      :items="selectedLine?.getSortedStopsByValue(sortDirection)"
      :selected-item="selectedLine?.getNumber()"
      isSortable
      @select-item="handleSelectStop"
      @sort-direction="(direction) => (sortDirection = direction)"
      place-holder="Please select the bus line first"
    >
    </BusScheduleList>
    <BusScheduleList
      class="w-50"
      title="Bus Stops"
      subTitle="Time"
      :items="selectedStop?.getSortedTime()"
      :selected-item="selectedStop?.getValue()"
      place-holder="Please select the bus line first"
    >
    </BusScheduleList>
  </div>
</template>

<script setup lang="ts">
import LineList from '@/components/LineList.vue'
import BusScheduleList from '@/components/BusScheduleList.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Line } from '@/types/Line'
import { AbstractItem } from '@/types/AbstractItem'
import { Stop } from '@/types/Stop'
import { SORT_DIRECTION } from '@/constans'

const store = useStore()
let selectedLine = ref<Line>()
let selectedStop = ref<Stop>()
let sortDirection = ref<string>(SORT_DIRECTION.ASCENDING)

const handleSelectLine = (line: Line) => {
  if (selectedLine?.value?.getNumber() === line.getNumber()) return
  clearStopAndTime()

  selectedLine.value = line
}

const handleSelectStop = (stop: AbstractItem) => {
  if (selectedStop?.value?.getValue() === stop.getValue()) return

  if (stop instanceof Stop) {
    selectedStop.value = stop
  }
}

const clearStopAndTime = (): void => {
  selectedLine.value = undefined
  selectedStop.value = undefined
}

const lines = computed(() => store.getters.getLines)
</script>
