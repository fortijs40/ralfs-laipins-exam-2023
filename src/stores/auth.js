import { defineStore } from 'pinia'
import router from '@/router';
export const useAuthStore = defineStore('auth', {

    state: () => ({
        user: {
            name: "Ralfs",
            surname: "Laipiņš",
            code: "IT21014",
            favoriteSongs: JSON.parse(localStorage.favoriteSongs ?? '[]')
        },
        authenticated: localStorage.getItem('is_authenticated') === 'true' ?? false,
    }),
    getters: {
        is_authenticated: (state) => {
            return state.authenticated;  //i'm deviating a bit from your template, but this is the only way it worked for me without f5'ing the page just reading value from state
        },
        getFavoriteSongs() {
            return this.user.favoriteSongs;
        }
    },
    actions: {
        setUserData(name,surname,code) {
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;
        },
        authenticate(email,password) {
            if (email === "ralfs.laipins@va.lv" && password === "123456") {
                this.authenticated = true;
                localStorage.is_authenticated = true;
                router.push({path: '/'});
            }
        },
        logout() {
            localStorage.clear();
            this.authenticated = false; 
            router.push({path: '/login'});
        },
        toggleFavorite(songID) {
            if (!this.user.favoriteSongs.includes(songID)) {
                this.user.favoriteSongs.push(songID);
            }else{
                this.user.favoriteSongs.splice(this.user.favoriteSongs.indexOf(songID),1);
            }
            localStorage.favoriteSongs = JSON.stringify(this.user.favoriteSongs);
        },
    }

});