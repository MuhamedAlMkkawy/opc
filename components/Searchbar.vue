<template>
  <div>
    <div class="search_bar">
      <div class="input">
        <i class="pi pi-search"></i>
        <input 
          type="text"
          :placeholder="$t('search_bar.search_placeholder')" 
          v-model="body.keyword" 
        >
      </div>
      <div class="input">
        <select name="searchKey" v-model="body.category_type" id="searchKey">
          <option value="1">{{$t('search_bar.category')}}</option>
          <option value="2">{{$t('search_bar.vin_number')}}</option>
        </select>
      </div>
      <button class="search" @click="applySearch">
        {{$t('search_bar.submit')}}
      </button>
    </div>
    <div class="filtered_inputs" v-if="body.category_type === '1'">
      <div class="inputs">
        <div class="input-wrap">
          <label for="brand">{{$t('search_bar.brand')}}</label>
          <div class="input">
            <select v-model="body.brand_id" name="brand" id="brand">
              <option value="">{{$t('search_bar.choose')}} {{$t('search_bar.brand')}}</option>
              <option v-for="brand in getResult?.brands" :key="brand.id" :value="brand.id" >{{brand.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label for="Model">{{$t('search_bar.model')}}</label>
          <div class="input">
            <select v-model="body.model_id" name="Model" id="Model">
              <option value="">{{$t('search_bar.choose')}} {{$t('search_bar.model')}}</option>
              <option v-for="model in getResult?.models" :key="model.id" :value="model.id" >{{model.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label for="Year">{{$t('search_bar.year')}}</label>
          <div class="input">
            <select v-model="body.manufacture_year_id" name="Year" id="Year">
              <option value="">{{$t('search_bar.choose')}} {{$t('search_bar.year')}}</option>
              <option v-for="year in getResult?.manufacture_years" :key="year.id" :value="year.id" >{{year.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label for="Category">{{$t('search_bar.category')}}</label>
          <div class="input">
            <select v-model="body.category_id" name="Category" id="Category">
              <option value="">{{$t('search_bar.choose')}} {{$t('search_bar.category')}}</option>
              <option v-for="category in getResult?.categories" :key="category.id" :value="category.id" >{{category.name}}</option>
            </select>
          </div>
        </div>
        <div class="input-wrap">
          <label for="Part Number">{{$t('search_bar.part_number')}}</label>
          <div class="input">
            <input 
              type="text"
              :placeholder="$t('search_bar.part_number_placeholder')"
              v-model="body.part_number"
            >
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="main-btn" @click="applySearch">
          {{$t('search_bar.apply')}}
        </button>
        <button class="main-btn reversed" @click="handleResetForm">
          {{$t('search_bar.reset')}}
        </button>
      </div>
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
  
  // define body
  const body = ref({
    keyword : "",
    category_type : "1",
    brand_id : "",
    model_id : "",
    manufacture_year_id : "",
    category_id : "",
    part_number : "",
  })



  // handle api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  // handle reset form 
  const handleResetForm = () => {
    body.value = {
      keyword : "",
      category_type : "1",
      brand_id : "",
      model_id : "",
      manufacture_year_id : "",
      category_id : "",
      part_number : "",
    }
  }

  const isSearched = ref(false)
  // handle apply search data 
  const applySearch = () => {
    let url = 'search';
    let firstParam = true; // Flag to check if it's the first query parameter

    Object.keys(body.value).forEach(key => {
        if (body.value[key] !== "") {
            url += `${firstParam ? '?' : '&'}${key}=${body.value[key]}`;
            firstParam = false; // After first param, set to false
        }
    });
    // url += `&device_id=${globalStore.device_id}`;
    getMethod(url, 1 , false, true);
    setTimeout(() => {
      getMethod('search-data' , '' , false , false)
    }, 500);
    globalStore.storeBrandFilteredData()
    globalStore.searchEndpoint = url
    isSearched.value = true;
    handleResetForm();
    setTimeout(() => {
      isSearched.value = false
    } , 500)
  };

  watchEffect(()=>{
    if(isSearched.value && getResult?.value){
      globalStore.storeSearchResult(getResult?.value)
      globalStore.storeBrandFilteredData()
      router.push(localeRoute('/products'))
      // isSearched.value = false
      // getMethod('search-data' , '' , false , false)
      // setTimeout(() => {
      //   isSearched.value = false
      // } , 100)
    }
  })

  onMounted(()=>{
    getMethod('search-data' , '' , false , false)
  })

</script>

<style lang="scss" scoped>
$maxWidth : unset;
  .search_bar{
    @include displayFlex($justify:space-between , $gap : 0);
    max-width: $maxWidth;
    width: 100%;
    background: rgb(#C9C9C9 , 0.2);
    padding:0 0px 0 10px;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
    .input{
      padding: 10px;
      border-bottom: unset;
      width: 200px;
      &:first-of-type{
        @include displayFlex($gap : 6px);
        width: 100%;
        i.pi.pi-search{
          color:$mainColor;
        }
      }
      &:last-of-type{
        padding-inline: 8px;
        border-right: 1px solid #9E9E9E;
        border-left: 1px solid #9E9E9E;
        min-width: 120px;
      }
      + button{
        padding-inline: 30px 20px;
        text-decoration: underline;
        color: $mainColor;
        &:hover{
          text-decoration: unset;
        }
      }
    }
    @media (max-width : 567px){
      flex-direction: column;
      padding-inline-start: 0;
      .input{
        border: unset !important;
        width: 100%;
        flex-grow: 1;
        &:last-of-type{
          border-top: 1px solid #9E9E9E !important;
          border-bottom: 1px solid #9E9E9E !important;
        }
        + button{
          padding-block: 10px;
          width: 100%;
          &:hover{
            background: $mainColor;
            color: #fff;
          }
        }
      }
    }
  }
  .filtered_inputs{
    max-width: $maxWidth;
    width: 100%;
    margin: 30px auto 0;
    .inputs{
      @include displayFlex($justify:space-between , $gap : 10px);
      margin-bottom: 20px;
      .input-wrap{
        // width: 100%;
        width: 200px;
      }
      @media (max-width:767px){
        flex-wrap: wrap;
        justify-content: flex-start;
        .input-wrap{
          flex-grow: 1;
        }
      }
    }
    .buttons{
      @include displayFlex($justify:flex-start);
      button.main-btn{
        max-width: 160px;
        height: 36px;
        border-radius: 4px;
        margin: 0 !important;
      }
    }
  }
</style>