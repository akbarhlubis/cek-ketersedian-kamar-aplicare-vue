<script setup lang="ts">
import { ref } from 'vue';

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[] | null>(null);

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
  <div v-if="posts">
    <h1>Posts</h1>
    <div class="card-container">
      <div class="card" v-for="post in posts" :key="post.id">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-body">{{ post.body }}</p>
        <router-link :to="`/posts/${post.id}`" class="card-link">Read more</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading posts...</p>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1em;
  width: 300px;
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
</style>
