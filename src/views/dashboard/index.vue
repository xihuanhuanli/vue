<template>
  <div class="dashboard-container">
    <div class="dashboard-text">welcome !! {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GLOBAL from '@/api/global_variable'

export default {
  created() {
    this.hello()
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    hello() {
        if(GLOBAL.userRole.includes('admin')){
            this.$router.options.routes[5].hidden=false
          }
  }
}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
