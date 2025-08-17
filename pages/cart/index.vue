<template>
  <div class="page cart_page">
    <!-- {{ getResult }} -->
    <div class="container" v-if="getResult?.length > 0 ">
      <div class="content">
        <div class="order_item" v-for="item in getResult" :key="item.id">
          <div class="order_info">
            <div class="image">
              <img :src="item.image" alt="Order Item Image" loading="lazy" />
            </div>
            <div class="order_text">
              <h3>{{ item.product_name }}</h3>
              <div class="price">
                <h4 v-if="item?.is_variant">{{item.price_after_discount}} {{item.currency}}</h4>
                <del v-if="item?.is_variant">{{item.price}} {{item.currency}}</del>
                <h4 v-else>{{item.price}} {{item.currency}}</h4>
              </div>
              <ul class="themes">
                <li v-if="item.variant_name">
                  {{ item.variant_name }}
                </li>
              </ul>
              <p>
                {{item.product_description}}
              </p>
            </div>
          </div>
          <div class="order_control">
            <button class="pi pi-trash" @click="handleDeleteItem(item.id)"></button>
            <div class="control_count">
              <h6>{{ $t('cart.update_text') }}</h6>
              <div class="buttons">
                <button 
                  :class="['pi pi-minus' , {'disabled' : item.quantity == 1}]" 
                  @click="updateItemCount(item.id , +item.quantity-1)"
                ></button>
                {{item.quantity}}
                <button 
                  class="pi pi-plus"
                  @click="updateItemCount(item.id , +item.quantity+1)"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content order_notes">
        <h4>{{ $t('cart.order_notes') }}</h4>
        <hr />
        <div class="input">
          <textarea 
            :placeholder="$t('cart.order_notes_placeholder')"
            @blur="globalStore.orderData.notes = $event.target.value"  
          ></textarea>
        </div>
      </div>
      <NuxtLink :to="localeRoute('/delivery_way')" class="main-btn">
        {{ $t('cart.submit_btn') }}
      </NuxtLink>
    </div>
    <Empty v-else />
  </div>
</template>


<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define api mthods
  const {
    getMethod,
    getResult,
    submitMethod
  } = useApiMethods()


  // define locale route
  const localeRoute = useLocaleRoute()

    // handle update item count
  const updateItemCount = (itemID , itemCount) => {
    submitMethod(`carts/${itemID}/update?_method=put&quantity=${itemCount}` , true , '' , 'POST' , '' , 'carts')
  }

  // handle delete from cart
  const handleDeleteItem = (itemID) => {
    submitMethod(`carts/${itemID}/delete?user_type=${globalStore.userType}` , true , '' , 'DELETE' , '' , 'carts')
  }

  onMounted(()=>{
    globalStore.orderData.notes = ''
    getMethod('carts' , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .cart_page{
    .container{
      text-align: center;
    }
    .content{
      border: 2px solid #C9C9C9;
      border-radius: 8px;
      padding: clamp(15px , 4vw , 30px) clamp(8px , 4vw , 24px);
      text-align: start;
      .order_item{
        @include displayFlex($justify:space-between , $align : stretch);
        position: relative;
        &:not(:last-of-type){
          margin-bottom: 20px
        }
        .order_info{
          @include displayFlex($align : center);
          max-width: 800px;
          position: relative;
          .image{
            width: 300px;
            height: 158px;
            border-radius: 4px;
            overflow: hidden;
            // @media (max-width : 991px){
            //   max-width: 300px;
            //   width: 100%;
            //   height: 150px;
            // }
            @media (max-width : 450px){
              max-width: 100%;
              width: 100%;
              height: 150px;
            }
          }
          .order_text{
            h3{
              font-size: clamp(18px , 4vw ,28px);
              font-weight: 400;
              // margin-bottom: clamp(10px , 4vw , 15px);
            }
            .price{
              @include displayFlex($justify:flex-start);
              margin-block: 10px ;
              h4{
                font-size: clamp(20px , 4vw , 28px);
                font-weight: 500;
                text-wrap: nowrap;
              }
              del{
                font-size: clamp(18px , 4vw , 24px);
                color: grey;
                text-wrap: nowrap;
              }
            }
            ul.themes{
              @include displayFlex($justify : flex-start , $gap : 10px);
              li{
                font-size: clamp(14px , 4vw , 18px);
                font-weight: 500;
                color: rgb(#333333 , 0.8);
              }
            }
            p{
              font-size: clamp(14px , 4vw , 18px);
              font-weight: 400;
              color: rgb(#333333 , 0.8);
              line-height: 1.6;
            }
          }
          @media (max-width : 991px){
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
        }
        .order_control{
          @include displayFlex($direction : column , $align : flex-end , $justify:space-between);
          padding-block: 30px;
          button.pi-trash{
            width: 30px;
            height: 30px;
            background: rgb($secColor , 0.3);
            color: $secColor;
            border-radius: 5px;
            border: 1px solid transparent;
            &:hover{
              background: $secColor;
              color: #fff;
              border-color: $secColor;
            }
          }
          .control_count{
            @include displayFlex();
            h6{
              font-size: 16px;
              font-weight: 500;
              color: $mainColor;
              text-decoration: underline;
              text-wrap: nowrap;
              @media (max-width : 485px){
                display: none;
              }
            }
            .buttons{
              @include displayFlex($gap : 8px);
              button.pi{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: $mainColor;
                color: #fff;
                border: 1px solid;
                &.disabled{
                  background:grey;
                  color: #fff;
                  pointer-events: none;
                  border-color: grey;
                }
                &:hover{
                  background: #fff;
                  border-color: $mainColor;
                  color: $mainColor;
                }
              }
            }
            @media (max-width : 991px){
              justify-content: flex-start;
              position: absolute;
              inset-inline-end: 50px;
            }
            @media (max-width : 500px){
              flex-direction: row;
              position: static;
              // inset-inline-end: 35px;
            }
          }
          @media (max-width : 450px){
            flex-direction: row-reverse;
            position: static;
            padding: 0;
          }
        }
        @media (max-width : 450px){
          flex-direction: column;
        }
      }
      &.order_notes{
        margin-block: 30px;
        h4{
          margin-bottom: 10px;
        }
        .input{
          border-bottom: unset;
          textarea{
            margin-block: 10px 30px;
          }
        }
      }
    }
    .main-btn{
      max-width: 700px;
      margin: 0 auto 30px;
    }
  }
</style>