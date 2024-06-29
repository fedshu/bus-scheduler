<template>
  <div class="alert alert-warning position-absolute end-50" role="alert">
    <strong><slot /></strong>
  </div>
</template>

<style scoped>
.alert {
  transform: translate(50%, 50%);
}
</style>
