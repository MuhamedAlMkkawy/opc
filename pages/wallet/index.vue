<template>
    <section class="page wallet_page">
      <div class="container">
        <div class="content">
          <div class="image">
            <img src="/assets/images/wallet.png" alt="image" loading="lazy">
          </div>
          <div class="wallet_text">
            <h2>{{$t('wallet.title')}}</h2>
            <h3 class="title">
              {{$t('wallet.balance')}}
            </h3>
            <div class="charge">
              {{getResult?.balance}} {{$t('wallet.currency')}}
            </div>
            <button class="main-btn" @click="handleShowChargePopup">
              {{$t('wallet.recharge_btn')}}
            </button>
          </div>
        </div>
      </div>
      <RechargerPopup 
        v-if="showRechargerPopup"
        @handleShowChargePopup="handleShowChargePopup"
        @handleCharge="handleCharge"
      />
    </section>
</template>

<script setup>
  // handle api methods
  const { getMethod , getResult , submitMethod } = useApiMethods()
  // handle show charger popup
  const showRechargerPopup = ref(false)
  const handleShowChargePopup = () =>{
    showRechargerPopup.value = !showRechargerPopup.value
  }
  const handleCharge = (chargerBody) => {
    handleShowChargePopup()
    submitMethod('charge-wallet' , true , chargerBody , 'POST' , '' , 'show-wallet')
  }

  onMounted(()=>{
    getMethod('show-wallet' , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .page{
    .content{
      @include displayFlex($justify:space-between);
      .image{
        max-width: 50%;
      }
      .wallet_text{
        flex-grow: 1;
        h2{
          font-size: clamp(20px , 4vw , 28px);
          font-weight: 500;
          color: $mainColor;
        }
        h3.title{
          text-align: start;
          font-size: clamp(24px , 4vw , 32px);
          margin-bottom: 20px;
        }
        .charge{
          max-width: 700px;
          width: 100%;
          border-radius: 15px;
          background: rgb(#C9C9C9 , 20%);
          padding: 15px 25px;
          font-size: clamp(30px , 4vw , 74px);
          font-weight:700;
          color: $textColor;
          margin-bottom: 20px;
        }
      }
    }
    @media (max-width:676px){
      padding: 30px 0;
      .content{
        flex-direction: column;
        .image{
          max-width: 100%;
          height: 350px;
        }
        .wallet_text{
          width: 100%;
        }
      }
    }
  }
</style>