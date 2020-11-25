const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Album = window.httpVueLoader('./components/Album.vue')
const Password = window.httpVueLoader('./components/Password.vue')
const Presentation = window.httpVueLoader('./components/Presentation.vue')
const Reseaux = window.httpVueLoader('./components/Reseaux.vue')

const routes = [
    { path: '/panier', name: 'Panier', component: Panier },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/album', name: 'Album', component: Album },
    { path: '/password', name: 'Password', component: Password },
    { path: '/', name: 'Presentation', component: Presentation },
    { path: '/reseaux', name: 'Reseaux', component: Reseaux },
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
        console.log('toto va ala peche')
        console.log(this.panier)
        /*try {
            const res3 = await axios.get('/me')
            this.user = res3.data
            this.isConnected = true
        } catch (err) {
            if (err.response?.status === 401) {
                this.isConnected = false
            } else {
                console.log('error', err)
            }
        }*/
    },
    methods: {
        async addToPanier (articleId) {
            var parameters = {
                id: articleId,
                quantity: 1
            }
            const response = await axios.post('/api/panier', parameters)
            this.panier.articles.push(response.data)
        },
        async removeFromPanier (articleId) {
            const response = await axios.delete('/api/panier/' + articleId)
            const index = this.panier.articles.findIndex(article => article.id === articleId)
            this.panier.articles.splice(index, 1)
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
