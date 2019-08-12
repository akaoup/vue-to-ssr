<template>
	<section class="todo-app">
		<input type="text" class="add-item" autofocus placeholder="sth to do" @keyup.enter="addTodo">
		<Item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deletTodo"></Item>
		<Tabs :filter="filter" :todos="todos" @toggle="toggleFitter" @clear="clearCompleted"></Tabs>
	</section>

</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  name: 'Todo',
  data () {
    return {
      todos: [],
      todo: {
        id: 0,
        content: 'this is todo',
        completed: false
      },
      filter: 'all'
    }
  },
  // tab要传入的数组应该是个根据状态计算得到的数组
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      // 当filter的todo.completed === 'completed'是返回这个数组
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item,
    Tabs
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false

      })
      e.target.value = ''
    },
    deletTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFitter (state) {
      this.filter = state
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log('todo before enter')
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('todo update enter')
  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log('todo leave enter')
  // }
}
</script>

<style lang="stylus" scoped>
.todo-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
.add-item
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)

</style>
