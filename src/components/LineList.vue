<template>
  <div class="bg-white rounded-1 mt-3 py-4">
    <div class="title px-4 fw-semibold">Select Bus Line</div>
    <Loading v-if="isLoading" />
    <div v-else class="ps-4 pe-5 pt-4">
      <template v-for="line in busLines" :key="line.number">
        <span
          class="badge d-inline-flex justify-content-center align-items-center fw-medium me-2 mb-2"
          :class="{ 'active-bus': line.getNumber() === activeLine }"
          role="button"
          @click="handleSelectLine(line)"
        >
          {{ line.getNumber() }}
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { Line } from '@/types/Line'
import Loading from '@/components/Loading.vue'

defineProps<{
  busLines: Line[]
}>()

const emit = defineEmits<{
  (e: 'selectBus', line: Line): void
}>()

const store = useStore()
const activeLine = ref<number>()

const isLoading = computed(() => store.state.isLoading)
const handleSelectLine = (line: Line) => {
  activeLine.value = line.getNumber()
  emit('selectBus', line)
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.875rem;
}

.badge {
  font-size: 0.75rem;
  width: 54px;
  height: 32px;
  background-color: #1952e1;

  &:hover {
    background-color: #1649ca;
  }

  &.active-bus {
    background-color: #2e3e6e;
  }
}
</style>
