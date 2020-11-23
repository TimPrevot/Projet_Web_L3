<template>
<div class="min-h-screen min-w-screen py-16 bg-gray-900 text-gray-300">
            <div class="lg:text-center items-center">
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                    Me suivre sur les réseaux
                </p>
                <img class="mt-4 max-w-2xl lg:mx-auto" src="https://pbs.twimg.com/profile_images/1315682895303004160/-_N5r_og_400x400.jpg" alt="">
                <p class="mt-4 max-w-2xl text-xl lg:mx-auto">
                    Suivez moi sur les réseaux sociaux pour être au courant en avant première des annonces et être notfiés des steams.
                </p>
            </div>
            <div class="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                <div class="mt-10">
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <div class="flex">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center h-12 w-12 rounded-md text-white">
                            <img src="../assets/img/twitch.svg" alt="">
                        </div>
                    </div>
                    <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium">
                        Me suivre sur Twitch
                        </dt>
                        <span>
                            Suivez moi sur 
                            <a href="https://www.twitch.tv/mistermv" target="_blank" class="mt-2 text-base text-indigo-600">
                            ma chaine Twitch.
                            </a>
                            Vous pourrez me voir galérer et m'entendre dire des conneries. Si vous êtes sages on commencera la prod de l'album.
                        </span>
                    </div>
                    </div>

                    <div class="flex">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center h-12 w-12 rounded-md text-white">
                            <img src="../assets/img/youtube.svg" alt="">
                        </div>
                    </div>
                    <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium ">
                        Ma Chaine Youtube
                        </dt>
                        <span>
                            Sur 
                            <a href="https://twitter.com/mistermv" target="_blank" class="mt-2 text-base text-indigo-600">
                                la chaine Youtube
                            </a>
                            vous pourrez retrouver les redifs de mes lives Twitch. Plus d'excuses pour ne pas avoir les références de mes bêtises.
                        </span>
                    </div>
                    </div>

                    <div class="flex">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center h-12 w-12 rounded-md text-white">
                            <img src="../assets/img/soundcloud.svg" alt="">
                        </div>
                    </div>
                    <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium">
                            Ecouter sur Soundcloud
                        </dt>
                        <span>
                            Allez écouter mes vieux sons sur
                            <a href="https://soundcloud.com/xavierdang" target="_blank" class="mt-2 text-base text-indigo-600">
                                Soundcloud.
                            </a>
                            Qui sait, peut être qu'un jour vous pourrez retrouver le plus gros Album de tous les temps.
                        </span>
                    </div>
                    </div>

                    <div class="flex">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center h-12 w-12 rounded-mdtext-white">
                            <img src="../assets/img/instagram.svg" alt=""><br>
                        </div>
                    </div>
                    <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium">
                        Instagram
                        </dt>
                        <span>
                            Entrez dans mon intimité en vous abonnant à mon 
                             <a href="https://www.instagram.com/xavierdang/" target="_blank" class="mt-2 text-base h-12 w-12 text-indigo-600">
                                compte Instagram.
                            </a>
                            Vous pourrez voir mes story où je fais des pâtes ou encore mes têtes after sex avec ma femme.
                        </span>
                    </div>
                    </div>
                </dl>
                </div>
            </div>
            <div class="mt-4 max-w-2xl lg:mx-auto flex">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center h-12 w-12 rounded-md text-white">
                            <img src="../assets/img/twitter.svg" alt="">
                        </div>
                    </div>
                    <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium">
                        Twitter
                        </dt>
                        <span>
                            Avoir de venir voir l'immensité de ma bêtise et voir ce que je partage n'hésitez pas à aller sur 
                            <a href="https://twitter.com/mistermv" target="_blank" class="mt-2 text-base h-12 w-12 text-indigo-600">
                                mon Twitter.
                            </a>
                            C'est en grande partie grâce à ça que l'incroyable album va voir le jour.
                        </span>
                    </div>
            </div>
        </div>
</template>

<script>
module.exports = {
  name: 'Reseaux',
  data () {
    return {
      msg: 'Pour me suivre sur mes réseaux'
    }
  }
}
</script>
