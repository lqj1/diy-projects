<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form :model="user"
               status-icon
               :rules="rules"
               ref="userForm">
        <div class="title">火星</div>
        <el-form-item prop="userName">
          <el-input type="text"
                    prefix-icon="el-icon-user"
                    v-model="user.userName" />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password"
                    prefix-icon="el-icon-view"
                    v-model="user.userPwd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     class="btn-login"
                     @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          {
            required: true, message: '请输入用户名', trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ]
      }
    }
  },
  component: {
  },
  mounted () {
    // // 方法一
    // this.$request({
    //   method: 'get',
    //   url: '/login',
    //   data: {
    //     name: 'jack'
    //   }
    // }).then((res) => {
    //   console.log(res);
    // })
    // 方法二
    // this.$request.get('/login', { name: 'jack' }).then(() => {
    //   console.log(res);
    // })
  },
  methods: {
    login () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then((res) => {
            // 提交mutation中定义的方法,使用vuex
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome')
          })
        }
      })
    },
    goHome () {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 40px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>