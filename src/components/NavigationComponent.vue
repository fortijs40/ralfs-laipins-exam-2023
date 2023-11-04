<template>
    <nav id="nav-main" class="wrapper-navigation">
        <ol>
            <li v-for="loco in locations">
                <router-link :to="loco.path" id="loco">{{ loco.name }}</router-link>
            </li> 
        </ol>

    </nav>
</template>
<script>
export default{
    data(){
        return{
            locations: [
                {name: 'SONGS', path: '/'},
                {name: 'ALBUMS', path: '/albums'},
                {name: 'ABOUT', path: '/about'},
            ]
        };
    }
}
</script>