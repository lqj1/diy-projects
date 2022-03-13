<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
export default {
  name: 'app',
  mounted () {
    // storage测试
    // this.$storage.setItem('userInfo', { age: 30, name: 'jack' })
    // console.log('user=>', this.$storage.getItem('userInfo'));
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import './assets/style/reset.css';
@import './assets/style/index.scss'
</style>
