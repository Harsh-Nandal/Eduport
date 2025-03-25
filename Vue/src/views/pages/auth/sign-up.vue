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
                <img :src="element03" class="h-40px mb-2" alt="" />
                <h2>Sign up for your account!</h2>
                <p class="lead mb-4">Nice to see you! Please Sign up with your account.</p>

                <b-form>
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
                          v-model="email"
                          type="email"
                          class="border-0 bg-light rounded-end ps-1"
                          placeholder="E-mail"
                        />
                      </b-input-group>
                      <!-- ✅ Now properly closed -->
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
                          v-model="password"
                          type="password"
                          class="border-0 bg-light rounded-end ps-1"
                          placeholder="*********"
                        />
                      </b-input-group>
                    </b-form-group>
                  </div>
                  <div class="mb-4">
                    <b-form-group label="Confirm Password *">
                      <b-input-group size="lg">
                        <template #prepend>
                          <span
                            class="input-group-text bg-light rounded-start border-0 text-secondary px-3"
                          >
                            <font-awesome-icon :icon="faLock" />
                          </span>
                        </template>
                        <b-form-input
                          v-model="confirmPassword"
                          type="password"
                          class="border-0 bg-light rounded-end ps-1"
                          placeholder="*********"
                        />
                      </b-input-group>
                    </b-form-group>
                  </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="checkbox-1" />
                      <label class="form-check-label" for="checkbox-1">
                        By signing up, you agree to the<a href="#"> terms of service</a>
                      </label>
                    </div>
                  </div>
                  <div class="align-items-center mt-0">
                    <div class="d-grid">
                      <b-button
                        variant="primary"
                        class="mb-0"
                        type="button"
                        @click="signup"
                        :disabled="loading"
                      >
                        <b-spinner small v-if="loading" class="me-2"></b-spinner>
                        <span v-if="!loading">Sign Up</span>
                        <span v-else>Signing Up...</span>
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
                    <a
                      href="#"
                      class="btn bg-google mb-2 mb-xxl-0 flex-centered"
                      @click="loginWithGoogle"
                    >
                      <font-awesome-icon :icon="faGoogle" class="fa-fw text-white me-2" />
                      Signup with Google
                    </a>
                  </b-col>
                  <b-col xxl="6" class="d-grid">
                    <a
                      href="#"
                      class="btn bg-facebook mb-0 flex-centered"
                      @click="loginWithFacebook"
                    >
                      <font-awesome-icon :icon="faFacebookF" class="fa-fw me-2" />
                      Signup with Facebook
                    </a>
                  </b-col>
                </b-row>

                <div class="mt-4 text-center">
                  <b-button
                    >Already have an account?<router-link :to="{ name: 'auth.sign-in' }">
                      Sign in here</router-link
                    ></b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// Import assets (Ensure correct path handling)
import avatar01 from '@/assets/images/avatar/01.jpg?url'
import avatar02 from '@/assets/images/avatar/02.jpg?url'
import avatar03 from '@/assets/images/avatar/03.jpg?url'
import avatar04 from '@/assets/images/avatar/04.jpg?url'
import element02 from '@/assets/images/element/02.svg?url'
import element03 from '@/assets/images/element/03.svg?url'

// Import icons
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { BIconEnvelopeFill } from 'bootstrap-icons-vue'

export default defineComponent({
  name: 'SignUp',
  components: {
    BIconEnvelopeFill
  },
  setup() {
    const email = ref<string>('')
    const password = ref<string>('')
    const confirmPassword = ref<string>('')
    const errorMessage = ref<string>('')
    const successMessage = ref<string>('')
    const loading = ref(false)

    // Use Vue Router
    const router = useRouter()

    const loginWithGoogle = () => {
      window.location.href = 'http://localhost:8080/google'
    }

    const loginWithFacebook = () => {
      window.location.href = 'http://localhost:8080/facebook'
    }

    // Handle OAuth redirect
    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      if (token) {
        localStorage.setItem('token', token)
        router.push('/')
      }
    })

  const signup = async (): Promise<void> => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const res = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      }),
    });


    // ✅ Ensure response is JSON
    const contentType = res.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("❌ Response is not JSON!");
    }

    const data = await res.json();

    if (data.token) {

      // ✅ Store token properly
      localStorage.setItem("authToken", data.token);
      sessionStorage.setItem("authToken", data.token); // Optional fallback

      localStorage.setItem("userId", data.userId);

      router.push({ name: "auth.sign-up-step2", query: { userId: data.userId } });
    } else {
      console.error("❌ No token received:", data);
      errorMessage.value = data.message || "Signup failed, no token received.";
    }
  } catch (error) {
    console.error("❌ Error during signup:", error);
    errorMessage.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};





    return {
      email,
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      loading,
      loginWithGoogle,
      loginWithFacebook,
      signup,
      avatar01,
      avatar02,
      avatar03,
      avatar04,
      element02,
      element03
    }
  }
})
</script>
