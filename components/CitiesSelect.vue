<template>
  <div class="input-wrap">
    <label for="city_id">{{ $t('settings.labels.city') }}</label>
    <div class="input">
      <select 
        name="city_id" 
        :value="props.city" 
        id="city_id" 
        @change="emit('handleChangeCity' , $event.target.value)"
      >
        <option value=0>{{ $t('settings.placeholders.city') }}</option>
        <option 
          v-for="city in citiesData?.data" 
          :key="city.id" 
          :value="city.id"
        >
          {{ city.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
  // define props 
  const props = defineProps({
    city : {
      type : Number,
      default : 0
    }
  })
  
  // define emits 
  const emit = defineEmits(['handleChangeCity'])

  // fetch profile data 
  const { data: citiesData } = useApiFetch('cities' , true);
</script>

<style lang="scss" scoped>

</style>
