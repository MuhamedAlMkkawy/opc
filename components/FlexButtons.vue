<template>
  <div>
    <div class="flex_buttons">
      <button class="main-btn reversed"  @click="handleBackRoute">
        {{$t('static_texts.back')}}
      </button>
      <button class="main-btn" @click="emit('handleSubmit')">
        {{$t('static_texts.next')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  const router = useRouter();


  // define emits
  const emit = defineEmits(['handleSubmit'])


  // handle back route
  const handleBackRoute = () => {
    router.back()
  }
</script>

<style lang="scss" scoped>

</style>
