<template>
  <h1>Welcome页面</h1>
  <el-button @click="goLogin">去登录</el-button>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goLogin = () => {
  router.push('/Login')
}
</script>

<style lang="scss" scoped>

</style>