<template>
  <AdminLayout>
    <b-row>
      <b-col cols="12" class="text-center">
        <img :src="error404" class="h-200px h-md-400px mb-4" alt="">
        <h1 class="display-1 text-danger mb-0">404</h1>
        <h2>Oh no, something went wrong!</h2>
        <p class="mb-4">Either something went wrong or this page doesn't exist anymore.</p>
        <router-link :to="{name: 'admin.dashboard'}" class="btn btn-primary mb-0">Go to Dashboard</router-link>
      </b-col>
    </b-row>
  </AdminLayout>
</template>
<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import error404 from '@/assets/images/element/error404-01.svg';
</script>