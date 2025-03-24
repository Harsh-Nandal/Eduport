<template>
  <main>
    <section class="p-0 d-flex align-items-center position-relative overflow-hidden">
      <b-container fluid>
        <b-row>
          <b-col
            cols="12"
            lg="6"
            class="d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100"
          >
            <div class="p-3 p-lg-5">
              <div class="text-center">
                <h2 class="fw-bold">Welcome to our largest community</h2>
                <p class="mb-0 h6 fw-light">Let's learn something new today!</p>
              </div>
              <img :src="element02" class="mt-5" alt="" />
              <div class="d-sm-flex mt-5 align-items-center justify-content-center">
                <ul class="avatar-group mb-2 mb-sm-0">
                  <li class="avatar avatar-sm">
                    <img class="avatar-img rounded-circle" :src="avatar01" alt="avatar" />
                  </li>
                  <li class="avatar avatar-sm">
                    <img class="avatar-img rounded-circle" :src="avatar02" alt="avatar" />
                  </li>
                  <li class="avatar avatar-sm">
                    <img class="avatar-img rounded-circle" :src="avatar03" alt="avatar" />
                  </li>
                  <li class="avatar avatar-sm">
                    <img class="avatar-img rounded-circle" :src="avatar04" alt="avatar" />
                  </li>
                </ul>
                <p class="mb-0 h6 fw-light ms-0 ms-sm-3">
                  4k+ Students joined us, now it's your turn.
                </p>
              </div>
            </div>
          </b-col>

          <b-col cols="12" lg="6" class="m-auto">
            <b-row class="my-5">
              <b-col sm="10" xl="8" class="m-auto">
                <span class="mb-0 fs-1">👋</span>
                <h1 class="fs-2">Login into Eduport!</h1>
                <p class="lead mb-4">Nice to see you! Please log in with your account.</p>

                <b-form @submit.prevent="handleSignIn">
                  <div v-if="error.length > 0" class="mb-4 text-danger">{{ error }}</div>
                  <div class="mb-4">
                    <b-form-group label="Email address *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span
                            class="input-group-text bg-light rounded-start border-0 text-secondary px-3"
                          >
                            <BIconEnvelopeFill />
                          </span>
                        </template>
                        <b-form-input
                          type="email"
                          class="border-0 bg-light rounded-end ps-1"
                          placeholder="E-mail"
                          v-model="credentials.email"
                          id="username-input"
                        />
                      </b-input-group>
                    </b-form-group>
                  </div>
                  <div class="mb-4">
                    <b-form-group label="Password *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span
                            class="input-group-text bg-light rounded-start border-0 text-secondary px-3"
                          >
                            <font-awesome-icon :icon="faLock" />
                          </span>
                        </template>
                        <b-form-input
                          type="password"
                          class="border-0 bg-light rounded-end ps-1"
                          placeholder="*********"
                          v-model="credentials.password"
                        />
                      </b-input-group>
                    </b-form-group>
                    <div id="passwordHelpBlock" class="form-text">
                      Your password must be 8 characters at least
                    </div>
                  </div>
                  <div class="mb-4 d-flex justify-content-between">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Remember me</label>
                    </div>
                    <div class="text-primary-hover">
                      <router-link :to="{ name: 'auth.forgot-password' }" class="text-secondary">
                        <u>Forgot password?</u>
                      </router-link>
                    </div>
                  </div>
                  <div class="align-items-center mt-0">
                    <div class="d-grid">
                      <b-button variant="primary" class="mb-0" type="submit" :disabled="loading">
                        <span v-if="!loading">Login</span>
                        <b-spinner small v-if="loading"></b-spinner>
                      </b-button>
                    </div>
                  </div>
                </b-form>

                <b-row>
                  <div class="position-relative my-4">
                    <hr />
                    <p
                      class="small position-absolute top-50 start-50 translate-middle bg-body px-5"
                    >
                      Or
                    </p>
                  </div>

                  <b-col xxl="6" class="d-grid">
                    <a href="#" class="btn bg-google mb-2 mb-xxl-0 flex-centered">
                      <font-awesome-icon :icon="faGoogle" class="fa-fw text-white me-2" />
                      Login with Google
                    </a>
                  </b-col>
                  <b-col xxl="6" class="d-grid">
                    <a href="#" class="btn bg-facebook mb-0 flex-centered">
                      <font-awesome-icon :icon="faFacebookF" class="fa-fw me-2" />
                      Login with Facebook
                    </a>
                  </b-col>
                </b-row>
                <div class="mt-4 text-center">
                  <span
                    >Don't have an account?
                    <router-link :to="{ name: 'auth.sign-up' }">Signup here</router-link>
                  </span>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// ✅ Import images properly (Ensuring compatibility with Vite & Webpack)
import avatar01 from '@/assets/images/avatar/01.jpg?url';
import avatar02 from '@/assets/images/avatar/02.jpg?url';
import avatar03 from '@/assets/images/avatar/03.jpg?url';
import avatar04 from '@/assets/images/avatar/04.jpg?url';
import element02 from '@/assets/images/element/02.svg?url';

const credentials = ref({
  email: "",
  password: "",
});

const useAuth = useAuthStore();
const route = useRoute();
const router = useRouter();
const query = route.query;

const error = ref("");
const loading = ref(false); // Loading state

// ✅ Redirect user after login
const redirectUser = () => {
  if (query.redirectedFrom) {
    return router.push(`${query.redirectedFrom}`);
  }
  return router.push("/");
};

// ✅ Fetch user profile after login
const fetchProfile = async () => {
  const token = localStorage.getItem("authToken"); // ✅ Ensure correct key is used
  if (!token) {
    console.warn("⚠️ No token found, skipping profile fetch.");
    return;
  }

  try {
    console.log("🔑 Using Token:", token);

    const response = await fetch("http://localhost:8080/api/user/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Profile Data:", data);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
  }
};

// ✅ Handle login
const handleSignIn = async () => {
  try {
    error.value = ""; // Reset error state
    loading.value = true;

    if (!credentials.value.email || !credentials.value.password) {
      console.warn("⚠️ Missing email or password");
      error.value = "Please enter email and password";
      return;
    }

    console.log("📡 Sending login request:", credentials.value);

    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials.value),
    });

    const data = await response.json();
    console.log("🔹 Received Response:", data);

    // ✅ Ensure response contains a token
    if (!response.ok || !data.token) {
      console.error("❌ API returned no token:", data);
      error.value = data.error || "Invalid login credentials";
      return;
    }

    console.log("✅ Login successful, storing token:", data.token);

    // ✅ Store token properly in localStorage
    localStorage.setItem("authToken", data.token);

    // ✅ Save session in auth store if available
    if (useAuth?.saveSession) {
      useAuth.saveSession(data.token, data.user || {}); 
    } else {
      console.warn("⚠️ useAuth.saveSession is not defined");
    }

    fetchProfile(); // ✅ Fetch user profile after login

    // ✅ Redirect user
    redirectUser();
  } catch (e) {
    console.error("❌ Login Error:", e);
    error.value = "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
};

// ✅ Check for stored token when component mounts
onMounted(() => {
  const storedToken = localStorage.getItem("authToken");
  console.log("🔑 Stored Token:", storedToken ? storedToken : "No token found");

  // ✅ Handle OAuth token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");

  if (urlToken) {
    console.log("✅ OAuth Token found in URL:", urlToken);
    localStorage.setItem("authToken", urlToken);
  }

  // ✅ Fetch user profile if token exists
  if (storedToken || urlToken) {
    fetchProfile();
  }
});
</script>