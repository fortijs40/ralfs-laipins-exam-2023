<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input id="input-search" placeholder="Search by title..." v-model="searchTxt" />
            </div>
            <div class="wrapper-settings">
                <button id="btn-show-favorites" :class="{active: showFavorites}" @click="toggleShowFavorites">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id" >#</th>
                    <th id="th-title" :class="{active: sortState.title !== 0}" @click="sortBy('title')">
                        Title
                        <IconCaretUp v-if="sortState.title !== 0" :class="{'flip-vertical': sortState.title === 2 }"/>
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th id="th-duration" :class="{ active: sortState.duration !== 0 }" @click="sortBy('duration')">
                        Duration
                        <IconCaretUp v-if="sortState.duration!==0" :class="{'flip-vertical': sortState.duration === 2}" />
                    </th>
                </tr>
                <!-- Loop goes on this <tr> element -->
                <tr class="song" v-for="(song, index) in filteredSongs" @dblclick="selectSong(song)" :class="{ 'active': store.getNowPlayingSongId === song.id}">
                    <td id="td-index">
                        <IconPlay v-show="store.getNowPlayingSongId === song.id"/>
                        <span id="txt-index" v-show="store.getNowPlayingSongId !== song.id">{{ index+1 }}</span>
                    </td>
                    <td id="td-title">
                        <img :src="song.album.images[0].url" />
                        {{song.name}}
                    </td>
                    <td id="td-artist">{{ getArtist(song.artists) }}</td>
                    <td id="td-album">{{song.album.name}}</td>
                    <td id="td-duration">
                        {{ getTime(song.duration_ms) }}
                        <IconHeart :class="{active: isFavorite(song.id)}" @click="storeAuth.toggleFavorite(song.id)" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { usePlayerStore } from '@/stores/player.js';
import { useAuthStore } from '@/stores/auth.js';
import originalSongs from '../data/songs.js';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconCaretUp from '@/components/icons/IconCaretUp.vue';

export default {
    data(){
        return{
            searchTxt: '',
            showFavorites: false,
            sortState: {
                title: 0,
                duration: 0
            },
            songs: originalSongs,
            store: usePlayerStore(),
            storeAuth: useAuthStore(),
        }
    },
    computed:{
        filteredSongs(){
            const findSongs = this.songs.filter(song =>
                song.name.toLowerCase().includes(this.searchTxt.toLowerCase())
            );
            return findSongs;
        },
    },
    methods:{
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        selectSong(song){
            this.store.setPlaylist(this.songs);
            this.store.setNowPlaying(song);
        },
        isFavorite(id){
            return this.storeAuth.getFavoriteSongs.includes(id);
        },
        toggleShowFavorites(){
            this.showFavorites = !this.showFavorites;
            if(this.showFavorites){
                const favSongs = this.songs = this.songs.filter(song =>
                    this.storeAuth.getFavoriteSongs.includes(song.id)
                )
                this.songs = favSongs;
            }else{
                this.songs = originalSongs;
            }
        },
        sortBy(field){
            let sortedSongs =  [...this.songs];
            console.log(field);
            this.sortState[field] = (this.sortState[field] + 1) % 3;
            console.log(this.sortState[field]);
            let order = this.sortState[field];
            if (order === 0) {
                this.songs = [...originalSongs];
            } else {
                sortedSongs.sort((a, b) => {
                if (field === 'title') {
                    return a.name.toLowerCase() < b.name.toLowerCase() ? (order === 1 ? -1 : 1) : (order === 1 ? 1 : -1);
                } else if (field === 'duration') {
                    return (order === 1) ? a.duration_ms - b.duration_ms : b.duration_ms - a.duration_ms;
                }
            });
            this.songs = sortedSongs;
            }
        },
        getArtist(artists){
            let text = "";
            artists.forEach(artist => {
                text = text.concat(artist.name, ", ");
            })
            return text.slice(0, -2);
        },
        getTime(time) {
            let minutes = Math.floor(time / 60000);
            let seconds = Math.floor((time % 60000) / 1000);
            return `${minutes}:${seconds<10? "0"+seconds : seconds}`;
        }
    },
    components:{
        IconPlay,
        IconHeart,
        IconCaretUp
    }
}
</script>
