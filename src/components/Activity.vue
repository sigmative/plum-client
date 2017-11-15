<template lang="html">
  <div id="activity">
    <h1>Activity</h1>

  </div>
</template>

<script>
export default {
  name: 'Activity',
  data () {
    return {
      works: [
        { id: 0,
          msg: 'A' },
        { id: 1,
          msg: 'B' },
        { id: 2,
          msg: 'C' }
      ]
    }
  }
}
</script>

<style scoped lang="css">


.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

</style>
