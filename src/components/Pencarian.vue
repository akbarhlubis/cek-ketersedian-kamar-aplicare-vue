<template>
  <div class="pencarian-page">
    <h1>Pencarian</h1>
    <div class="search-container">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari post..." 
          class="search-input"
          @input="searchPosts"
        />
        <button @click="searchPosts" class="search-btn">
          Cari
        </button>
      </div>
      
      <div v-if="searchQuery && !loading" class="search-info">
        <p>Menampilkan {{ filteredPosts.length }} hasil untuk "{{ searchQuery }}"</p>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Mencari...</p>
        </div>
      </div>
      
      <div v-if="filteredPosts.length > 0" class="results">
        <div class="card-container">
          <div class="card" v-for="post in filteredPosts" :key="post.id">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-body">{{ post.body }}</p>
            <router-link :to="`/posts/${post.id}`" class="card-link">Read more</router-link>
          </div>
        </div>
      </div>
      
      <div v-else-if="searchQuery && !loading" class="no-results">
        <p>Tidak ada hasil ditemukan untuk "{{ searchQuery }}"</p>
      </div>
      
      <div v-else-if="!searchQuery" class="search-prompt">
        <p>Masukkan kata kunci untuk mencari post</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePageTitle } from '../composables/usePageTitle'

interface Post {
  id: number;
  title: string;
  body: string;
}

const searchQuery = ref('')
const posts = ref<Post[]>([])
const loading = ref(false)
const { setPageTitle } = usePageTitle();

// Set custom title for search page
onMounted(() => {
  setPageTitle('Pencarian');
});

const filteredPosts = computed(() => {
  if (!searchQuery.value) return []
  
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const searchPosts = async () => {
  if (!searchQuery.value.trim()) return
  
  if (posts.value.length === 0) {
    loading.value = true
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/')
      const json = await response.json()
      posts.value = json
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.pencarian-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1em;
  width: 100%;
}

.search-container {
  margin-top: 2em;
  width: 100%;
}

.search-box {
  display: flex;
  gap: 1em;
  margin-bottom: 2em;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.search-btn {
  padding: 0.75em 1.5em;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s ease;
}

.search-btn:hover {
  background: #369870;
}

.search-info {
  margin-bottom: 1em;
  color: #666;
}

.loading {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.no-results {
  text-align: center;
  padding: 2em;
  color: #999;
}

.search-prompt {
  text-align: center;
  padding: 2em;
  color: #666;
  font-style: italic;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  width: 100%;
  justify-content: center;
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
  font-size: 1.2em;
  margin-bottom: 0.5em;
  color: #333;
  font-weight: bold;
}

.card-body {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 1em;
}

.card-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}

.card-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
  }
  
  .card {
    width: 100%;
  }
}
</style>
