<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{path: '/'}"
                        v-for="item in breadList"
                        :key="item.path">
      <router-link to="/welcome"
                   v-if="index==0">{{item.meta.title}}</router-link>
      <span v-else>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  computed: {
    breadList () {
      return this.$route.matched;
    }
  },
  mounted () {
    console.log('routers: ', this.$route);
  }
}
</script>

<style lang="scss" scoped>

</style>