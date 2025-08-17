<template>
  <section class="page"> 
    <div class="container">
      <div class="categories_top">
        <CategoryBreadcrumb />
        <div class="breadcrumb filter_text" @click="handleShowSubCategoryFilterPopup">
          <div class="image">
            <img src="/assets/images/filter.svg" alt="image" loading="lazy">
          </div>
          <h3>{{$t('static_texts.filter_results')}}</h3>
        </div>
      </div>
      <div class="page">
        <div class="categories_content" v-if="subCategories?.length > 0">
          <div class="category" v-for="category in subCategories" :key="category.id">
            <div class="info">
              <div class="image">
                <img :src="category.image" alt="image" loading="lazy">
              </div>
              <h4>{{category.name}}</h4>
            </div>
            <hr>
            <NuxtLink 
              @click="globalStore.storeProductInfo(route.params.id , category.id)"
              :to="localeRoute('/products')">
              <span>{{$t('categories.view_product')}}</span>
              <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
            </NuxtLink>
          </div>
        </div>
        <Empty v-else />
      </div>
    </div>
    <SubCategoryFilterPopup 
      v-if="showSubCategoryFilterPopup"
      :subCategories = "getResult"
      @handleShowSubCategoryFilterPopup="handleShowSubCategoryFilterPopup"
      @handleApplySubCategoryFilterPopup="handleApplySubCategoryFilterPopup"
    />
  </section>
</template>

<script setup>
  // define route 
  const route = useRoute()

  // define locale route
  const localeRoute = useLocaleRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define sub categories
  const subCategories = ref()

  const subCategoryId = ref('')

  // handle filter popup
  const showSubCategoryFilterPopup = ref(false)

  const handleShowSubCategoryFilterPopup = () =>{
    showSubCategoryFilterPopup.value = !showSubCategoryFilterPopup.value
  }

  const handleApplySubCategoryFilterPopup = (id) => {
    subCategoryId.value = id
    handleShowSubCategoryFilterPopup()
  }


  // define api methods
  const{
    getMethod,
    getResult
  } = useApiMethods()


  watchEffect(() => {
    if (getResult?.value?.length > 0 && !subCategoryId.value) {
      subCategories.value = getResult?.value
    }else if(subCategoryId.value){
      subCategories.value = getResult?.value?.filter((item) => item.id == subCategoryId.value)
    }
  })


  onMounted(() => {
    // empty brand_id to sure not to conflict in products page
    globalStore.brand_data = ''
    globalStore.storeBrandFilteredData()
    globalStore.storeSearchResult()
    getMethod(`categories/${route.params.id}`, 1 , false, false)
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
        &.colored{
          color: $mainColor;
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
    // @include displayGrid();

  }
</style>