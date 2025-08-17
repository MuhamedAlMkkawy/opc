<template>
  <div>
    <div class="map">
      <div class="container">
        <div class="image">
          <img src="/assets/images/background.jpg" alt="image" loading="lazy">
        </div>
        <div class="location_info">
          <form action="">
            <div class="input-wrap">
              <label for="address_title">{{ $t('select_location.title') }}</label>
              <div class="input">
                <input 
                  id="address_title"
                  type="text"
                  :placeholder="$t('select_location.title_placeholder')"
                >
              </div>
            </div>
            <div class="input-wrap">
              <label for="address_details">{{ $t('select_location.details') }}</label>
              <div class="input">
                <input 
                  id="address_details"
                  type="text"
                  :placeholder="$t('select_location.details_placeholder')"
                >
              </div>
            </div>
          </form>
          <button class="main-btn" @click="handleSubmit">
            {{ $t('static_texts.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define router 
  const router = useRouter()

  // define local route 
  const localeRoute = useLocaleRoute()

  // define submit function
  const handleSubmit = () => {
    router.push(localeRoute('/current_location'))
  }
</script>

<style lang="scss" scoped>
  .map{
    .image{
      height: 400px;
    }
    .location_info{
      background: rgb($mainColor , 0.1);
      border-radius: 4px;
      margin-top: 40px;
      padding:clamp(20px , 4vw  , 35px) clamp(15px , 4vw  , 30px);
      margin-bottom: 30px;
      form{
        @include displayFlex($gap : clamp(20px , 4vw , 80px));
        .input-wrap{
          flex-grow: 1;
        }
        + .main-btn{
          max-width: 700px;
          width: 100%;
          margin: 40px auto 0;
          @include displayFlex();
        }
      }
    }
  }
</style>