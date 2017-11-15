<template>
  <div class="">

  <div class="retweet-wrap" v-if="tweet.retweeted_status">

    <div class="tweet-wrap">
      <div class="tweet-usericon">
        <img :src="tweet.retweeted_status.user.profile_image_url" alt="usricon">
      </div>
      <div class="tweet-detail-wrap">
        <div class="tweet-username">
          <p class="tweet-username-wrap">
            <span class="user-name">{{tweet.retweeted_status.user.name}}</span>
            <span class="user-id">@{{tweet.retweeted_status.user.screen_name}}</span>
          </p>
        </div>
        <div class="tweet-text">
          {{unEscapeHTML(tweet.retweeted_status.text)}}
        </div>
        <div class="tweet-media" v-if="tweet.entities.media" v-for="object in tweet.entities.media">
          <img :src="object.media_url_https" alt="">
        </div>
      </div>
    </div>
    <div class="retweet-detail">
      <div class="retweet-usericon">
        <img :src="tweet.user.profile_image_url" alt="">
      </div>
      <div class="retweet-username">
        <p class="tweet-username-wrap">
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <span>{{tweet.user.name}} retweeted</span>
        </p>
      </div>
    </div>

  </div>
  <div class="tweet-wrap" v-else>

    <div class="tweet-usericon" background-image>
      <img :src="tweet.user.profile_image_url" alt="usricon">
    </div>
    <div class="tweet-detail-wrap">
      <div class="tweet-username">
        <p class="tweet-username-wrap">
          <span class="user-name">{{tweet.user.name}}</span>
          <span class="user-id">@{{tweet.user.screen_name}}</span>
          <span v-if="tweet.user.protected">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div class="tweet-text">
        <p v-if="tweet.in_reply_to_user_id">
          replying to
          <span class="user-name">@{{tweet.in_reply_to_screen_name}}</span>
        </p>
        <span v-if="tweet.in_reply_to_user_id">
          {{unEscapeHTML(tweet.text)}}
        </span>
        <span v-else>
          {{unEscapeHTML(tweet.text)}}
        </span>
        <!-- <span v-if="tweet.entities.urls">
          {{tweet.entities.urls}}
        </span> -->
      </div>
      <div class="tweet-media" v-if="tweet.entities.media" v-for="object in tweet.entities.media">
        <img :src="object.media_url_https" alt="">
      </div>
    </div>

  </div>
  <div class="tweet-option">
    <div v-on:click="unlikeTweet(tweet)" class="tweet-like tweet-liked" v-if="tweet.favorited">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
    <div v-on:click="likeTweet(tweet)" class="tweet-like" v-else>
      <i class="fa fa-heart-o" aria-hidden="true"></i>
    </div>
    <div v-on:click="unretweet(tweet)" class="tweet-retweet tweet-retweeted" v-if="tweet.retweeted">
      <i class="fa fa-retweet" aria-hidden="true"></i>
    </div>
    <div v-on:click="retweet(tweet)" class="tweet-retweet" v-else>
      <i class="fa fa-retweet" aria-hidden="true"></i>
    </div>
    <div class="tweet-reply">
      <i class="fa fa-reply" aria-hidden="true"></i>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  name: '',
  props: ['tweet', 'socket'],
  data: function () {
    return {
    }
  },
  created: function () {
  },
  methods: {
    unEscapeHTML (str) {
      return str
        .replace(/(&lt;)/g, '<')
        .replace(/(&gt;)/g, '>')
        .replace(/(&quot;)/g, '"')
        .replace(/(&#39;)/g, "'")
        .replace(/(&amp;)/g, '&')
    },
    likeTweet (tweet) {
      this.socket.emit('like', tweet.id_str)
      tweet.favorited = true
    },
    unlikeTweet (tweet) {
      this.socket.emit('unlike', tweet.id_str)
      tweet.favorited = false
    },
    retweet (tweet) {
      this.socket.emit('retweet', tweet.id_str)
      tweet.retweeted = true
    },
    unretweet (tweet) {
      this.socket.emit('unretweet', tweet.id_str)
      tweet.retweeted = false
    },
    reply (tweet) {
    }
  }
}
</script>

<style>

.tweet-wrap {
  display: flex;
  text-align: left;
  margin: 10px 0 10px 0;
  /*padding: 0 0 10px 0;*/
  /*border-bottom: solid 1px rgba(0, 0, 0, 0.1);*/
  transition: all .5s ease .1s;
  position: relative;
}

.tweet-detail-wrap {
  min-width: 0;
}

.retweet-wrap {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  margin-top: 20px;
}

.retweet-detail {
  text-align: left;
  display: flex;
  position: absolute;
  top: -10px;
  left: -12px;
  width: 100%;
}

.tweet-container {
  transition: all .5s ease;
}

.tweet-container:hover {
  /*box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.3);*/
  /*transform: translateY(-2px);*/
  /*transform: translateX(-5%);*/
  /*background-color: rgba(52, 175, 255, 0.05);*/
}

.tweet-usericon {
  width: 50px;
  height: 50px;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 100%;
  margin: 5px 10px 0 10px;
  overflow: hidden;
}

.tweet-usericon img,.retweet-usericon img {
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  height: 100%;
}

.retweet-usericon {
  /*position: absolute;*/
  width: 30px;
  height: 30px;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 100%;
  margin: 5px 5px 0 15px;
  /*top: 5px;*/
  /*left: 30px;*/
  overflow: hidden;
  box-shadow: 0 0 0 4px rgb(255, 254, 253);
}

.tweet-username {
  font-weight: bold;
  /*display: inline-block;*/
  /*width: 100%;*/
}

.tweet-username-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin:0;
}

.tweet-username .user-name {

}

.retweet-username {
  font-size: 0.8em;
  margin-left: 30px;
  /*display: inline-block;*/
  width: calc(100% - 50px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.retweet-username i {
  color: rgb(44, 134, 7);
}

.tweet-username .user-id {
  font-size: 0.8em;
  color: rgba(4, 4, 4, 0.63);
}

.tweet-text {
  padding: 0 10px 0 0;
  word-wrap: break-word;
  font-size: 0.9em;
}

.tweet-text p {
  margin: 0;
  font-size: 0.8em;
}

.tweet-text .user-name {
  color: rgb(0, 92, 131);
}

.tweet-option {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20px;
  position: absolute;
  right: -10px;
  top: -5px;
  opacity: 0.2;
  transition: all .5s ease;
  /*transform: translateX(2vw);*/
}

.tweet-container:hover .tweet-option {
  opacity: 1;
  /*transform: translateX(-1vw);*/
  /*transition: all .0s;*/
}

.tweet-like {
  cursor: pointer;
  transition: all .5s ease;
  color: black;
}

.tweet-liked {
  animation: clicked .5s;
  color: red;
}

.tweet-retweet {
  cursor: pointer;
  transition: all .5s ease;
  color: black;
}

.tweet-retweeted {
  animation: clicked .5s;
  color: green;
}

.tweet-reply {
  cursor: pointer;
}

@keyframes clicked {
  0% {
    transform: scale(0.8);
  }
  30% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.tweet-media {
  display: flex;
  flex-direction: row;
}

.tweet-media img {
  width: auto;
  height: 100px;
  transition: all .5s ease;
}

</style>
