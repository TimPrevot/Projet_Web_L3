<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full lg:w-1/2 p-5 rounded-lg lg:rounded-l-none">
      <div class="px-8 mb-4 text-center">
        <h3 class="pt-4 mb-2 text-2xl">Vous avez oublié votre mot de passe?</h3>
      </div>

      <div v-if="this.email_sent">
        <h2>Nous vous avons envoyé un email pour réinitialiser votre mot de passe</h2>
      </div>

      <form class="px-8 pt-6 pb-8 mb-4 rounded" @submit.prevent="sendEmail">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
            E-mail
          </label>
          <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email" name="user_email"
              placeholder="E-mail"
              required
          />
        </div>
        <div class="mb-6 text-center" v-if="!this.email_sent">
          <button @click="setEmailToTrue"
              type="submit"
              class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
              type="button"
          >Réinitialiser le mot de passe
          </button>
        </div>
        <hr class="mb-6 border-t"/>
        <div class="text-center">
          <router-link :to="{name: 'Register'}" class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
            Créer un compte !
          </router-link>
        </div>
        <div class="text-center">
          <router-link :to="{name: 'Login'}" class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
            Déjà inscrit ? Connexion
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Password',
  data () {
    return {
      email_sent: false
    }
  },
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('recover_password', 'mot_de_passe_oublie', e.target, 'user_coH8k9D5xfQORmgGGdVd0')
        .then((result) => {
          console.log('Email sent successfully', result.status, result.text)
          console.log('email sent: ', this.email_sent)
        }, (error) => {
          console.log('Failed', error)
        })
    },
    setEmailToTrue() {
      this.email_sent = true
    }
  }
}
</script>
