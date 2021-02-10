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
        @input="updateCardStore"
        maxlength="16"
      />
      <select
        id="cardMonth"
        class="cardInput"
        @input="updateCardStore"
        required
      >
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
      <select id="cardYear" class="cardInput" @input="updateCardStore">
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
        @input="updateCardStore"
        maxlength="3"
      />
    </div>
  </div>
</template>

<script>

export default {
  watch: {},
  data() {
    return {
      minCardYear: new Date().getFullYear(),
    }
  },
  computed: {
    error() {
      return this.$store.state.card.error
    },
  },
  methods: {
    updateCardStore(e) {
      this.$store.commit('card/set' + e.target.id, e.target.value)
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