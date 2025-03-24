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
                <b-form @submit.prevent="submitName">
                  <div class="mb-4">
                    <b-form-group label="Your Name *">
                      <b-form-input
                        v-model="name"
                        type="text"
                        class="border-0 bg-light rounded ps-1"
                        placeholder="Enter your name"
                        required
                      />
                    </b-form-group>
                  </div>
                  <div class="align-items-center mt-0">
                    <div class="d-grid gap-2">
                      <b-button variant="primary" type="submit"> Submit </b-button>
                    </div>
                  </div>
                </b-form>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ✅ Import images correctly (No ?url)
import avatar01 from '@/assets/images/avatar/01.jpg'
import avatar02 from '@/assets/images/avatar/02.jpg'
import avatar03 from '@/assets/images/avatar/03.jpg'
import avatar04 from '@/assets/images/avatar/04.jpg'
import element02 from '@/assets/images/element/02.svg'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    // ✅ Reactive Variables
    const name = ref('')
    const userId = ref(null)
    const userData = ref(null)
    const errorMessage = ref('')

    // ✅ Fetch User Data
    const fetchUser = async () => {
      if (!userId.value) {
        console.error('❌ User ID is missing')
        errorMessage.value = 'User ID is missing.'
        return
      }

      try {
        const res = await fetch(`http://localhost:8080/api/users/${userId.value}`)
        const data = await res.json()

        if (res.ok) {
          userData.value = data
          name.value = data.name
          console.log('✅ Retrieved User:', data)
        } else {
          console.error('❌ Error fetching user:', data.message)
          errorMessage.value = data.message
        }
      } catch (error) {
        console.error('❌ Error fetching user:', error)
        errorMessage.value = 'Something went wrong. Please try again.'
      }
    }

    // ✅ Save Name
    const submitName = async () => {
      if (!name.value.trim()) {
        errorMessage.value = 'Name cannot be empty!'
        return
      }

      if (!userId.value) {
        errorMessage.value = 'User ID is missing.'
        return
      }

      try {
        console.log('🚀 Saving Name:', name.value)

        const response = await fetch(`http://localhost:8080/api/users/${userId.value}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.value })
        })

        const result = await response.json()

        if (response.ok) {
          console.log('✅ Name Saved:', result)
          router.push('/')
        } else {
          console.error('❌ Error saving name:', result.message)
          errorMessage.value = result.message
        }
      } catch (error) {
        console.error('❌ Error submitting name:', error)
        errorMessage.value = 'Failed to save name. Please try again.'
      }
    }

    // ✅ Get UserID on Mount
    onMounted(() => {
      userId.value = route.query.userId || localStorage.getItem('userId')

      if (userId.value) {
        fetchUser()
      } else {
        console.error('❌ No user ID found in query or localStorage')
      }
    })

    // ✅ Correctly return images
    return {
      name,
      userId,
      userData,
      errorMessage,
      element02, // ✅ Correct return
      avatar01, // ✅ Correct return
      avatar02,
      avatar03,
      avatar04,
      submitName
    }
  }
})
</script>
