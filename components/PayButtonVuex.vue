<template>
  <button @click="pay()">Pay With Credit Card</button>
</template>

<script>
export default {
  methods: {
    setError(message) {
      this.$store.commit('card/setError', message)
    },
    pay() {
      if (this.$store.state.card.cardNumber.length < 16) {
        this.setError('Card Number cannot be less than 16 digits')
        return
      }
      let onlyDigitsExp = new RegExp('^[0-9]+$')
      if (!onlyDigitsExp.test(this.$store.state.card.cardNumber)) {
        this.setError('Card Number can be 16 digits not letters')
        return
      }
      if (this.$store.state.card.cardCVV.length < 3) {
        this.setError('Card CVV cannot be less than 3 digits')
        return
      }
      if (!onlyDigitsExp.test(this.$store.state.card.cardCVV)) {
       this.setError('Card CVV can be 3 digits not letters')
        return
      }
      if (
        !this.$store.state.card.cardMonth ||
        !this.$store.state.card.cardYear
      ) {
        this.setError('Date cannot be empty')
        return
      }

      const ip = this.$axios
        .$get('http://icanhazip.com')
        .then((res) => {
            this.setError('')
          window.alert('Success')
        })
        .catch((err) => {
          console.log(err)
          this.$store.state.card.error = 'Network error'
        })
    },
  },
}
</script>

<style>
</style>