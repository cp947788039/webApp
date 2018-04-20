<style lang="sass" scoped></style>
<template>
    <header class="mui-bar mui-bar-nav" v-show="$store.state.appData.isShowHead">
        <a class="mui-icon mui-icon-left-nav mui-pull-left" @tap.stop.prevent="goBack" v-show="$store.state.appData.isShowBack"></a>
        <h1 class="mui-title">{{$store.state.appData.navbarTitle}}</h1>
        <a class="mui-icon mui-pull-right"></a>
    </header>
</template>
<script>
    export default {
        data: function() {
            return {};
        },
        mounted(){

        },
        methods:{
            
        },
    };
</script>
