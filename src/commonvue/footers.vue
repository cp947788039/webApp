<style lang="sass" scoped>
    
</style>
<template>
    <footer class="toolbar mui-row" v-show="$store.state.appData.isShowFoot">
        <div class="mui-col-xs-4 toolbar-icon">
            <router-link :to="{name: 'index'}" class="toolbar-link" :class="{'active':p_attr=='index'}">
                <span class="mui-icon mui-icon-home"></span>
                首页
            </router-link>
        </div>
        <div class="mui-col-xs-4 toolbar-icon">
            <router-link :to="{name: 'cart'}" class="toolbar-link" :class="{'active':p_attr=='cart'}">
                <span class="mui-icon mui-icon-extra-cate"></span>
                购物车
            </router-link>
        </div>
        <div class="mui-col-xs-4 toolbar-icon">
            <router-link :to="{name: 'user'}" class="toolbar-link" :class="{'active':p_attr=='user'}">
                <span class="mui-icon mui-icon-person"></span>
                我的
            </router-link>
        </div>
        <div class="mui-col-xs-4 toolbar-icon">
            <router-link :to="{name: 'user'}" class="toolbar-link" :class="{'active':p_attr=='user'}">
                <span class="mui-icon mui-icon-person"></span>
                我的
            </router-link>
        </div>
    </footer>
</template>
<script>
    import propsync from 'common/lib/mixin/propsync'
    export default {
        props: {
            attr:{
                type:String,
                default:'',
            }
        },
        data(){
            return {
                
            }
        },
        mounted() {
            this.$nextTick(()=>{
                
            })
        },
        methods: {
            
        },
    }
</script>