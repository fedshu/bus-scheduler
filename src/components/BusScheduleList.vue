<template>
  <div class="bus-schedule bg-white mt-3 rounded-1 d-flex flex-column flex-grow-1 overflow-auto">
    <div v-if="hasItems || !placeHolder" class="d-flex flex-column mh-100">
      <div class="bus-header header border-bottom p-4">
        <slot />
        <div v-if="title" class="title fw-semibold">{{ title }}: {{ selectedItem }}</div>
        <div class="d-flex pt-4 align-items-center">
          <div v-if="subTitle" class="sub-title bus-stop-search fw-semibold">
            {{ subTitle }}
          </div>
          <span
            v-if="isSortable"
            class="caret-wrapper"
            :class="{
              ascending: currSortDirection === SORT_DIRECTION.ASCENDING,
              descending: currSortDirection === SORT_DIRECTION.DESCENDING,
            }"
            @click.stop="handleSelectSortDirection"
          >
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </div>
      </div>
      <div class="flex-grow-1 overflow-auto">
        <ul v-if="hasItems" class="list-group list-group-flush">
          <div>
            <template v-for="(item, index) in items" :key="`${item}${index}`">
              <li
                v-if="items"
                class="list-group-item list-group-item-action ps-4 py-3"
                :class="{ 'active-item': activeItem?.compare(item) }"
                type="button"
                @click="handleSelectItem(item)"
              >
                {{ item.getValue() }}
              </li>
            </template>
          </div>
        </ul>
      </div>
    </div>
    <div
      v-else-if="placeHolder"
      class="bus-schedule__no-content h-100 d-flex justify-content-center align-items-center"
    >
      {{ placeHolder }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { SORT_DIRECTION } from '@/constans'
import { AbstractItem } from '@/types/AbstractItem'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  items?: AbstractItem[]
  title?: string
  subTitle?: string
  selectedItem?: string | number
  placeHolder?: string
  isSortable?: boolean
}>()

const emit = defineEmits<{
  (e: 'selectItem', item: AbstractItem): void
  (e: 'sortDirection', direction: string): void
}>()

watch(
  () => props.selectedItem,
  () => {
    activeItem.value = undefined
  }
)

const currSortDirection = ref<string>(SORT_DIRECTION.ASCENDING)
const hasItems = computed(() => props.items && props.items.length)
const activeItem = ref<AbstractItem>()

const handleSelectItem = (item: AbstractItem) => {
  activeItem.value = item
  emit('selectItem', item)
}

const handleSelectSortDirection = () => {
  currSortDirection.value =
    currSortDirection.value === SORT_DIRECTION.ASCENDING
      ? SORT_DIRECTION.DESCENDING
      : SORT_DIRECTION.ASCENDING

  emit('sortDirection', currSortDirection.value)
}
</script>

<style lang="scss" scoped>
.bus-schedule {
  .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 14px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
  }
  .sort-caret {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    position: absolute;
    left: 7px;
  }
  .sort-caret.descending {
    border-top-color: #b9bdca;
    bottom: -3px;
  }
  .sort-caret.ascending {
    border-bottom-color: #b9bdca;
    top: -5px;
  }
  .caret-wrapper.ascending .sort-caret.ascending {
    border-bottom-color: #1952e1;
  }
  .caret-wrapper.descending .sort-caret.descending {
    border-top-color: #1952e1;
  }
}

.bus-schedule__no-content {
  background-image: repeating-linear-gradient(
      20deg,
      #9a9da4,
      #9a9da4 29px,
      transparent 29px,
      transparent 55px,
      #9a9da4 55px
    ),
    repeating-linear-gradient(
      103deg,
      #9a9da4,
      #9a9da4 29px,
      transparent 29px,
      transparent 55px,
      #9a9da4 55px
    ),
    repeating-linear-gradient(
      201deg,
      #9a9da4,
      #9a9da4 29px,
      transparent 29px,
      transparent 55px,
      #9a9da4 55px
    ),
    repeating-linear-gradient(
      284deg,
      #9a9da4,
      #9a9da4 29px,
      transparent 29px,
      transparent 55px,
      #9a9da4 55px
    );

  background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
}

.bus-header {
  border-color: #e2e4ea;
}

.list-group {
  overflow: auto;

  & {
    scrollbar-width: thin;
    scrollbar-color: #b4b7b9 #ffffff;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 20px;
    border: 3px solid orange;
  }

  .list-group-item {
    color: #33373c;
    border-color: #f3f4f9;
  }
}

.list-group-item {
  font-size: 0.75rem;

  &.active-item {
    color: #1952e1;
  }
}

.title {
  font-size: 0.875rem;
}

.sub-title {
  font-size: 0.75rem;
}
</style>
