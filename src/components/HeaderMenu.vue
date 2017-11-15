<template lang="html">
  <div id="menu">
    <div id="menu-list">
      <router-link to="/">
      <div v-on:click="moveMenuBar(0)" id="link-top" class="menu-link">
        <p>
          <i class="fa fa-home fa-lg" aria-hidden="true"></i>
        </p>
      </div></router-link>
      <router-link to="/activity">
      <div v-on:click="moveMenuBar(1)" id="link-works" class="menu-link">
        <p>
          <i class="fa fa-bell" aria-hidden="true"></i>
        </p>
      </div></router-link>
      <router-link to="/messages">
      <div v-on:click="moveMenuBar(2)" id="link-about" class="menu-link">
        <p>
          <i class="fa fa-envelope" aria-hidden="true"></i>
        </p>
      </div></router-link>
    </div>
    <div class="right-side-wrap">
      <div class="user-icon" v-if="user_data">
        <img :src="user_data.profile_image_url" alt="">
      </div>
      <div class="app-name">
        Plum
      </div>
    </div>
    <div :class="{'menu-bar-moving': is_move}" class="menu-bar" :style="{left:selected_num*70+'px'}"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['user_data'],
  data: function () {
    return {
      selected_num: 0,
      is_move: false,
      user_profile: {}
    }
  },
  methods: {
    moveMenuBar (n) {
      this.selected_num = n
      this.is_move = true
    }
  }
}
</script>

<style lang="css">


#menu {
  z-index: 1;
  width: 100%;
  height: 60px;
  margin: 0;
  /*position: absolute;*/
  top:0;
  position: fixed;
  background-color: rgb(185, 70, 255);
  box-shadow: 0px 0px 3px -1px black;
  display: flex;
  justify-content: space-between;
}

#menu-list {
  height: 100%;
  display: flex;
  list-style: none;
}

.menu-link {
  height: 100%;
  width: 30px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  background-color: inherit;
  text-decoration: none;
  position: relative;
  font-size: 1.2em;
}

.app-name {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100px;
  font-size: 1.5em;
  font-weight: bold;
}

.menu-link:hover {
  /*background-color: rgba(82, 82, 82, 0.3);*/
  /*font-size: 17px;*/
  /*text-decoration: underline;*/
}

.menu-link::before {
  background-color: white;
  z-index: 0;
  width: 100%;
  content: '';
  display: block;
  height: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all .3s ease .4s;
}

.router-link-exact-active .menu-link::before {
  height: 100%;
}

.menu-link::after {
  position: absolute;
  content: '';
  display: block;
  background-color: white;
  top: 0em;
  left: 50%;
  height: 3px;
  width: 0;
  transition: all .3s ease 0s;
}

.menu-link:hover::after {
  left: 0;
  width: 100%;
  transition: all .3s ease 0s;
}

.menu-link p {
  z-index: 1;
  transition: all .5s ease .3s;
  color: white;
}

.router-link-exact-active p {
  color: rgb(185, 70, 255);
  transition: all .3s ease .3s;
}

.menu-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 70px;
  height: 5px;
  background-color: white;
  transition: all .4s ease-in-out;
}

.menu-bar-moving {
  /*transition: all ease;*/
  /*animation: menu-bar-move-anim .5s ease;*/
}

@keyframes menu-bar-move-anim {
  0%{
    border-radius: 0;
  }
  50%{
    border-radius: 10px;
  }
  100%{
    border-radius: 0;
  }
}

.right-side-wrap {
  display: flex;
}

.user-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-icon img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

</style>
