<template>
  <div>
    <div class="float_btns">
      <NuxtLink to="/contact" class="contact"><i class="pi pi-headphones"></i></NuxtLink>
      <NuxtLink :to="'https://wa.me/' + 966521235" target="_blank" class="phone"><i class="pi pi-whatsapp"></i></NuxtLink>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .float_btns{
    @include displayFlex($direction : column , $gap : 30px);
    position: fixed;
    inset-inline-end: 20px;
    bottom: 50px;
    z-index: 99;
    a{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      @include displayFlex();
      border: 1px solid transparent;
      animation: pulse 1s infinite alternate-reverse;
      i.pi{
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }
      &.contact{
        background-color: $thirdColor;
        --pulse-color: rgba(241, 139, 55, 0.613) !important;
        &:hover{
          border-color: $thirdColor;
          background: #fff;
          i.pi{
            color: $thirdColor;
          }
        }
      }
      &.phone{
        background-color: $mainColor;
        --pulse-color: rgb(58 158 77 / 63%) !important;
        &:hover{
          border-color: $mainColor;
          background: #fff;
          i.pi{
            color: $mainColor;
          }
        }
      }
    }
  }
</style>