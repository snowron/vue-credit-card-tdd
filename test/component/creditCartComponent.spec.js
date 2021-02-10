import { mount, shallowMount } from '@vue/test-utils'
import CreditCard from '@/components/CreditCard.vue'

describe('Credit Cart Component Tests', () => {
  describe('Rendering Tests', () => {
    test('is a Vue instance', () => {
      const wrapper = mount(CreditCard)
      expect(wrapper.vm).toBeTruthy()
    })
    test('Should render 3 text box', () => {
      const wrapper = mount(CreditCard)
      const inputCount = wrapper.findAll('input')
      expect(inputCount.length).toEqual(2)
    })
    test('Should render card number text box', async () => {
      const wrapper = mount(CreditCard)
      const inputExists = await wrapper.find('#cardNumber')
      expect(inputExists.exists()).toBe(true)
    })
    test('Should render date text box', () => {
      const wrapper = mount(CreditCard)
      const selectExists = wrapper.find('#cardMonth')
      expect(selectExists.exists()).toBe(true)
    })
    test('Should render date text box', () => {
      const wrapper = mount(CreditCard)
      const selectExists = wrapper.find('#cardYear')
      expect(selectExists.exists()).toBe(true)
    })
    test('Should render card cvv number text box', () => {
      const wrapper = mount(CreditCard)
      const inputExists = wrapper.find('#cardCVV')
      expect(inputExists.exists()).toBe(true)
    })
    test('Should render Pay With Credit Card button', () => {
      const wrapper = mount(CreditCard)
      const payButton = wrapper.find('#payButton')
      expect(payButton.exists()).toBe(true)
    })
  })
  test('Should show card number must be 16 digits error message when Pay With Credit Card button clicked', async () => {
    const wrapper = mount(CreditCard)

    const payButton = wrapper.find('#payButton')
    const cvv = wrapper.find('#cardCVV')
    cvv.setValue('123')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const cardYear = wrapper.find('#cardYear')
    cardYear.setValue('2021')

    await payButton.trigger('click')
    const errorMessage = wrapper.find('#errorSide')
    expect(errorMessage.text()).toEqual("Card Number cannot be less than 16 digits")
  })
  test('Should show card number must be 16 digits not letters error message when Pay With Credit Card button clicked', async () => {
    const wrapper = mount(CreditCard)

    const payButton = wrapper.find('#payButton')

    const cardNumber = wrapper.find('#cardNumber')
    cardNumber.setValue('12345678A9876543')

    const cvv = wrapper.find('#cardCVV')
    cvv.setValue('123')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const cardYear = wrapper.find('#cardYear')
    cardYear.setValue('2021')

    await payButton.trigger('click')
    const errorMessage = wrapper.find('#errorSide')
    expect(errorMessage.text()).toEqual("Card Number can be 16 digits not letters")
  })
  test('Should show cvv number must be 3 digits error message when Pay With Credit Card button clicked', async () => {
    const wrapper = mount(CreditCard)

    const cardNumber = wrapper.find('#cardNumber')
    cardNumber.setValue('1234567899876543')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const cardYear = wrapper.find('#cardYear')
    cardYear.setValue('2021')

    const payButton = wrapper.find('#payButton')
    await payButton.trigger('click')

    const errorMessage = wrapper.find('#errorSide')
    expect(errorMessage.text()).toEqual("Card CVV cannot be less than 3 digits")
  })
  test('Should show cvv number must be 3 digits error message when Pay With Credit Card button clicked', async () => {
    const wrapper = mount(CreditCard)

    const cardNumber = wrapper.find('#cardNumber')
    cardNumber.setValue('1234567899876543')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const cardYear = wrapper.find('#cardYear')
    cardYear.setValue('2021')

    const cardCVV = wrapper.find('#cardCVV')
    cardCVV.setValue('AAA')


    const payButton = wrapper.find('#payButton')
    await payButton.trigger('click')

    const errorMessage = wrapper.find('#errorSide')
    expect(errorMessage.text()).toEqual("Card CVV can be 3 digits not letters")
  })
  test('Should date error when Pay With Credit Card button clicked', async () => {

    const wrapper = mount(CreditCard)

    const cardNumber = wrapper.find('#cardNumber')
    cardNumber.setValue('1234567899876543')

    const cvv = wrapper.find('#cardCVV')
    cvv.setValue('123')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const payButton = wrapper.find('#payButton')
    await payButton.trigger('click')

    const errorMessage = wrapper.find('#errorSide')
    expect(errorMessage.text()).toEqual("Date cannot be empty")
  })
  test('Should failed when Pay With Credit Card button clicked', async () => {

    const wrapper = shallowMount(CreditCard, {
      mocks: {
        $axios: { $get: jest.fn(() => Promise.reject()) }
      }
    })

    const cardNumber = wrapper.find('#cardNumber')
    cardNumber.setValue('1234567899876543')

    const cvv = wrapper.find('#cardCVV')
    cvv.setValue('123')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const cardYear = wrapper.find('#cardYear')
    cardYear.setValue('2021')

    const payButton = wrapper.find('#payButton')
    await payButton.trigger('click')

    const errorMessage = wrapper.find('#errorSide')
    setTimeout(() => {
      expect(errorMessage.text()).toEqual("Network error")
      done()
    }, 1000)
  })
  test('Should succesfully pay when Pay With Credit Card button clicked', async () => {


    const wrapper = shallowMount(CreditCard, {
      mocks: {
        $axios: { $get: jest.fn(() => Promise.resolve()) },

      }
    
    })
    
    let windowSpy = jest.spyOn(window, "alert").mockImplementation((message) => {
      console.log(message)
    });

    const cardNumber = wrapper.find('#cardNumber')
    cardNumber.setValue('1234567899876543')

    const cvv = wrapper.find('#cardCVV')
    cvv.setValue('123')

    const cardMonth = wrapper.find('#cardMonth')
    cardMonth.setValue('01')

    const cardYear = wrapper.find('#cardYear')
    cardYear.setValue('2021')

    const payButton = wrapper.find('#payButton')
    await payButton.trigger('click')

    expect(windowSpy).toBeCalled()
    expect(windowSpy).toBeCalledTimes(1)

  })

})
