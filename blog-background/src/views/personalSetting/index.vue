<template>
  <div class="personalSetting-container">
    <div class="form-input">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input :disabled="true" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录ID" prop="admin">
          <el-input v-model="form.admin" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input type="password" v-model="form.passwordCheck"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getInfo, changeInfo } from "@/api/user.js";
export default {
  name: "",
  props: [""],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        admin: "",
        password: "",
        passwordCheck: "",
        oldPassword: "",
        name: "",
      },
      rules: {
        admin: [
          {
            required: true,
            max: 10,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            max: 15,
            minx: 6,
            trigger: "blur",
            message: "请输入密码,密码最少为6位数，最大15位数",
          },
        ],
        passwordCheck: [
          {
            required: true,
            max: 15,
            minx: 6,
            trigger: "blur",
            message: "请再次输入密码,密码最少为6位数，最大15位数",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        oldPassword: [
          {
            required: true,
            max: 15,
            minx: 6,
            trigger: "blur",
            message: "请输入旧密码,最少为6位数，最大15位数",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},
  created() {
    this.fetchData();
    this.resetForm();
  },
  methods: {
    fetchData() {
      getInfo().then(({ data }) => {
        this.form.name = data.name;
      });
    },
    resetForm() {
      this.form.admin = "";
      this.form.password = "";
      this.form.passwordCheck = "";
      this.form.oldPassword = "";
    },
    submitForm() {
      var obj = {
        name: this.form.name,
        loginId: this.form.admin,
        loginPwd: this.form.password,
        oldLoginPwd: this.form.oldPassword,
      };
      if (
        this.form.name &&
        this.form.admin &&
        this.form.password &&
        this.form.oldPassword &&
        this.form.passwordCheck &&
        this.form.passwordCheck === this.form.password
      ) {
        changeInfo(obj).then((res) => {
          console.log(res);
          if (typeof res === "string") {
            this.$message({
              message: "账号密码不正确",
              type: "error",
            });
          } else {
            this.$message({
              message: "修改成功,请重新登录",
              type: "success",
            });
            this.$store.dispatch("user/logout").then(() => {
              this.$router.push("login");
            });
          }
        });
      } else {
        this.$message({
          message: "内容有误",
          type: "error",
        });
        console.log(this.form);
      }
    },
  },

  watch: {},
};
</script>
<style scoped>
.personalSetting-container {
  margin: 30px;
  width: 30vw;
}
</style>