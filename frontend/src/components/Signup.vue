<template>
  <div>
    <Header />

    <div class="container">

    <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-upload" aria-selected="true">Log in</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-verify" aria-selected="false">Register</a>
        </li>
    </ul>

    <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label for="">Email:</label>
                            <input type="email" required class="form-control" placeholder="eg chris@invoiceapp.com" v-model="model.email">
                        </div>
                        <div class="form-group">
                            <label for="">Password:</label>
                            <input type="password" required class="form-control" placeholder="Enter Password" v-model="model.password">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-success btn-light btn-large" >Login</button>
                            {{ loading }}
                            {{ status }}
                        </div>
                    </form> 
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="register">
                        <div class="form-group">
                            <label for="">Name:</label>
                            <input type="text" required class="form-control" placeholder="eg Chris" v-model="model.name">
                        </div>

                        <div class="form-group">
                            <label for="">Email:</label>
                            <input type="email" required class="form-control" placeholder="eg chris@invoiceapp.com" v-model="model.email">
                        </div>
                        
                        <div class="form-group">
                            <label for="">Company Name:</label>
                            <input type="text" required class="form-control" placeholder="eg Chris Tech" v-model="model.company_name">
                        </div>
                        <div class="form-group">
                            <label for="">Password:</label>
                            <input type="password" required class="form-control" placeholder="Enter Password" v-model="model.password">
                        </div>
                        <div class="form-group">
                            <label for="">Confirm Password:</label>
                            <input type="password" required class="form-control" placeholder="Confirm Passowrd" v-model="model.c_password">
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary" >Register</button>
                            {{ loading }}
                            {{ status }}
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
        c_password: "",
        company_name: ""
      },
      loading: "",
      status: ""
    };
  },
  methods: {
    validate() {
      // checks all the form params are set and the passwords match
      if (this.model.password != this.model.c_password) {
        return false;
      }
      return true;
    },
    register() {
      const formData = new FormData();
      let valid = this.validate();
      if (valid) {
        formData.append("name", this.model.name);
        formData.append("email", this.model.email);
        formData.append("company_name", this.model.company_name);
        formData.append("password", this.model.password);
        this.loading = "Registering you, please wait";
        // Post to server
        axios.post("http://localhost:3128/api/register", formData).then(res => {
          // Post a status message
          this.loading = "";
          if (res.data.status == true) {
            // store the data in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // now send the user to the next route
            this.$router.push({
              name: "Dashboard"
            });
          } else {
            this.status = res.data.message;
          }
        });
      } else {
        alert("Passwords do not match");
      }
    },
    login() {
      const formData = new FormData();
      formData.append("email", this.model.email);
      formData.append("password", this.model.password);
      this.loading = "Signing in";
      // Post to server
      axios.post("http://localhost:3128/api/login", formData).then(res => {
        // Post a status message
        console.log(res);
        this.loading = "";
        if (res.data.status == true) {
          // store the data in localStorage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // now send the user to the next route
          this.$router.push({
            name: "Dashboard"
          });
        } else {
          this.status = res.data.message;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #426cb9;
}
</style>

