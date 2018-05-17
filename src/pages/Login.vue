<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">联帮在线系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="new-password" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="new-password" placeholder="密码" @keyup.enter.native="handleSubmit2"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import md5 from 'js-md5';
import $http from 'http';
import utils from 'utils'
import routes from '../routes';
import $https from 'https';
import axios from 'axios';
import config from 'config';
export default {
  data() {
    return {
      MenuList: [],
      logining: false,
      ruleForm: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: false
    };
  },
  methods: {
    // req_getAllCity() {
    //   $http.get("api/AgentTemp/GetAllCity").then(res => {
    //     let { List } = res.data.Data
    //     if (res.data.Code == "0") {
    //       //var List = [{"Code":173,"Name":"澳门","level":[{"Code":3401,"Name":"澳门特别行政区","sort":478,"level":[]}]}]
    //       for (var i = 0; i < List.length; i++) {
    //         if (List[i].level.length == 0) {
    //           delete List[i].level;
    //         } else {
    //           for (var j = 0; j < List[i].level.length; j++) {
    //             if (List[i].level[j].level.length == 0) {
    //               delete List[i].level[j].level
    //             }
    //           }
    //         }
    //       }
    //       localStorage.setItem('address', JSON.stringify(List));
    //     } else {
    //       this.$notify({
    //         title: '错误',
    //         message: res.data.Msg,
    //         type: 'error'
    //       });
    //     }
    //   })
    // },
    compileStr(code) {
      var c = String.fromCharCode(code.charCodeAt(0) + code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return escape(c);
    },//加密函数
    uncompileStr(code) {
      code = unescape(code);
      var c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },//解密函数
    //设置cookie
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + this.compileStr(escape(cvalue)) + "; " + expires;
    },
    //获取cookie
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
          var cnameValue = this.uncompileStr(unescape(c.substring(name.length, c.length)));
          return cnameValue;
        }
      }
      return "";
    },
    //清除cookie 
    clearCookie(cname) {
      this.setCookie(cname, "", -1);
    },
    handleReset2() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          var md5Passwd = md5(this.ruleForm.checkPass);
          var loginParams = { Account: this.ruleForm.account, Passwd: md5Passwd };

          let objInstance = axios.create();
          // 添加请求拦截器
          objInstance.interceptors.request.use(function(config) {
            config.headers['Sid'] = 140
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            return config;
          }, function(error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
          let base = $https.base;
          objInstance.post(base + "/api/v1/wadmin/login", loginParams, config).then(res => {
            if (typeof (res.data) == 'string') {
              var { code, msg, data } = JSON.parse(res.data);
            } else {
              var { code, msg, data } = res.data;
            }
            if (code != 0 && code != 99) {
              this.$notify({
                title: '错误',
                message: msg,
                type: 'error'
              });
              this.logining = false;
            } else {
              if (this.checked) {
                this.$nextTick(function() {
                  this.setCookie('lbzxcustomername', this.ruleForm.account, 7)
                  this.setCookie('lbzxcustomerpass', this.ruleForm.checkPass, 7)
                })
              } else {
                this.clearCookie("lbzxcustomername");
                this.clearCookie("lbzxcustomerpass");
              }
              sessionStorage.removeItem("userMsg");
              sessionStorage.setItem('userMsg', JSON.stringify(data));

              let MenuList = data.MenuList;
              if (MenuList.length == 0) {
                this.$notify({
                  title: '错误',
                  message: "未拥有任何权限，无法登陆",
                  type: 'error'
                });
              } else {
                let serverName = MenuList[0].EachList[0].MenuName;
                let serverparentName = MenuList[0].MenuName
                for (var i = 0; i < routes.length; i++) {
                  let item = routes[i];
                  if (item.name == serverparentName) {
                    let childItem = item.children;
                    for (var j = 0; j < childItem.length; j++) {
                      if (childItem[j].name == serverName) {
                        this.$router.push({ path: childItem[j].path });
                        break;
                      }
                    }
                  }
                }
              }
              this.logining = false;
            }
          });
          // localRoutes = routes
        } else {
          return false;
        }

      });
    }
  },
  beforeDestroy() {
    document.body.style.backgroundColor = "white";
  },
  created() {
    document.body.style.backgroundColor = "#FFC445";
    if (this.getCookie('lbzxcustomername') != '' && this.getCookie('lbzxcustomerpass') != "") {
      this.ruleForm.account = this.getCookie('lbzxcustomername');
      this.ruleForm.checkPass = this.getCookie('lbzxcustomerpass');
      this.checked = true;

      // if (utils.isCorrectVal(localStorage.getItem('address'))) {
      //   //alert("有數據")
      // } else {
      //   this.req_getAllCity();
      // }

    }
  }
}

</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.login-container {
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #fff; // margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>