<template>
	<div id="app">
		<div id="cover"></div>
		<Header></Header>
        <!-- <h1>{{fullName}} {{counter}}</h1>
        <h1>{{textA}} {{textPlus}}</h1> -->
        <!-- <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link> -->
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <button @click="handleNotify">test notify </button>
        <!-- <notification content="test notify"></notification> -->
		<Footer></Footer>
	</div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.vue'
// 这里注释掉是因为todo将由router-view加载
// import Todo from './views/todo/todo.vue'
export default {
    metaInfo: {
        title: 'connie\'s Todo App'
    },
    components: {
        Header,
        // Todo,
        Footer
    },
    methods: {
        handleNotify () {
            this.$notify({
                content: 'test $notify',
                btn: 'close'
            })
        }
    },
    mounted () {
        // this.$notify({
        //     content: 'test $notify',
        //     btn: 'close'
        // })
    }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.2
        z-index -1
</style>
