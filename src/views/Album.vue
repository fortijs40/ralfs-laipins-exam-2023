<template>
    <div id="album-view">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" :class="{ active: layout === 'grid' }"  @click="setLayout('grid')"><Grid/></button>
                <button id="btn-list" :class="{ active: layout === 'list' }"  @click="setLayout('list')" ><List/></button>
            </div>
        </div>
        <ul id="list-albums" :class="{ grid: layout === 'grid' }">
            <li class="album" v-for="album in albums" @dblclick="selectAlbum(album)" :class="{ active: player.getNowPlayingAlbumID === album.id }">
                <img id="img-album" :src="album.image"/>
                <div class="album-info">
                    <h4 id="txt-album-name">{{album.name}}</h4>
                    <p id="txt-album-artists">{{album.artist}}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{year(album.release_date)}}</p>
                        <p id="txt-album-tracks">{{ getSongs(album) }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { usePlayerStore } from '@/stores/player.js';
import songs from '../data/songs.js'
import Grid from '@/components/icons/IconGrid.vue';
import List from '@/components/icons/IconList.vue';
export default {
    data(){
        return{
            songs: songs,
            player: usePlayerStore(),
            layout: 'grid',
        }
    },
    computed:{
        albums() {
            let uniqueAlbums = {};
            this.songs.forEach(song => {
                if (!uniqueAlbums[song.album.id]) {
                    uniqueAlbums[song.album.id] = {
                    id: song.album.id,
                    name: song.album.name,
                    artist: song.artists[0].name,
                    image: song.album.images[1].url,
                    release_date: song.album.release_date,
                    songs: []
                    };
                }
                uniqueAlbums[song.album.id].songs.push(song);
            });
            return Object.values(uniqueAlbums);
        },

    },
    methods:{
        setLayout(layout){
            this.layout = layout;
        },
        selectAlbum(album){
            this.player.setPlaylist(album.songs);
            this.player.setNowPlaying(album.songs[0]);
        },
        year(date){
            return date.split('-')[0];
        },
        getSongs(album){
            const count = album.songs.length;
            return `${count} ${count > 1 ? 'songs': 'song'}`
        }
    },
    components: {
        Grid,
        List
    }
}
</script>
