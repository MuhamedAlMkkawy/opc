<template>
  <div class="page">
    <div class="container">
      <h3 class="title centered">{{$t('product_details_page.product_details')}}</h3>
      <div class="product_content bg_colored">
        <div class="info">
          <div class="item_row">
            <h3>{{ getResult?.name }}</h3>
            <div class="tab">
              <div class="status">{{getResult?.is_available ? $t('product_details_page.available') : $t('product_details_page.not_available')}}</div>
              <div class="rate">
                <span>{{ getResult?.rates_average }}</span>
                <i class="pi pi-star-fill"></i>
              </div>
              <button 
                :class="['favourite ' , getResult?.is_favourite ? 'active' : '']"
                @click="handleSwitchFavouriteProduct"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="38" viewBox="0 0 42 38" fill="none">
                  <path d="M21.9134 35.7991C21.2651 36.0289 20.1973 36.0289 19.5491 35.7991C14.0196 33.9028 1.66406 25.9921 1.66406 12.5842C1.66406 6.66551 6.41179 1.87695 12.2654 1.87695C15.7356 1.87695 18.8054 3.56253 20.7312 6.1675C22.657 3.56253 25.7459 1.87695 29.197 1.87695C35.0507 1.87695 39.7984 6.66551 39.7984 12.5842C39.7984 25.9921 27.4429 33.9028 21.9134 35.7991Z" stroke-width="2.86007" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="item_row">
            <span>{{$t('product_details_page.product_type')}} {{getResult?.type_text }}</span>
            <div class="tab">
              <span>{{$t('product_details_page.part_number')}} {{ getResult?.part_number }}</span>
            </div>
          </div>
          <div class="item_row">
            <span v-if="getResult?.minimum_quantity">{{$t('product_details_page.minimum_quantity')}} : {{getResult?.minimum_quantity}}</span>
            <div class="tab price">
              <span v-if="getResult?.price_after_discount > 0"><small>{{$t('product_details_page.price_label')}}</small> {{getResult?.price_after_discount}} {{getResult?.currency}}</span>
              <del v-if="getResult?.price_after_discount > 0">{{getResult?.price}} {{getResult?.currency}}</del>
              <span v-else>{{getResult?.price}} {{getResult?.currency}}</span>
            </div>
          </div>
          <hr>
          <div class="row_item category_info">
            <div class="product_info">
              <div class="image">
                <img :src="getResult?.category_image" alt="image" loading="lazy">
              </div>
              <h6>{{getResult?.category_name}}</h6>
            </div>
            <button class="share_btn image" @click="handleShowSocialMediaPopup">
              <img src="/assets/images/share_icon.svg" alt="image" loading="lazy">
            </button>
          </div>
        </div>
        <ProductSlider 
          :images="getResult?.images"
        />
      </div>
      <div class="bg_colored">
        <div class="product_characteristics">
          <h4 class="title" v-if="getResult?.is_variant">{{$t('product_details_page.product_characteristics')}}</h4>
          <div class="input-wrap" v-if="getResult?.is_variant">
            <label for="characteristics">{{$t('product_details_page.choose_characteristics')}}</label>
            <div class="input">
              <select 
                name="characteristics" 
                id="characteristics"
                v-model="body.variant_id"
                @change="body.quantity = 1"
              >
                <option value="">{{$t('product_details_page.choose_characteristics')}}</option>
                <option
                  v-for="variant in getResult?.variants"
                  :key="variant?.id" 
                  :value="variant?.id"
                >{{variant?.name}}</option>
              </select>
              <div class="characteristics_status" v-if="body?.variant_id" >
                <div class="icon active">
                  <i class="pi pi-check"></i>
                  <!-- <i class="pi pi-times"></i> -->
                </div>
                <h6 
                  v-for="variant in getResult?.variants.filter((variant) => variant.id == body.variant_id)" 
                  :key="variant?.id"
                  >{{variant?.available_quantity}} {{$t('product_details_page.available')}}</h6>
              </div>
            </div>
          </div>
          <div class="form" style="margin-bottom: 0;">
            <div class="counter">
              <button :class="['main-btn' , {'disabled' : body.quantity <= 1}]"  @click="body.quantity-=1">
                <i class="pi pi-minus"></i>
              </button>
              <span>{{ body?.quantity }}</span>
              <button 
                :class="['main-btn' , {'disabled' : body.quantity >= getResult?.variants.filter((variant) => variant.id == body.variant_id)[0]?.available_quantity}]" 
                @click="body.quantity+=1"
              >
                <i class="pi pi-plus"></i>
              </button>
              <div class="characteristics_status" style="margin-inline-start: 10px;" v-if="!getResult?.is_variant">
                <div class="icon active">
                  <i class="pi pi-check"></i>
                  <!-- <i class="pi pi-times"></i> -->
                </div>
                <h6 
                  v-for="variant in getResult?.variants.filter((variant) => variant.id == body.variant_id)" 
                  :key="variant.id"
                  >{{variant.available_quantity}} {{$t('product_details_page.available')}}</h6>
              </div>
            </div>
            <button :class="['main-btn' , {'disabled' : getResult?.is_variant && !body.variant_id}]"
            @click="handleAddToCart">
            <!-- :style="{'margin-top' : !getResult?.is_variant ? '20px' : '0'}" -->
              {{$t('product_details_page.add_to_cart')}}
            </button>
          </div>
        </div>
      </div>
      <div class="bg_colored">
        <div class="about_product">
          <div class="header_tabs">
            <button 
              @click="activeTab = 'details'" 
              :class="['tab', { active: activeTab == 'details' }]"
            >
              {{$t('product_details_page.product_details_tab')}}
            </button>
            <button 
              @click="activeTab = 'feedbacks'" 
              :class="['tab', { active: activeTab == 'feedbacks' }]"
            >
              {{$t('product_details_page.product_feedbacks_tab')}}
            </button>
          </div>

          <div class="tab_content">
            <p v-if="activeTab == 'details'">
              {{ getResult?.description }}  
            </p>
            <Feedbacks 
              v-else
            />
          </div>
        </div>
      </div>
      <div class="bg_colored">
        <div class="similar_proucts">
          <SimilarProductsSlider 
            :products="getResult?.similar_products"
          />
        </div>
      </div>
    </div>
    <AddToCartPopup 
      v-if="showAddToCart"
    />
    <SocialMediaPopup
      v-if="showSocialMediaPopup"
      @handleShowSocialMediaPopup="handleShowSocialMediaPopup"
    />
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    submitResult
  } = useApiMethods()

  // define body
  const body = ref({
    variant_id : '', 
    quantity : 1
  })

  // define route 
  const route = useRoute()

  // define global store
  const globalStore = useGlobalStore()

  // handle active tab in product 
  const activeTab = ref('details')


  // handle show add to cart popup
  const showAddToCart = ref(false)
  const handleShowAddToCartPopup = () =>{
    showAddToCart.value = !showAddToCart.value
  }

  const handleAddToCart = () => {
    if(useAuthStore().userData){
      submitMethod('carts' , true , body.value , 'POST' , '' , '')
    }else{
      globalStore.handleShowLoginPopup()
    }
  }

  watchEffect(() =>{
    if(submitResult?.value?.endPoint == 'carts' &&submitResult?.value?.data?.key == 'success'){
      handleShowAddToCartPopup()
    }
    if(getResult?.value){
      body.value.variant_id = getResult?.value?.default_variant_id
    }
  })


  // handle social media popup
  const showSocialMediaPopup = ref(false)
  const handleShowSocialMediaPopup = () =>{
    showSocialMediaPopup.value = !showSocialMediaPopup.value
  }

  // definePageMeta({
  //   auth: false // Custom flag to skip auth
  // })
  

  // handle switch favourite of product
  const handleSwitchFavouriteProduct = () => {
    if(useCookie('authStore')?.value){
      const productForm = new FormData()
      productForm.append('device_id' , globalStore.device_id)
      productForm.append('user_type' , globalStore.userType)
      productForm.append('product_id' , route.params.id)
      submitMethod('toggle-favourite' , true , productForm , 'POST' , '' , `products/${route.params.id}/show`)
    }else{
      globalStore.handleShowLoginPopup()
    }
  }

  onMounted(()=>{
    getMethod(`products/${route.params.id}/show`, '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .bg_colored{
    &:not(:last-of-type){
      margin-bottom: 30px;
    }
  }
  .page{
    padding-top: 30px;
  }
  h3.title{
    margin-top: 0;
  }
  .product_content{
    display: grid;
    grid-template-columns: 60% 39%;
    justify-content: space-between;
    .info{
      border-radius: 8px;
      border: 2px solid transparent;
      background: #fff;
      padding: clamp(15px , 4vw , 25px) 8px;
      .item_row{
        @include displayFlex($justify : space-between);
        width: 100%;
        margin-bottom: 25px;
        h3{
          font-size: 24px;
          font-weight: 500;
          color: #333333;
        }
        .tab{
          @include displayFlex($gap : 10px , $align : stretch);
          width: 230px;
          margin-inline-start: auto;
          justify-content: flex-end;
          flex-grow: 1;
          span{
            color: #333333 !important;
            font-weight: 400 !important;
          }
          .status{
            padding: 10px 15px;
            font-size: clamp(14px , 4vw , 20px);
            font-weight: 500;
            color: $mainColor;
            background: rgba($color: $mainColor, $alpha: 0.1);
            border-radius: 4px;
          }
          .rate{
            background:rgba($color: #C9C9C9, $alpha: 0.25);
            border-radius: 6px;
            padding: 8px 10px;
            span{
              font-size: 24px;
              font-weight: 400;
              color: #1F1F1F;
            }
            i.pi{
              color: #ffc107;
            }
          }
          button.favourite{
            width: 50px;
            height: 50px;
            border: 0.57px solid #9E9E9E80;
            border-radius: 6px;
            @include displayFlex();
            transition: 0.6s;
            padding: 6px;
            svg{
              stroke: $secColor;
            }
            &:hover, 
            &.active{
              box-shadow: 0px 4.58px 4.58px 0px #00000026;
              background: rgba($color: $secColor, $alpha: 0.3);
              border-color: transparent;
              svg{
                fill: $secColor;
              }
            }
          }
        }
        &:nth-of-type(2){
          span{
            font-size: clamp(16px , 4vw , 20px);
            font-weight: 500;
            &:first-of-type{
              color: $thirdColor;
            }
          }
        }
        &:nth-of-type(3){
          span{
            font-size: clamp(16px , 4vw , 20px);
            font-weight: 400;
            &:first-of-type{
              color: $mainColor;
            }
          }
          .price{
            justify-content:flex-start;
            align-items: flex-end;
            span{
              font-size: clamp(16px , 4vw , 22px);
              font-weight: 500 !important;
              small{
                font-size: 16px;
              }
            }
            del{
              font-size: clamp(14px , 4vw , 16px);
              font-weight: 400;
              color: #9E9E9E;
            }
          }
        }
        @media (max-width : 767px){
          flex-wrap: wrap;
          justify-content: center;
          .tab{
            justify-content: center;
            width: 100%;
            .status{
              @include displayFlex();
              padding: 0 15px;
            }
          }
        }
      }
      .category_info{
        margin-block:25px 0px;
        @include displayFlex($justify:space-between,$gap : 10px);
        .product_info{
          @include displayFlex($justify:flex-start,$gap : 10px);
          .image{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
          }
          h6{
            font-size: clamp(18px , 4vw , 22px);
            font-weight: 500;
          }
        }
        .share_btn{
          width: 60px;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #9E9E9E;
          transition: 0.3s;
          box-shadow: 0px 2.8px 2.8px 0px #0000000D;
          img{
            transition: 0.3s;
          }
          &:hover{
            background: #9E9E9E;
            box-shadow: unset;
            img{
              filter: brightness(0)invert(1);
            }
          }
        }
      }
    }
    @media (max-width : 1200px){
      @include displayFlex($direction : column-reverse , $align : stretch);
    }
  }
  .product_characteristics{
    background: #fff;
    border: 2px solid #F8F8FF;
    border-radius: 8px;
    padding: 12px clamp(10px , 4vw , 30px);
    h4{
      font-size: clamp(18px , 4vw , 22px);
      font-weight: 500;
    }
    .input-wrap{
      max-width: 867px;
      margin: 30px auto 15px;
      label{
        font-size: clamp(14px , 4vw , 20px);
        font-weight: 500;
        color: #333333;
      }
      .input{
        color: #9E9E9E;
        font-size: 18px;
        font-weight: 400;
        border-bottom: unset;
        @include displayFlex();
        width: 100%;
        select{
          border-bottom : 2px solid #F8F8FF;
        }

        @media (max-width : 567px){
          flex-wrap : wrap
        }
      }
    }
    .form{
      max-width: 600px;
      margin: 0px auto 15px;
      @include displayFlex($direction : row-reverse , $justify : flex-start);
      .main-btn{
        // max-width: 600px;
        margin: 0;
        // pointer-events: revert;
        // background: $mainColor;
      }
    }
    .counter{
      @include displayFlex($gap : 8px);
      // margin-bottom: 20px;
      button{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0;
      }
      span{
        font-size: clamp(16px , 4vw , 22px);
      }
    }
  }
  .about_product{
    padding: 20px 15px;
    background: #fff;
    border-radius: 8px;
    border: 2px solid #F8F8FF;
    .header_tabs{
      @include displayFlex($justify : flex-start);
      border-bottom: 1px solid #CBCBCB;
      margin-bottom: 15px;
      .tab{
        font-size: clamp(16px , 4vw , 20px);
        font-weight: 500;
        padding-bottom: 15px;
        border-bottom: 2px solid transparent;
        &.active,
        &:hover{
          color: $mainColor;
          border-bottom: 2px solid $mainColor;
        } 
      }
    }
    .tab_content{
      p{
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  .characteristics_status{
    @include displayFlex($gap : 5px);
    .icon{
      width: 20px;
      height: 20px;
      border-radius: 4px;
      padding: 5px;
      background: $secColor;
      @include displayFlex();
      color: #fff;
      .pi{
        font-size: 12px;
      }
      + h6{
        font-size: clamp(16px, 4vw , 20px);
        text-wrap: nowrap;
        color: $secColor;
      }
      &.active{
        border-radius: 50%;
        background: $mainColor; 
        + h6{
          color: $mainColor;
        }
      }
    }
  }
  .similar_proucts{
    background: #fff;
    border-radius: 8px;
    padding: 10px 15px;
  }
</style>