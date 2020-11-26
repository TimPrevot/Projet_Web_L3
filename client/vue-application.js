const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Album = window.httpVueLoader('./components/Album.vue')
const Password = window.httpVueLoader('./components/Password.vue')
const Presentation = window.httpVueLoader('./components/Presentation.vue')
const Reseaux = window.httpVueLoader('./components/Reseaux.vue')
const Paiement = window.httpVueLoader('./components/Paiement.vue')

const routes = [
    { path: '/panier', name: 'Panier', component: Panier },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/album', name: 'Album', component: Album },
    { path: '/password', name: 'Password', component: Password },
    { path: '/', name: 'Presentation', component: Presentation },
    { path: '/reseaux', name: 'Reseaux', component: Reseaux },
    { path: '/paiement', name: 'Paiement', component: Paiement },
    { path: '/*', redirect: '/' }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        songs: [],
        panier: {
            createdAt: null,
            updatedAt: null,
            articles: [],
            totalPrice: 0
        },
        user: {},
        isConnected: false
    },
    async mounted () {
        const res = await axios.get('/api/songs')
        this.songs = res.data
        const res2 = await axios.get('/api/panier')
        this.panier = res2.data
    },
    methods: {
        async addToPanier (articleId) {
            var parameters = {
                id: articleId,
                quantity: 1
            }
            const response = await axios.post('/api/panier', parameters)
            this.panier.articles.push(response.data)
            const res2 = await axios.get('/api/panier/totalPrice')
            this.panier.totalPrice = res2.data
        },
        async removeFromPanier (articleId) {
            const response = await axios.delete('/api/panier/' + articleId)
            const index = this.panier.articles.findIndex(article => article.id === articleId)
            this.panier.articles.splice(index, 1)
            const res2 = await axios.get('/api/panier/totalPrice')
            this.panier.totalPrice = res2.data
        },
        async addClient (client) {
            const res = await axios.post('/api/register', client)
            this.connectClient(client)
        },
        async connectClient (client) {
            const res = await axios.post('/api/login', client)
            this.client = res.data
            this.isConnected = true
            this.$router.push('/')
        },
        async disconnectClient (client) {
            const res = await axios.post('/api/disconnect', client)
            this.client = res.data
            this.isConnected = false
            this.$router.push('/')
        }
    }
})
