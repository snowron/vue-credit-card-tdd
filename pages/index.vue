<template>
  <div class="container">
    <!-- <CreditCardVuex></CreditCardVuex>
    <PayButtonVuex></PayButtonVuex> -->
    <CreditCard></CreditCard>
  </div>
</template>

<script lang="js"> 
import CreditCardVuex  from "../components/CreditCardVuex.vue";
import CreditCard  from "../components/CreditCard.vue";
import PayButtonVuex  from "../components/PayButtonVuex.vue";
export default {
  name: 'App',
  components: {
    CreditCard,
    CreditCardVuex,
    PayButtonVuex, 
  },
    async asyncData({ $axios }) {
    const mountains = await $axios.$get('https://api.nuxtjs.dev/mountains')
    return { mountains }
  },
}
</script>
