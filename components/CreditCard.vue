<template>
  <div>
    <div id="errorSide" v-if="error !== ''">
      {{ error }}
    </div>
    <div>
      <input id="cardNumber" v-model="cardNumber" maxlength="16" />
      <select id="cardMonth" v-model="cardMonth" required>
        <option value="" disabled selected>Month</option>
        <option
          :value="n < 10 ? '0' + n : n"
          v-for="n in 12"
          :disabled="n < minCardMonth"
          :key="n"
        >
          {{ n < 10 ? '0' + n : n }}
        </option>
      </select>
      <select id="cardYear" v-model="cardYear">
        <option value="" disabled selected>Year</option>
        <option
          :value="$index + minCardYear"
          v-for="(n, $index) in 12"
          :key="n"
        >
          {{ $index + minCardYear }}
        </option>
      </select>
      <input id="cardCVV" v-model="cardCVV" maxlength="3" />
      <button id="payButton" @click="pay()">Pay with Credit Card</button>
    </div>
  </div>
</template>

<script>
export default {
  watch: {},
  data() {
    return {
      cardNumber: '',
      cardYear: '',
      cardMonth: '',
      cardCVV: '',
      error: '',
      minCardYear: new Date().getFullYear(),
    }
  },
  methods: {
    async pay() {
      this.error = ''
      if (this.cardNumber.length < 16) {
        this.error = 'Card Number cannot be less than 16 letter'
        return
      }
      if (this.cardCVV.length < 3) {
        this.error = 'Card CVV cannot be less than 3 letter'
        return
      }
      if (!this.cardMonth || !this.cardYear) {
        this.error = 'Date cannot be empty'
        return
      }

      const ip =  this.$axios
        .$get('http://icanhazip.com')
        .then((res) => {
         })
        .catch((err) => {
           this.error = 'Network error'
        })
     },
  },
}
</script>

<style>
</style>