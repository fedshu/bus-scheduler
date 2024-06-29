<template>
  <Loading v-if="isLoading" />
  <BusScheduleList
    v-else
    :items="
      getSortedStopsByValue(
        filterStopsByQueryString(store.state.getAllUniqueStops(), queryString),
        sortDirection
      )
    "
    isSortable
    subTitle="Bus Stops"
    @sort-direction="handleSort"
  >
    <div class="bus-search position-relative">
      <input
        @input="handleInput"
        class="form-control form-control-sm bus-stop__search me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <svg
        :class="{ hidden: queryString.length }"
        width="20"
        height="20"
        class="bus-stop__icon position-absolute"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
          stroke="currentColor"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
  </BusScheduleList>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BusScheduleList from '@/components/BusScheduleList.vue'
import Loading from '@/components/Loading.vue'
import { useStore } from 'vuex'
import { debounce } from '@/utils'
import { Stop } from '@/types/Stop'
import { sortStops } from '@/utils'
import { SORT_DIRECTION } from '@/constans'

const store = useStore()
const queryString = ref<string>('')
const sortDirection = ref<string>(SORT_DIRECTION.ASCENDING)
const isLoading = computed(() => store.state.isLoading)

const handleSort = (direction: string) => {
  sortDirection.value = direction
}

const filterStopsByQueryString = (items: Stop[], searchString: string): Stop[] => {
  if (searchString.length <= 2 || !searchString.length) {
    return items
  }

  return items.filter((item: Stop) =>
    item.getValue().toLowerCase().includes(searchString.toLowerCase())
  )
}

const getSortedStopsByValue = (items: Stop[], direction: string): Stop[] => {
  return sortStops(items, direction)
}

const handleInput = debounce((e: Event) => {
  const target = e.target as HTMLInputElement

  queryString.value = target.value
}, 300)
</script>

<style lang="scss" scoped>
.bus-search {
  max-width: 288px;
}
.bus-stop__icon {
  top: -4px;
  right: 0;
  color: #9a9da4;
  transform: translate(-50%, 50%);
}
.bus-stop__search {
  &:focus {
    border-color: #1952e1;
    box-shadow: unset;
  }
}
.bus-stops {
  font-size: 0.75rem;
}

.hidden,
.form-control:focus + .bus-stop__icon {
  display: none;
}
</style>
