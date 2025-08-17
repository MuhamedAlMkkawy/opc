<template>
  <div class="page static_page">
    <div class="container">
      <div class="content">
        <div class="page_text">
          <h2>{{ $t('terms.title') }}</h2>
          <!-- <div v-html="getResult" class="terms_content"></div> -->
           <pre>{{ getResult }}</pre>
        </div>
        <div class="image">
          <img src="/assets/images/logo.png" alt="image" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod('terms' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  pre{
    white-space: pre-wrap; /* Allows text to wrap */
    word-wrap: break-word; /* Breaks long words if needed */
    overflow-wrap: break-word; /* Modern alternative to word-wrap */
  }
</style>