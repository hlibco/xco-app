<template>
  <section>
    <h1 class="header">XCO PROJECT</h1>
    <div class="auth">
      <el-form :model="authForm"
        status-icon ref="authForm"
        :rules="rules" 
        label-width="120px"
        class="demo-ruleForm"
        @submit.native.prevent="submitForm">
        <el-form-item label="Username" props="username">
          <el-input v-model="authForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="authForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('authForm')">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the username"));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      }
    };

    return {
      authForm: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    async login(event) {
      try {
        const payload = {
          username: this.authForm.username,
          password: this.authForm.pass
        };
        await this.$store.dispatch("login", payload);
        this.$router.push("/providers");
      } catch (err) {
        if (err.response.status === 400) {
          this.errors = err.response.data.param;
        } else {
          console.log("We couldn't find your account.");
        }
      }
    }
  }
};
</script>
<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
