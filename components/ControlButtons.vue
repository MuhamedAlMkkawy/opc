<template>
  <div>
    <div class="control_btns">
      <button class="pi pi-pencil" @click="emit('handleEdit')"></button>
      <button class="pi pi-trash" @click="emit('handleDelete')"></button>
    </div>
  </div>
</template>

<script setup>
  // define emits 
  const emit = defineEmits(['handleDelete , handleEdit'])
</script>

<style lang="scss" scoped>

</style>