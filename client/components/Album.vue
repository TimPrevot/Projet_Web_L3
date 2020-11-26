<template>
  <div class="bg-gray-900 text-gray-300 min-h-screen p-10">

    <!-- header -->
    <div class="flex">
      <div id="album" class="mr-6 w-13 h-13">
        <img src="../assets/img/zeventv1.png">
      </div>
      <div class="flex flex-col justify-center">
        <!-- content -->
        <h4 class="mt-0 mb-2 uppercase text-gray-500 tracking-widest text-xs">Album</h4>
        <h1 class="mt-0 mb-2 text-white text-4xl">L'album que tout le monde attendait</h1>

        <p class="text-gray-600 mb-2 text-sm">MisterMV feat Mister V, Vald, Carpenter Brut, Toxic Avenger, M83 </p>
        <p class="text-gray-600 text-sm">Produit part <a>MisterMV</a> - 5 chansons, 18min 37sec</p>

      </div>
    </div>

    <!-- action buttons -->
    <div class="mt-6 flex justify-between">
      <div>
        <button class="mr-2 bg-green-500 text-green-100 block py-2 px-8 rounded-full" @click="play(current)">Lire</button>
      </div>
      <section>
        <h2>{{ current.title }}  <span>{{ current.artist }}</span></h2>
        <div>
          <button class="p-3 w-8 flex-shrink-0 outline-none focus:outline-none" @click="prev">
            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>
          <button class="p-3 w-8 flex-shrink-0 outline-none focus:outline-none" @click="play(current)" v-if="!isplaying">
            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button class="p-3 w-8 flex-shrink-0 outline-none focus:outline-none" @click="pause" v-else>
            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button class="p-3 w-8 flex-shrink-0 outline-none focus:outline-none" @click="next">
            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>
      </section>
      <div class="text-gray-600 text-sm tracking-widest text-right">
        <h5 class="mb-1">Followers</h5>
        <p>5,055</p>
      </div>
    </div>

    <!-- song list   -->
    <div class="mt-10">
      <!-- song list header -->
      <div class="flex text-gray-600">
        <div class="p-2 w-8 flex-shrink-0"></div>
        <div class="p-2 w-8 flex-shrink-0"></div>
        <div class="p-2 w-full">Titre</div>
        <div class="p-2 w-full">Artiste</div>
        <div class="p-2 w-full">Album</div>
        <div class="p-2 w-12 flex-shrink-0 text-right">⏱</div>
      </div>

      <div>
        <ul>
          <li v-for="song in songs" :key="song.id" class="flex border-b border-gray-800 hover:bg-gray-800">
            <div class="p-3 w-8 flex-shrink-0">{{song.id}}</div>
            <button class="p-3 w-8 flex-shrink-0 outline-none focus:outline-none" @click="play(song)" v-if="!(isplaying===song.id)">
              <svg class="h-6 w-6 outline-none focus:outline-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button class="p-3 w-8 flex-shrink-0 outline-none focus:outline-none" @click="pause()" v-else>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button class="p-3 w-8 flex-shrink-0 text-white outline-none focus:outline-none" @click="addToPanier(song.id)">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <div class="p-3 w-full">{{song.title}}</div>
            <div class="p-3 w-full">{{song.artist}}</div>
            <div class="p-3 w-full">ZEvent</div>
            <div class="p-3 w-12 flex-shrink-0 text-right">{{song.time}}</div>
          </li>
        </ul>
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
  name: 'Album',
  data () {
    return {
      current: {},
      index:0,
      isplaying: 0,
      player: new Audio()
    }
  },
  methods:{
    play (song) {
      if (typeof song.src !== "undefined") {
        this.current = song;
        this.player.src = this.current.src;
      }
      this.player.play();
      this.player.addEventListener('ended', function () {
        this.index++;
        if (this.index > this.songs.length - 1) {
          this.index = 0;
        }
        this.current = this.songs[this.index];
        this.play(this.current);
      }.bind(this));
      this.isplaying = song.id;
    },
    pause () {
      this.player.pause();
      this.isplaying = 0;
    },
    next () {
      this.index++;
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev () {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    addToPanier(songId) {
      this.$emit('add-to-panier', songId)
    }
  },
  destroyed:function(){
    this.player.pause();
    this.isplaying = 0;
  }
}
</script>

<style>
  #album{
    width : 200px;
    height : 200px;
  }
</style>
