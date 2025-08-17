<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowSocialMediaPopup')"></button>
      <div class="social-share">
        <SocialShare network="facebook" :url="url" title="Check this out!" class="share-btn facebook">
          <i class="pi pi-facebook"></i>
        </SocialShare>
        <SocialShare network="twitter" :url="url" title="Check this out!" hashtags="example,nuxt,social" class="share-btn twitter">
          <i class="pi pi-twitter"></i>
        </SocialShare>
        <SocialShare network="linkedin" :url="url" title="Check this out!" class="share-btn linkedin">
          <i class="pi pi-linkedin"></i>
        </SocialShare>
        <SocialShare network="whatsapp" :url="url" title="Check this out!" class="share-btn whatsapp">
          <i class="pi pi-whatsapp"></i>
        </SocialShare>
        <SocialShare network="telegram" :url="url" title="Check this out!" class="share-btn telegram">
          <i class="pi pi-telegram"></i>
        </SocialShare>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define route
  const route = useRoute()

  // defineEmits 
  const emit = defineEmits(['handleShowSocialMediaPopup'])

  const url = `https://opc.aait-sa.com${route.path}`; // Replace with the URL you want to share

</script>

<style lang="scss" scoped>
  .social-share {
    display: flex;
    gap: 10px;
    justify-content: center;
    // margin-top: 20px;
  }

  .share-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    transition: background-color 0.3s;
    text-align: center;
    @include displayFlex();
    i.pi{
      font-size: 20px;
    }
  }

  .facebook {
    background-color: #1877f2; /* Facebook blue */
  }

  .facebook:hover {
    background-color: #145dbf;
  }

  .twitter {
    background-color: #1da1f2; /* Twitter blue */
  }

  .twitter:hover {
    background-color: #0d8be0;
  }

  .linkedin {
    background-color: #0077b5; /* LinkedIn blue */
  }

  .linkedin:hover {
    background-color: #005582;
  }

  .whatsapp {
    background-color: #25d366; /* WhatsApp green */
  }

  .whatsapp:hover {
    background-color: #1ac04e;
  }

  .telegram {
    background-color: #0088cc; /* Telegram blue */
  }

  .telegram:hover {
    background-color: #006ba1;
  }
</style>
