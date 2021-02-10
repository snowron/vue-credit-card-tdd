export const state = () => ({
  cardNumber: '',
  cardCVV: '',
  cardMonth: '',
  cardYear: '',
  error: '',
})

export const mutations = {
  setcardNumber(state, payload) {
    state.cardNumber = payload
  },
  setcardYear(state, payload) {
    state.cardYear = payload
  },
  setcardMonth(state, payload) {
    state.cardMonth = payload
  },
  setcardCVV(state, payload) {
    state.cardCVV = payload
  },
  setError(state, payload) {
    state.error = payload
  }
}

export const actions = {
  updateCardStore({ commit }, payload) {
    console.log(commit);
    commit(commit, payload)
  }
}
