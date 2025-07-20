<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Post {
  id: number;
  title: string;
  body: string;
}

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const post = ref<Post | null>(null)
const loading = ref(true)

const goBack = () => {
  router.push('/')
}

const fetchPost = async () => {
  try {
    loading.value = true
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
    const json = await response.json()
    post.value = json
  } catch (error) {
    console.error('Error fetching post:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script>
<template>
  <div class="post-detail">
    <button @click="goBack" class="back-btn">← Back to Posts</button>
    
    <div v-if="post" class="post-content">
      <h1>{{ post.title }}</h1>
      <div class="post-meta">
        <span>Post ID: {{ post.id }}</span>
      </div>
      <div class="post-body">
        <p>{{ post.body }}</p>
      </div>
    </div>
    
    <div v-else-if="loading" class="loading">
      <p>Loading post...</p>
    </div>
    
    <div v-else class="error">
      <p>Post not found</p>
    </div>
  </div>
</template>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
}

.back-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2em;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #369870;
}

.post-content h1 {
  color: #ffffff;
  margin-bottom: 1em;
  text-transform: capitalize;
}

.post-meta {
  color: #ffffff;
  margin-bottom: 1.5em;
  font-size: 0.9em;
}

.post-body {
  line-height: 1.6;
  color: #ffffff;
}

.post-body p {
  margin-bottom: 1em;
}

.loading, .error {
  text-align: center;
  padding: 2em;
  color: #666;
}

.error {
  color: #e74c3c;
}
</style>
