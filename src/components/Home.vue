<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePageTitle } from '../composables/usePageTitle';

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[] | null>(null);
const { setPageTitle } = usePageTitle();

// Set custom title for home page
onMounted(() => {
  setPageTitle('Home');
});

fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => {
    posts.value = json;
    console.log('posts fetched:', posts.value);
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
  });
</script>
<template>
  <div class="home-page">
    <h1>Posts</h1>
    
    <div v-if="posts" class="content">
      <div class="card-container">
        <div class="card" v-for="post in posts" :key="post.id">
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="card-body">{{ post.body }}</p>
          <router-link :to="`/posts/${post.id}`" class="card-link">Read more</router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="content">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading posts...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1em;
}

.content {
  width: 100%;
  min-height: 400px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  width: 100%;
}

.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1em;
  width: 300px;
  flex-shrink: 0;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: #333;
  font-weight: bold;
}

.card-body {
  font-size: 1em;
  color: #333;
}

.card-link {
  display: inline-block;
  margin-top: 1em;
  color: #42b883;
  text-decoration: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  padding: 2em;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1em;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #666;
  font-size: 1.1em;
  margin: 0;
}

h1 {
  text-align: center;
  margin-bottom: 2em;
  color: #333;
}

/* Responsive design */
@media (max-width: 768px) {
  .home-page {
    padding: 0 0.5em;
  }
  
  .card {
    width: 100%;
    max-width: 350px;
  }
  
  .loading-container {
    min-height: 200px;
    padding: 1em;
  }
}
</style>
