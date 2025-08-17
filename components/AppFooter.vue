<template>
  <section class="footer">
    <div class="container">
      <div class="content">
        <div class="footer_tab">
          <div class="image logo">
            <img src="/assets/images/footer_logo.png" alt="image" loading="lazy">
          </div>
          <ul>
            <li v-for="item in getResult" :key="item.id">
              <a :href="item.link" class="image" target="_blank">
                <img :src="item.icon" alt="image" loading="lazy">
              </a>
            </li>
          </ul>
        </div>
        <ul class="footer_tab">
          <h4>{{ $t('footer.hyper_links') }}</h4>
          <li><NuxtLink :to="localeRoute({ name : 'home'})">{{ $t('footer.home') }}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute({ name : 'orders'})">{{ $t('footer.orders') }}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute({ name : 'cart'})">{{ $t('footer.cart') }}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute({ name : 'favourites'})">{{ $t('footer.favourites') }}</NuxtLink></li>
        </ul>
        <ul class="footer_tab">
          <li><NuxtLink :to="localeRoute({ name : 'contact'})">{{ $t('footer.contact_us') }}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute({ name : 'about'})">{{ $t('footer.about_us') }}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute({ name : 'faq'})">{{ $t('footer.faq') }}</NuxtLink></li>
        </ul>
        <ul class="footer_tab">
          <li><NuxtLink :to="localeRoute({ name : 'terms'})">{{ $t('footer.terms_conditions') }}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute({ name : 'complaints'})">{{ $t('footer.complaints_suggestions') }}</NuxtLink></li>
        </ul>

        <FooterBrands />
        <!-- <div class="footer_tab contact">
          <h4>Contact US</h4>
          <a :href="'https://wa.me/'+ 15236523" target="_blank">
            <i class="pi pi-whatsapp"></i>
            <span>+966123456789</span>
          </a>
          <NuxtLink to="/login" class="main-btn reversed">Login / Register</NuxtLink>
        </div> -->
        
      </div>
      <hr>
      <p class="copyright">
        {{$t('footer.copyright')}}
      </p>
    </div>
  </section>
</template>

<script setup>
  const localeRoute = useLocaleRoute();

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod('socials' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  .footer{
    background: #333333;
    color: #fff;
    box-shadow: 0px -3px 4px 0px #0000000D;
    padding-bottom: 20px;
    margin-top: 40px;
    .content{
      @include displayGrid();
      align-items: flex-end;
      h4{
        font-size: clamp(18px , 4vw , 32px);
        font-weight: 500;
        margin-bottom: 20px;
      }
      ul.footer_tab{
        li{
          a{
            font-size: clamp(18px, 4vw , 24px);
            font-weight: 400;
            position: relative;
            display: block;
            width: fit-content;
            &::after{
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              width: 0%;
              height: 1px;
              background: #fff;
              transition: 0.6s;
            }
            &::before{
              content: '';
              position: absolute;
              right: 0;
              top: 0;
              width: 0%;
              height: 1px;
              background: #fff;
              transition: 0.6s;
            }
            &:hover{
              &::before,
              &::after{
                width: 100%;
              }
            }
          }
        }
      }
      .footer_tab{
        .image.logo{
          max-width: 250px;
          + ul{
            @include displayFlex($gap : 32px);
            width: 227px;
            margin: 20px;
            li{
              a{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #5c5c5c;
                border: 1px solid transparent;
                @include displayFlex();
                transition: 1s;
                padding: 5px;
                i.pi{
                  color: #fff;
                  font-size: 20px;
                }
                img{
                  object-fit: contain;
                }
                &:hover{
                  background: #fff;
                  border-color: #5c5c5c;
                  i.pi{
                    color: #5c5c5c;
                  }
                }
              }
            }
          }
        }        
        &.contact{
          // align-self: flex-end;
          a{
            @include displayFlex($justify : flex-start , $gap : 8px);
            margin-block: 15px 0px;
            i.pi{
              font-size: 20px;
              width: 30px;
              height: 30px;
              border-radius: 4px;
              background: #3DB854;
              color: #000;
              padding: 15px;
              border: 1px solid transparent;
              @include displayFlex();
            }
            font-size: clamp(18px , 4vw , 24px);
            &:hover{
              i.pi{
                border-color: #3DB854;
                background: #fff;
                color: #3DB854;
              }
            }
          }
          .main-btn.reversed{
            background: transparent;
            font-size: clamp(20px ,4vw , 28px);
            @include displayFlex();
            margin-block: 0;
          }
        }
      }
    }
    hr{
      max-width: 767px;
      margin: 30px auto 15px;
      background: #c9c9c98a;
    }
    p.copyright{
      font-size: clamp(14px , 4vw , 20px);
      font-weight: 500;
      color: $mainColor;
      text-align:center;
      margin-bottom: 0;
    }
  }
</style>