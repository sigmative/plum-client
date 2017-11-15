<template lang="html">
  <div class="tweeting-ui-wrap">
    <div v-on:click="isOpened = true" class="tweet-button" :class="{'is-opened-button': isOpened}">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </div>
    <div class="tweet-text-box-wrap">
      <div :class="{'is-opened-effect': isOpened}" class="circle-effect"></div>
      <div class="tweet-text-box" :class="{'is-opened-text-box': isOpened}">
        <textarea :placeholder="placeholder_text" name="name" v-model="input_text"></textarea>
        <div v-on:click="sendTweet()" class="tweet-send-button">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div v-on:click="isOpened = false" class="tweet-text-box-close-button" :class="{'is-opened-close-button': isOpened}">
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>
    <div class="tweet-add-button" :class="{'is-opened-add-button': isOpened}">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket'],
  data () {
    return {
      cnt: 0,
      isOpened: false,
      input_text: '',
      placeholder_text: 'いまどうしてる？'
    }
  },
  methods: {
    openTextBox () {
      this.isOpened = true
    },
    sendTweet () {
      if (this.input_text === '') {
        return
      }
      this.socket.emit('tweet', this.input_text)
      this.input_text = ''
      this.isOpened = false
    }
  }
}
</script>

<style lang="css">

.tweeting-ui-wrap {
  /*position: fixed;*/
}

.tweet-button {
  z-index: 2;
  display: flex;
  position: fixed;
  bottom: 20px;
  right: 30px;
  border-radius: 100%;
  background-color: rgb(185, 70, 255);
  color: white;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.71);
  transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275) .5s;
  cursor: pointer;
}

.is-opened-button {
  transition: all .5s cubic-bezier(0.6, -0.28, 0.735, 0.045) 0s;
  transform: translateY(100px);
}

.is-opened-text-box {
  /*transform: scaleY(100px);*/
  /*opacity: 0;*/
}

.tweet-button i {
  position: absolute;
  top: 13px;
  left: 17px;
}

.tweet-text-box-wrap {
  position: fixed;
  margin: 0 auto;
  bottom: 0px;
  width: 100%;
  height: 70px;
  overflow: hidden;
  z-index: 1;
}

.is-opened-effect {
  transform: scale(25);
}

.circle-effect {
  position: absolute;
  bottom: -50px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: rgb(185, 70, 255);
  transition: all .8s cubic-bezier(0.895, 0.03, 0.685, 0.22) 0s;
}

.tweet-text-box {
  display: none;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(185, 70, 255);
  transition: all .5s ease-in-out 0s;
  top: 70px;
}

.is-opened-text-box {
  top: 0;
  transition: all .5s ease-in-out .5s;
}

.tweet-text-box textarea {
  /*padding: 0.2em;*/
  width: 80%;
  height: 60%;
  margin: 0 12% 0 0;
  color: white;
  font-size: 1em;
  background-color: rgb(185, 70, 255);
  border: none;
  resize: none;
  border-radius: 2px;
  /*box-shadow: 0 0 1px 0 rgba(55, 55, 55, 0.35);*/
  position: relative;
}

.tweet-text-box textarea:focus {
  outline: 0;
  /*border: none;*/
}

.tweet-text-box textarea::placeholder {
  color: rgba(255, 255, 255, 0.65);
}

.tweet-text-box-close-button {
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: -35px;
  height: 100px;
  width: 100px;
  font-size: 1.7em;
  color: white;
  cursor: pointer;
  border-radius: 100%;
  background-color: rgb(206, 22, 100);
  z-index: 0;
  transition: all .5s ease-in 0s;
  transform: translateY(100px) scale(0.8);
}

.tweet-text-box-close-button i {
  position: absolute;
  bottom: 64px;
  right: 50px;
}

.is-opened-close-button {
  transition: all .5s ease .5s;
  transform: translateY(0) scale(1);
}

.tweet-add-button {
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  left: -35px;
  height: 100px;
  width: 100px;
  font-size: 1.7em;
  color: white;
  cursor: pointer;
  border-radius: 100%;
  background-color: rgb(132, 41, 188);
  z-index: 0;
  transition: all .5s ease-in .1s;
  transform: translateY(120px);
}

.tweet-add-button i {
  position: absolute;
  bottom: 64px;
  left: 49px;
}

.is-opened-add-button {
  transition: all .5s ease .5s;
  transform: translateY(0);
}

.tweet-send-button {
  position: absolute;
  bottom: 11px;
  right: 33px;
  font-size: 2em;
  color: white;
  cursor: pointer;
}

</style>
