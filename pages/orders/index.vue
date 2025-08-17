<template>
  <section class="page">
    <div class="container">
      <h3 class="title centered">
        {{ $t('orders_page.title') }}
      </h3>
      <ul class="order_tabs">
        <li
          v-if="globalStore.userType == 1"
          :class="{active : orderStatus == 'new'}" 
          @click="handlefetchOrderStatus('new')">{{ $t('orders_page.new') }}</li>
        <li 
          :class="{active : orderStatus == 'on-payments'}" 
          @click="handlefetchOrderStatus('on-payments')">{{ $t('orders_page.on_payments') }}</li>
        <li 
          :class="{active : orderStatus == 'current'}" 
          @click="handlefetchOrderStatus('current')">{{ $t('orders_page.current') }}</li>
        <li 
          :class="{active : orderStatus == 'finished'}" 
          @click="handlefetchOrderStatus('finished')">{{ $t('orders_page.finished') }}</li>
        <li 
          :class="{active : orderStatus == 'cancelled'}" 
          @click="handlefetchOrderStatus('cancelled')">{{ $t('orders_page.canceled') }}</li>
      </ul>
      <div class="content">
        <div class="orders" v-if="getResult?.data?.length > 0">
          <div class="order_tab" v-for="item in getResult?.data" :key="item.id">
            <div class="image">
              <img :src="item.logo" alt="image" loading="lazy">
            </div>
            <div class="order_info">
              <div class="top row">
                <h3>{{$t('orders_page.order_name')}} #{{item.order_num}}</h3>
                <p>{{item.date}}</p>
              </div>
              <div class="bottom row">
                <h3>{{item.status_text}}</h3>
                <NuxtLink :to="'orders/' + item.id">
                  {{ $t('orders_page.order_details') }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <Pagination 
            :data="getResult?.pagination"
            :endPoint="`orders/${orderStatus}`"
          />
        </div>
        <Empty v-else />
        <ol class="order_statuses">
          <li
            v-if="globalStore.userType == 1"
            :class="{active : orderStatus == 'new'}" 
            @click="handlefetchOrderStatus('new')">
            <h6>{{ $t('orders_page.new') }}</h6>
            <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
          </li>
          <li
            :class="{active : orderStatus == 'on-payments'}" 
            @click="handlefetchOrderStatus('on-payments')">
            <h6>{{ $t('orders_page.on_payments') }}</h6>
            <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
          </li>
          <li
            :class="{active : orderStatus == 'current'}"
            @click="handlefetchOrderStatus('current')">
            <h6>{{ $t('orders_page.current') }}</h6>
            <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
          </li>
          <li
            :class="{active : orderStatus == 'finished'}"
            @click="handlefetchOrderStatus('finished')">
            <h6>{{ $t('orders_page.finished') }}</h6>
            <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
          </li>
          <li @click="handlefetchOrderStatus('cancelled')"
            :class="{active : orderStatus == 'cancelled'}">
            <h6>{{ $t('orders_page.canceled') }}</h6>
            <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()


  // define api methods 
  const {
    getMethod,
    getResult
  } = useApiMethods()


  // handle fetch orders based on status
  const orderStatus = ref()
  const handlefetchOrderStatus = (status) => {
    orderStatus.value = status
    getMethod(`orders/${status}` , 1 , true , true)
  }


  onMounted(()=>{
    getMethod(`orders/${globalStore.userType == 1 ? 'new' : 'on-payments'}` , 1 , true , false)
    orderStatus.value = globalStore?.userType == 1 ? 'new' : 'on-payments'
  })
</script>

<style lang="scss" scoped>
  h3.title.centered{
    color: $mainColor;
    font-size: clamp(20px , 4vw , 26px);
  }
  .order_tabs{
    @include displayFlex($gap:clamp(10px , 4vw , 20px));
    margin-top: 15px;
    margin-bottom: clamp(25px,  4vw , 52px);
    li{
      background: rgba(#C9C9C9 , 0.3);
      border-radius: 10px;
      flex-grow: 1;
      font-size: clamp(14px , 4vw , 24px);
      @include displayFlex();
      height: 70px;
      font-weight: 500;
      transition: 0.3s;
      cursor: pointer;
      padding-inline: 5px;
      &:hover,
      &.active{
        background: $mainColor;
        color: #fff;
      }
      &:last-of-type{
        &:hover , 
        &.active{
          background: $secColor;
          color: #fff;
        }
      }
    }
    @media (max-width : 567px){
      flex-wrap: wrap;
      li{
        width: 120px;
      }
    }
  }

  .content{
    display: grid;
    grid-template-columns: 75% 24%;
    justify-content: space-between;
    align-items: flex-start;
    .orders{
      background: rgba($mainColor , 0.1);
      padding: clamp(14px , 4vw , 20px);
      flex-grow: 1;
      .order_tab{
        @include displayFlex($justify : flex-start , $align : stretch);
        background: #fff;
        padding: 14px clamp(8px , 4vw , 18px);
        border-radius: 8px;
        &:not(:last-of-type){
          margin-bottom: 20px;
        }
        .image{
          max-width: 150px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid $mainColor;
          border-radius: 8px;
          padding: 8px;
          img{
            object-fit: contain;
          }
        }
        .order_info{
          flex-grow: 1;
          padding-block: clamp(8px , 4vw , 14px);
          @include displayFlex($direction : column , $align : flex-start , $justify : space-between);
          .row{
            @include displayFlex($justify : space-between , $align : space-between);
            width: 100%;
            h3{
              font-size: clamp(14px , 4vw  , 24px);
            }
            p{
              font-size: clamp(14px , 4vw , 20px);
            }
            a{
              font-size: clamp(14px , 4vw , 20px);
              color: $mainColor;
              text-decoration: underline;
              &:hover{
                text-decoration: none;
              }
            }
            &:last-of-type{
              h3{
                color: #9E9E9E;
                font-weight: 400;
              }
            }
          }
        }
        @media (max-width : 676px){
          flex-wrap: wrap;
          .image{
            max-width: 100%;
            width: 100%;
            height: 200px;
          }
          .order_info{
            padding-block: 0;
          }
        }
      }
    }
    ol.order_statuses{
      border: 2px solid #F8F8FF;
      border-radius: 4px;
      padding: 8px 12px;
      li{
        @include displayFlex($justify : space-between);
        height: 45px;
        cursor: pointer;
        &:not(:last-of-type){
          border-bottom: 1px solid #F8F8FF;
        }
        &:hover ,
        &.active{
          color: $mainColor;
        }
        &:last-of-type{
          &:hover,
          &.active{
            color: $secColor;
          }
        }
      }
    }
    @media (max-width : 910px){
      @include displayFlex();
      ol.order_statuses{
        display: none;
      }
    }
  }
</style>