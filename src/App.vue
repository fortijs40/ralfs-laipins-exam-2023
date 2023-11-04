<template>
    <!--  HEADER  -->
    <Header v-if="auth"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <Navigation v-if="auth"></Navigation>
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player" v-if="auth">
        <AudioPlayer />
    </div>
    <!--  PLAYER END  -->
</template>

<script>
    import { useAuthStore } from './stores/auth';

    export default {
        computed:{
            auth(){
                return useAuthStore().is_authenticated;
            }
        }
    }
</script>
