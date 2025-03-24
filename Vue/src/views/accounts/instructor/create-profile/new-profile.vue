<template>
  <TopBar1 />
  <b-col xl="12">
    <b-card no-body class="bg-transparent border rounded-3">
      <b-card-header class="bg-transparent border-bottom">
        <h3 class="card-header-title mb-0">Create Instructor Profile</h3>
      </b-card-header>
      <b-card-body>
        <b-form class="row g-4">
          <b-col cols="12" class="justify-content-center align-items-center">
            <label class="form-label">Profile Picture</label>
            <div class="d-flex align-items-center">
              <label class="position-relative me-4" for="uploadfile" title="Upload profile picture">
                <span class="avatar avatar-xl">
                  <img
                    id="uploadfile-preview"
                    class="avatar-img rounded-circle border border-white border-3 shadow"
                    :src="profilePicture"
                    alt="Profile Picture"
                  />
                </span>
                <button
                  type="button"
                  class="uploadremove flex-centered"
                  @click="removeProfilePicture"
                >
                  <BIconX class="text-white" />
                </button>
              </label>
              <label class="btn btn-primary-soft mb-0" for="uploadfile">Upload</label>
              <b-form-file class="d-none" id="uploadfile" @change="onFileChange" />
            </div>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Full Name">
              <b-form-input
                type="text"
                v-model="form.fullName"
                placeholder="Enter your full name"
                required
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Email ID">
              <b-form-input
                type="email"
                v-model="form.email"
                placeholder="Enter your email"
                required
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Phone Number">
              <b-form-input
                type="text"
                v-model="form.phone"
                placeholder="Enter your phone number"
                required
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Location">
              <b-form-input
                type="text"
                v-model="form.location"
                placeholder="Enter your location"
                required
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Bio">
              <b-form-textarea
                v-model="form.bio"
                placeholder="Tell us about yourself..."
                rows="3"
                max-rows="6"
                required
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Education">
              <div v-for="(edu, index) in form.education" :key="index" class="d-flex mb-2">
                <b-form-input
                  type="text"
                  v-model="form.education[index]"
                  placeholder="Enter qualification"
                  class="me-2"
                />
                <b-button variant="danger" @click="removeEducation(index)">Remove</b-button>
              </div>
              <b-button variant="light" size="sm" @click="addEducation">Add More</b-button>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Experience">
              <div v-for="(exp, index) in form.experience" :key="index" class="d-flex mb-2">
                <b-form-input
                  type="text"
                  v-model="form.experience[index]"
                  placeholder="Enter experience"
                  class="me-2"
                />
                <b-button variant="danger" @click="removeExperience(index)">Remove</b-button>
              </div>
              <b-button variant="light" size="sm" @click="addExperience">Add More</b-button>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-button type="button" variant="primary" @click="submitForm">Create Profile</b-button>
          </b-col>
        </b-form>
      </b-card-body>
    </b-card>
  </b-col>
  <Footer1 />
</template>

<script>
import { useRouter } from 'vue-router';
import TopBar1 from '@/views/demos/default/components/TopBar1.vue';
import Footer1 from '@/views/demos/default/components/Footer1.vue';

export default {
  components: { TopBar1, Footer1 },
  data() {
    return {
      profilePicture: null,
      selectedFile: null,
      token: "",
      form: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        education: [''],
        experience: ['']
      }
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.profilePicture = URL.createObjectURL(file);
      }
    },
    removeProfilePicture() {
      this.selectedFile = null;
      this.profilePicture = null;
    },
    addEducation() {
      if (this.form.education[this.form.education.length - 1] !== '') {
        this.form.education.push('');
      }
    },
    removeEducation(index) {
      if (this.form.education.length > 1) {
        this.form.education.splice(index, 1);
      }
    },
    addExperience() {
      if (this.form.experience[this.form.experience.length - 1] !== '') {
        this.form.experience.push('');
      }
    },
    removeExperience(index) {
      if (this.form.experience.length > 1) {
        this.form.experience.splice(index, 1);
      }
    },
    loadToken() {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        this.token = storedToken;
        console.log("✅ Loaded Token:", this.token);
      } else {
        console.warn("⚠️ No token found in localStorage.");
        this.token = "";
      }
    },
    async submitForm() {
      this.loadToken();
      if (!this.token) {
        alert("You must be logged in to create a profile!");
        return;
      }

      try {
        console.log("📡 Sending Request with Token:", this.token);
        const formData = new FormData();
        formData.append("fullName", this.form.fullName);
        formData.append("email", this.form.email);
        formData.append("phone", this.form.phone);
        formData.append("location", this.form.location);
        formData.append("bio", this.form.bio);
        formData.append("education", JSON.stringify(this.form.education.filter(e => e.trim() !== "")));
        formData.append("experience", JSON.stringify(this.form.experience.filter(e => e.trim() !== "")));

        if (this.selectedFile) {
          formData.append("profilePicture", this.selectedFile);
        }

        const response = await fetch("http://localhost:8080/api/create-instructorProfile", {
  method: "POST",
  body: formData,
  credentials: "include",
  headers: {
    Authorization: `Bearer ${this.token}`,
  },
});

const contentType = response.headers.get("content-type");

// ✅ If response is not JSON, throw an error
if (!contentType || !contentType.includes("application/json")) {
  const text = await response.text(); // Read the response as text
  console.error("❌ Server returned non-JSON response:", text);
  throw new Error("Unexpected response from server");
}

const data = await response.json();


        if (!response.ok) {
          throw new Error(data.message || "Failed to create profile");
        }

        alert("✅ Profile created successfully!");
        console.log("✅ Profile Data:", data);

        // ✅ Redirect user to home page
        this.router.push("/");
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert(error.message);
      }
    }
  },
  mounted() {
    this.loadToken();
  }
};
</script>
