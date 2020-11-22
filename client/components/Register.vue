<template>

  <div class="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-sm mx-auto px-6">
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="md:mt-6">
            <div class="text-center font-semibold text-black">
              Créer un compte
            </div>
            <div class="text-center font-base text-black">
              <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">
                Déjà inscrit ?
              </router-link>
            </div>
            <form @submit.prevent="addClient()" class="mt-8">
              <div class="mx-auto max-w-lg ">
                <div class="py-1">
                  <span class="px-1 text-sm text-gray-600">Pseudo</span>
                  <input placeholder="" type="text" v-model="pseudo" class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm text-gray-600">E-mail</span>
                  <input placeholder="" type="email" v-model="email" class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm text-gray-600">Mot de passe</span>
                  <input placeholder="" type="password" v-model="password" class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                </div>
                <div class="py-1">
                  <span class="px-1 text-sm text-gray-600">Confirmation du mot de passe</span>
                  <input placeholder="" type="password" class="text-md block px-3 py-2 rounded-lg w-full bg-white placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                </div>
                <div class="flex justify-start">
                  <label class="block text-gray-500 font-bold my-4 flex items-center">
                    <input class="leading-loose text-pink-600 top-0" type="checkbox"/>
                    <span class="ml-2 text-sm py-2 text-gray-600 text-left">Accepter les
                                          <a href="#"
                                             class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                                            Conditions d'utilisations
                                          </a>et les
                                          <a href="#"
                                             class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                                            informations de protection des données.</a>
                                    </span>
                  </label>
                </div>
                <button class="mt-3 text-lg font-semibold bg-indigo-600 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-indigo-700">
                  S'enregister
                </button>
              </div>
            </form>

            <div class="text-sm font-semibold block sm:hidden py-6 flex justify-center">
              <a href="#"
                 class="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500">You're already member?
                <span class="text-black font-semibold">
            Login
          </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Register',
  data () {
    return {
      pseudo: '',
      email: '',
      password: ''
    }
  },
  async mounted () {
  },
  methods: {
    async addClient () {
      this.$emit('add-client', {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
