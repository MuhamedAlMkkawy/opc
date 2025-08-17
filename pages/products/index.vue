<template>
  <section class="page"> 
    <div class="container">
      <Searchbar v-if="globalStore.searchResults && data && !globalStore.brandFilteredData?.data" />
      <div class="categories_top">
        <CategoryBreadcrumb 
          v-if="!globalStore.brandFilteredData && !data && !globalStore.searchResults" 
        />
        <div class="breadcrumb" v-if="globalStore.searchResults && data && !globalStore.brandFilteredData">
          <h3 class="search_results">
            {{globalStore.lang == 'en' ? 'search results:' : 'نتائج البحث' }}
          </h3>
        </div>
        <BrandBreadcrumb v-if="globalStore.brandFilteredData" />
        <div class="breadcrumb filter_text" 
          v-if="!globalStore.brandFilteredData && !globalStore.searchResults && !data" 
          @click="handleShowFilterPopup"
        >
          <div class="image">
            <img src="/assets/images/filter.svg" alt="image" loading="lazy">
          </div>
          <h3>{{$t('static_texts.filter_results')}}</h3>
        </div>
      </div>
      <div class="orders categories_content" v-if="
        (getResult?.data?.length > 0 || 
        globalStore?.searchResults?.data?.length > 0 || 
        data?.data?.length > 0 ||
        globalStore?.brandFilteredData?.data?.length > 0)
      ">
        <ProductItem 
          :products="
            getResult?.data || 
            globalStore?.searchResults?.data || 
            data?.data ||
            globalStore?.brandFilteredData?.data
          "
        />
      </div>
      <Empty v-else />
      <Pagination 
        :data="getResult?.pagination ?? globalStore?.searchResults?.pagination ?? data?.pagination ?? globalStore.brandFilteredData?.pagination"
        :endPoint="endPoint"
      />
    </div>
    <ProductsFilterPopup 
      v-if="showFilterPopup"
      @handleShowFilterPopup="handleShowFilterPopup"
      @handleApplyFilter="handleApplyFilter"
    />
    <!-- {{ globalStore?.brandFilteredData?.data }} -->
  </section>
</template>

<script setup>
  // define stored research result data
  const data = ref()
  // define the data of the endpoint 
  const endPoint = ref()

  // define global store
  const globalStore = useGlobalStore()

  // handle filter popup
  const showFilterPopup = ref(false)

  const handleShowFilterPopup = () =>{
    showFilterPopup.value = !showFilterPopup.value
  }

  const handleApplyFilter = (filterData) => {
    handleShowFilterPopup()
    getMethod(`categories/${globalStore.productInfo.subcategory}/products?price_filter=${filterData.price_filter}&high_rate_sort=${filterData.high_rate_sort ? '1' : ''}` , false , true)
  }

  // define api methods 
  const{
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    if(!globalStore.brandFilteredData && !globalStore.searchResults && globalStore.productInfo.subcategory){
      // getMethod(`categories/${globalStore.productInfo.subcategory}/products` , false , false)
      getMethod(`categories/${globalStore.productInfo.subcategory}/products` , 1 , false , false)
      endPoint.value = `categories/${globalStore.productInfo.subcategory}/products` 
    }else if(globalStore.brandFilteredData){
      // endPoint.value = 
    }else if (globalStore.searchEndpoint){
      endPoint.value = globalStore.searchEndpoint
      data.value = JSON.parse(window?.sessionStorage?.getItem('searchResults'))
    }
  })
</script>

<style lang="scss" scoped>
  .categories_top{
    @include displayFlex($justify : space-between);
    .breadcrumb{
      @include displayFlex($gap : 4px);
      h3{
        font-size: clamp(16px , 4vw , 24px);
        font-weight: 500;
        margin: 0 ;
        &.colored{
          color: $mainColor;
        }
        &.search_results{
          margin-block-start: 30px;
        }
      }
      .image{
        max-width: 30px;
      }
      &.filter_text{
        cursor: pointer;
      }
    }
  }
  .categories_content{
    padding: clamp(20px , 4vw , 50px ) clamp(15px , 4vw , 30px );
    border-radius: 4px;
    background: rgba($color: $mainColor, $alpha: 0.1);
    margin-top: 30px;
    @include displayGrid();
    &.orders{
      .order_item{
        margin-bottom: 0;
      }
    }
  }
  .filtered_inputs{
    margin-bottom: 30px !important;
  }
</style>