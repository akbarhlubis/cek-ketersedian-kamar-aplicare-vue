<script setup lang="ts">
// App.vue now serves as the main layout
// Posts logic will be moved to a separate component
</script>

<template>
  <div>
    <nav class="navbar">
      <router-link to="/" class="nav-logo">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </router-link>
    </nav>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  padding: 1em;
  border-bottom: 1px solid #eee;
  margin-bottom: 2em;
  display: flex;
  justify-content: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

main {
  padding: 0 2em;
}

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
