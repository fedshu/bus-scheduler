<template>
  <ul class="nav nav-underline bg-white rounded-1 ps-4 gap-1" :id="`tab-${id}`" role="tablist">
    <li v-for="item in nav" :key="item.label" class="nav-item" role="presentation">
      <router-link
        class="nav-link p-4 fw-medium border-2"
        :class="{ active: item.route === activeRoute }"
        :to="{ name: item.route }"
        role="tab"
      >
        {{ item.label }}
      </router-link>
    </li>
  </ul>
  <div class="tab-content d-flex flex-column flex-grow-1 overflow-y-auto" :id="`tab-content-${id}`">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { RouteRecordName, useRoute } from 'vue-router'
import type { Component } from 'vue'

defineProps<{
  id: string
  nav: {
    label: string
    route: string
    component: Component
  }[]
}>()

const route = useRoute()
const activeRoute = ref<RouteRecordName>()

watch(
  () => route.name,
  () => (activeRoute.value = route.name ?? '')
)
</script>

<style lang="scss" scoped>
.nav {
  .nav-link {
    font-size: 0.875rem;
    color: var(--bs-nav-underline-link-active-color);
    opacity: 0.5;

    &.active {
      opacity: 1;
      border-color: #1952e1;
    }
  }
}
</style>
