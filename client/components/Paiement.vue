<template>
<div class="min-h-screen min-w-screen intems-center justify-center py-16 bg-gray-900" id="app">
  <div class="max-w-sm mx-auto px-6">
    <div class="relative flex flex-wrap">
      <div class="w-full relative">
        <div class="md:mt-6">
          <form @submit.prevent="addClient()" class="flex bg-gray-700 shadow p-3">
            <div class="mx-auto max-w-lg">
              <div class="py-1">
                <span class="px-1 text-sm">Numéro de carte</span>
                <input
                  class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  :value="cardNumber"
                  autofocus
                  id="cardNumber"
                  autocomplete="off"
                />
              </div>
              <div class="py-1">
                <span class="px-1 text-sm">Nom du propriétaire</span>
                <input
                  class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  id="cardName"
                  v-model="name"
                  autocomplete="off"
                />
              </div>
              <div class="flex justify-center">
                <label class="inline-blocks">
                  <span class="px-1 text-sm">Date d'expiration</span>
                  <select
                    class="form-select mt-1"
                    id="cardMonth"
                    v-model="expireMonth"
                  >
                    <option value="" disabled selected>Mois</option>
                    <option
                      v-for="n in 12"
                      :value="n < 10 ? '0' + n : n"
                      :key="n"
                      >
                      {{ 10 > n ? "0" + n : n }}
                    </option>
                  </select>
                  <select
                      class="form-select mt-1"
                      id="cardYear"
                      v-model="expireYear"
                  >
                    <option value="" disabled selected>Année</option>
                    <option
                      v-for="(n, $index) in 12"
                      :value="$index + currentYear"
                      :key="n"
                    >
                      {{ $index + currentYear }}
                    </option>
                  </select>
                </label>
                <div>
                  <div class="card-input">
                    <span class="text-sm">CVV</span>
                    <input
                      class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      id="cardCvv"
                      :value="cvv"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-center">
                <button class="flex mt-3 text-lg font-semibold bg-indigo-600 text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-indigo-700">
                  Payer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
module.exports = {
  props: {
    songs: { type: Array, default: [] },
    panier: { type: Object }
  },
  name: 'Paiement',
  data() {
    return {
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      name: "",
      cvv: "",
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    submitCard() {
      alert(`
        ${this.cardNumber}\n
        ${this.name}\n
        ${this.expireMonth}/${this.expireYear}\n
        ${this.cvv}`);
    },
  }
};
</script>
