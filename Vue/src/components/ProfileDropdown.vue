<template>
  <template v-if="isLoggedIn">
    <DropDown :custom-class="className">
      <a class="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside"
        data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
        <img class="avatar-img rounded-circle" :src="instructor.profilePicture ? instructor.profilePicture : user.avatar" alt="avatar" />
      </a>
      <ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
        <li class="px-3 mb-3">
          <div class="d-flex align-items-center">
            <div class="avatar me-3">
              <img class="avatar-img rounded-circle shadow" :src="instructor.profilePicture ? instructor.profilePicture : user.avatar" alt="avatar" />
            </div>
            <div>
              <a class="h6" href="#">{{ user.name }}</a>
              <p class="small m-0">{{ user.email }}</p>
            </div>
          </div>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#"><BIconPerson class="fa-fw me-2" />Edit Profile</a></li>
        <li><a class="dropdown-item" href="#"><BIconGear class="fa-fw me-2" />Account Settings</a></li>
        <li><a class="dropdown-item" href="#"><BIconInfoCircle class="fa-fw me-2" />Help</a></li>
        <li><a class="dropdown-item bg-danger-soft-hover" href="#" @click="logout">
            <BIconPower class="fa-fw me-2" />Sign Out
          </a></li>
        <li><hr class="dropdown-divider"></li>
      </ul>
    </DropDown>
  </template>

  <!-- Show Login & Sign Up buttons when user is NOT logged in -->
 <div v-else class="d-flex align-items-center gap-2" style="min-width: 200px;">
  <router-link to="/auth/sign-in" class="btn btn-outline-primary">Sign In</router-link>
  <router-link to="/auth/sign-up" class="btn btn-primary">Sign Up</router-link>
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DropDown from '@/components/DropDown.vue';
import { BIconPerson, BIconGear, BIconInfoCircle, BIconPower } from 'bootstrap-icons-vue';
import avatar01 from '@/assets/images/avatar/08.jpg';

const router = useRouter();
const user = ref({ name: 'Guest', email: 'guest@example.com', avatar: avatar01 });
const instructor = ref({}); // ✅ FIX: Define instructor as a ref()
const isLoggedIn = ref(false);

// ✅ Fetch user profile with instructor's profilePicture
const fetchUserProfile = async () => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.warn("⚠️ No token found. User is not logged in.");
    isLoggedIn.value = false;
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/user/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    
    console.log("✅ API Response:", data);

    let profilePic = data.profilePicture;

    // ✅ Ensure profilePicture is a valid URL
    if (profilePic && profilePic.startsWith("http")) {
      profilePic = profilePic.replace("http://localhost:8080", ""); // Remove incorrect localhost prefix
    } else {
      profilePic = avatar01; // Default image
    }

    user.value = {
      name: data.name || "Guest",
      email: data.email || "guest@example.com",
      avatar: profilePic
    };

    isLoggedIn.value = true;
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    isLoggedIn.value = false;
  }
};


// ✅ Logout function
const logout = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  isLoggedIn.value = false;
  router.push("/auth/sign-in");
};

// Fetch user profile when component mounts
onMounted(fetchUserProfile);
</script>
