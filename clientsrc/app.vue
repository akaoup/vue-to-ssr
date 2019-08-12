<template>
	<div id="app">
		<div id="cover"></div>
		<Header></Header>
        <h1>{{fullName}} {{counter}}</h1>
        <h1>{{textA}} {{textPlus}}</h1>
        <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
		<Footer></Footer>
        <router-view name="a" />
	</div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.vue'
// 这里注释掉是因为todo将由router-view加载
// import Todo from './views/todo/todo.vue'

import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex'

export default {
  data () {
    return {

    }
  },

  components: {
    Header,
    // Todo,
    Footer
  },
  mounted () {
    console.log(this.$store)
    // mutation的使用
    // let i = 1
    // setInterval(() => {
    //     // 调用storel里的mutations 的updateCount
    //     this.$store.commit('updateCount', { num: i++ })
    // }, 1000)

    // 这里由actions 异步修改
    // this.$store.dispatch('updateCountAsync', {
    //     num: 5,
    //     time: 2000
    // })

    //
    this.updateCountAsync({
        num: 5,
        time: 2000
    })
    // setInterval(() => {
    //     // 调用storel里的mutations 的updateCount
    //     this.updateCount({ num: i++ })
    // }, 1000)

    this['a/updateText']('123')
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount', 'a/updateText'])
  },
  computed: {
    ...mapState({
        counter: (state) => state.count,
        textA: state => state.a.text
    }),
    ...mapGetters({
        fullName: 'fullName',
        textPlus: 'a/textPlus'
    })
    // ...mapGetters(['fullName'])

    // count () {
    //     return this.$store.state.count
    // },
    // fullName () {
    //     return this.$store.getters.fullName
    // }

    // textA () {
    //     return this.$store.state.a.text
    // }
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
