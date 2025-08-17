<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowBrandFilterPopup')"></button>
      <h3 class="title">{{$t('brand_filter_popup.title')}}</h3>
      <form action="">
        <label for="brand">{{$t('brand_filter_popup.choose_brand')}}</label>
        <div class="input">
          <select disabled v-model="body.brand_id" name="brand" id="brand">
            <option value="">
              {{$t('brand_filter_popup.choose_brand')}}
            </option>
            <option 
              v-for="brand in getResult?.brands" 
              :key="brand.id" 
              :value="brand.id" 
            >
              {{brand.name}}
            </option>
          </select>
        </div>
        <label for="model">{{$t('brand_filter_popup.choose_model')}}</label>
        <div class="input">
          <select v-model="body.model_id" name="Model" id="Model">
            <option value="">{{$t('brand_filter_popup.choose_model')}}</option>
            <option v-for="model in getResult?.models" :key="model.id" :value="model.id" >{{model.name}}</option>
          </select>
        </div>
        <label for="year">{{$t('brand_filter_popup.choose_year')}}</label>
        <div class="input">
          <select v-model="body.manufacture_year_id" name="Year" id="Year">
              <option value="">{{$t('brand_filter_popup.choose_year')}}</option>
              <option v-for="year in getResult?.manufacture_years" :key="year.id" :value="year.id" >{{year.name}}</option>
            </select>
        </div>
        <label for="category">{{$t('brand_filter_popup.choose_category')}}</label>
        <div class="input">
          <select v-model="body.category_id" name="Category" id="Category">
            <option value="">{{$t('brand_filter_popup.choose_category')}}</option>
            <option v-for="category in getResult?.categories" :key="category.id" :value="category.id" >{{category.name}}</option>
          </select>
        </div>
      </form>
      <button class="main-btn" @click="handleFilterBrandData">
        {{$t('brand_filter_popup.search')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define router
  const router = useRouter()

  // define locale route
  const localeRoute = useLocaleRoute()

  // define emits
  const emit = defineEmits(['handleShowBrandFilterPopup'])


  // define props
  const body = ref({
    brand_id : globalStore.brand_data.id,
    model_id : '',
    manufacture_year_id : '',
    category_id : ''
  })

  // handle api methods
  const {
    getMethod,
    getResult,
  } = useApiMethods()

  // define filter variable to check the change in get method from fetch data or search 
  const dataFiltered = ref(false)

  // handle search data 
  const handleFilterBrandData = () => {
    let url = 'search?'
    let firstParam = true
    Object.keys(body.value).forEach(key => {
      if (body.value[key] !== "") {
        if(firstParam){
          url += `${key}=${body.value[key]}`
          firstParam = false
        }else{
          url += `&${key}=${body.value[key]}`
        }
      }
    })
    dataFiltered.value = true
    globalStore.searchEndpoint = url
    getMethod(url, '' , false, true)
  }

  watchEffect(()=>{
    if(getResult?.value && dataFiltered.value){
      globalStore.storeBrandFilteredData(getResult.value)
      globalStore.storeSearchResult()
      // dataFiltered.value = false
      router.push(localeRoute('/products/'))
    }
  })

  onMounted(()=>{
    getMethod('search-data' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  .input{
    border:none;
    border-bottom:1px solid #e4e4e4;
  }
</style>