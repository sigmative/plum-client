<template>
  <div id="home">
    <h1 class="bread-crumb">{{msg}}</h1>
    <div class="timeline">
      <transition-group name="tweet-list">
        <Tweet v-for="tweet in tweets" :key="tweet.id_str" class="tweet-container" :tweet="tweet" :socket="socket"/>
      </transition-group>
    </div>
    <TweetButton :socket="socket"/>
  </div>
</template>

<script>
// import io from 'socket.io-client'
import Tweet from '@/components/Tweet'
import TweetButton from '@/components/TweetButton'
export default {
  name: 'Home',
  props: ['tweets', 'socket'],
  data () {
    return {
      msg: '/Home'
    }
  },
  created () {

  },
  components: {
    'Tweet': Tweet,
    'TweetButton': TweetButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  margin: 70px 0 0 0;
}

.bread-crumb {
  font-size: 1.2em;
  text-align: left;
  margin: 15px 0 0 0;
  padding: 0 0 0 20px;
  width: 100%;
  background-color: rgba(234, 0, 223, 0.4);
  color: white;
  position: relative;
}

/*.bread-crumb:after {
  box-sizing: border-box;
  width: 34px;
  height: 10px;
  border: 14px solid transparent;
  border-left: 20px solid #f798ed;
  content: '';
  position: absolute;
  right: -34px;
}*/

.timeline {
  width: 95%;
  /*height: 500px;*/
  /*background-color: rgba(158, 158, 158, 0.1);*/
  border-radius: 5px;
  margin: 0 5% 0 0;
  padding: 5px 0 0 0;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
}

.tweet-container {
  position: relative;
  margin: 10px 0 10px 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.tweet-list-enter {
  opacity: 0;
  background-color: rgba(185, 70, 255,0.8);
  transform: translateX(20px);
}

.tweet-list-enter-active {
  transition: all 0.5s ease-in-out;
}

.tweet-list-enter-to {
  opacity: 1;
}

.tweet-list-move {
  transition: all 0.5s ease-in-out;
}

</style>
