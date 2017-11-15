<template>
  <div id="app">
    <HeaderMenu :user_data="user_data"/>
    <transition tag="div" :name="transitionName" mode="out-in" id="router-wrap">
      <keep-alive>
        <router-view :tweets="tweets" :socket="socket"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import io from 'socket.io-client'
import HeaderMenu from '@/components/HeaderMenu'
export default {
  name: 'app',
  data () {
    return {
      // selected_num: 0,
      // is_move: false,
      transitionName: '',
      pathList: ['', 'activity', 'messages'],
      socket: null,
      tweets: [],
      user_data: {}
    }
  },
  created () {
    this.socket = io('http://localhost:3333')
    // this.socket.emit('tweet', 'てす')
    this.socket.on('init', data => {
      // console.log(data.hoge)
    })
    // this.socket.emit('users/show')
    this.socket.on('tweet', tweet => {
      // console.log(tweet.entities.media)
      // console.log(tweet.hashtags)
      this.tweets.unshift(tweet)
    })
    this.socket.on('message', message => {
      // console.log(message)
    })
    this.socket.on('users/show', data => {
      this.user_data = data
    })
  },
  methods: {
    // moveMenuBar (n) {
    //   this.selected_num = n
    //   this.is_move = true
    // }
  },
  computed: {
  },
  watch: {
    '$route' (to, from) {
      const toNum = this.pathList.indexOf(to.path.split('/')[1])
      const fromNum = this.pathList.indexOf(from.path.split('/')[1])
      this.transitionName = toNum > fromNum ? 'slide-right' : 'slide-left'
    }
  },
  components: {
    'HeaderMenu': HeaderMenu
  }
}
</script>

<style>
body {
  margin: 0 0 0 0;
  overflow-x: hidden;
  background-color: rgb(255, 254, 253);
  background-attachment: fixed;
}

h1 {
  color: rgb(90, 90, 90);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*background-color: rgb(255, 252, 246);
  height: 100vh;*/
}

.slide-right-leave {
  opacity: 1;
}
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(-20px);
  transition-property: all;
  transition-timing-function: linear;
  transition-duration: .25s;
}
.slide-right-leave-to {
}
.slide-right-enter{
  opacity: 0.5;
  transform: translateX(20px);
}
.slide-right-enter-active {
  transition-property: all;
  transition-timing-function: linear;
  transition-duration: .25s;
  /*transition-delay: .25s;*/
}
.slide-right-enter-to {
}

.slide-left-leave {
  opacity: 1;
}
.slide-left-leave-active {
  opacity: 0;
  transform: translateX(20px);
  transition-property: all;
  transition-timing-function: linear;
  transition-duration: .25s;
}
.slide-left-leave-to {
}
.slide-left-enter{
  opacity: 0.5;
  transform: translateX(-20px);
}
.slide-left-enter-active {
  transition-property: all;
  transition-timing-function: linear;
  transition-duration: .25s;
  /*transition-delay: .25s;*/
}
.slide-left-enter-to {
}

a {
  text-decoration: none;
}

.router-wrap {
  display: flex;
  flex-direction: row;
}


</style>
