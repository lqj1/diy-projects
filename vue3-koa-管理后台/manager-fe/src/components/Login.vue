<template>
  <h1>Login页面</h1>
  <el-button @click="goHome">回首页</el-button>
</template>

<script>
import Welcome from './Welcome.vue'
export default {
  name: 'login',
  component: {
    Welcome
  },
  mounted () {
    // 方法一
    this.$request({
      method: 'get',
      url: '/login',
      data: {
        name: 'jack'
      }
    }).then((res) => {
      console.log(res);
    })
    // 方法二
    // this.$request.get('/login', { name: 'jack' }).then(() => {
    //   console.log(res);
    // })
  },
  methods: {
    goHome () {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>