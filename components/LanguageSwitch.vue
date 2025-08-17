<template>
  <div class="input">
    <ul class="languages-switch" :style="'direction: ' + locale.code === 'ar' ? 'rtl' : 'ltr'" >
      <NuxtLink :to="switchLocalePath(locale.code)" v-for="locale in availableLocales" :key="locale.code" @click="handleSwitchLanguage(locale.code)">
        <i class="pi pi-globe"></i>
        <span>{{ locale.name }}</span>
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup>
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()


  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
  })

  // define global store
  const globalStore = useGlobalStore()

  // define auth store
  const authStore = useAuthStore()

  // import submitForm functions
  const { submitMethod } = useApiMethods();


  const handleSwitchLanguage = (lang) => {
    globalStore.setLang(lang)
    if(authStore?.orderData){
      submitMethod(`change-lang?lang=${lang}` , true , '' , 'PATCH' , '')
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    width: fit-content;
    padding-inline-end: 15px;
    border-bottom: unset;
    .languages-switch {
      position: relative;
      width: fit-content;

      i.pi {
        position: absolute;
        inset-inline-end: -5px;
        top: 50%;
        transform: translateY(-50%);
        z-index: -1;
        color: $mainColor;
        font-size: 22px;
      }

      a {
        @include displayFlex($gap: 5px, $direction: row, $justify: flex-start);
        padding: 3px 5px;
        height: 30px;
        overflow: hidden;
        cursor: pointer;
        padding-inline-end: 20px;

        span {
          font-size: clamp(22px, 2.5vw, 30px);
        }
        &:hover{
          color: $mainColor;
        }
      }
    }
  }
</style>
