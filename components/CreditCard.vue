<template>
  <div class="background">
    <div id="errorSide" class="errorContainer" v-if="error !== ''">
      {{ error }}
    </div>
    <div class="cardContainer">
      <input
        id="cardNumber"
        class="cardInput"
        placeholder="Card Number"
        v-model="cardNumber"
        maxlength="16"
      />
      <select id="cardMonth" class="cardInput" v-model="cardMonth" required>
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
      <select id="cardYear" class="cardInput" v-model="cardYear">
        <option value="" disabled selected>Year</option>
        <option
          :value="$index + minCardYear"
          v-for="(n, $index) in 12"
          :key="n"
        >
          {{ $index + minCardYear }}
        </option>
      </select>
      <input
        id="cardCVV"
        class="cardInput"
        placeholder="Card CVV Number"
        v-model="cardCVV"
        maxlength="3"
      />
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
        this.error = 'Card Number cannot be less than 16 digits'
        return
      }
      let onlyDigitsExp = new RegExp('^[0-9]+$')
      if (!onlyDigitsExp.test(this.cardNumber)) {
        this.error = 'Card Number can be 16 digits not letters'
        return
      }
      if (this.cardCVV.length < 3) {
        this.error = 'Card CVV cannot be less than 3 digits'
        return
      }
      if (!onlyDigitsExp.test(this.cardCVV)) {
        this.error = 'Card CVV can be 3 digits not letters'
        return
      }
      if (!this.cardMonth || !this.cardYear) {
        this.error = 'Date cannot be empty'
        return
      }

      const ip = this.$axios
        .$get('http://icanhazip.com')
        .then((res) => {
          window.alert('Success')
        })
        .catch((err) => {
          console.log(err)
          this.error = 'Network error'
        })
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap');
.background {
  font-family: 'Source Sans Pro', sans-serif;
}
.cardContainer {
  display: flex;
  flex-direction: column;
}
.cardInput {
  margin: 20px 50px;
}
select {
  height: 50px;
  padding: 5px 15px;
  box-shadow: none;
  border: 1px solid #ced6e0;
}
input {
  width: 80%;
  height: 50px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
}
button {
  width: 30%;
  height: 50px;
  border-radius: 5px;
  margin-left: 30%;
  color: white;
  background-color: red;
}
.errorContainer {
  padding: 1%;
  background-color: lightcoral;
  text-align: center;
  color: white;
}
</style>