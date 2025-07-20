<script setup lang="ts">
import { usePageTitle } from './composables/usePageTitle'

// Initialize page title management
usePageTitle()
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </router-link>
        
        <div class="nav-menu">
          <router-link to="/" class="nav-link" active-class="active">
            Home
          </router-link>
          <router-link to="/pencarian" class="nav-link" active-class="active">
            Pencarian
          </router-link>
          <router-link to="/tentang" class="nav-link" active-class="active">
            Tentang
          </router-link>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  padding: 1em;
  border-bottom: 1px solid #eee;
  margin-bottom: 2em;
  background-color: #f8f9fa;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  min-height: 60px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-menu {
  display: flex;
  gap: 2em;
  flex-shrink: 0;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5em 1em;
  border-radius: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #42b883;
}

.nav-link.active {
  background-color: #42b883;
  color: white;
}

.logo {
  height: 3em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.main-content {
  padding: 0 2em;
  margin-bottom: 5em;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0;
    border-bottom: none;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 0.5em 1em;
  }
  
  .nav-container {
    flex-direction: row;
    justify-content: center;
    gap: 0;
    max-width: 100%;
  }
  
  .nav-logo {
    display: none; /* Hide logo on mobile bottom navbar */
  }
  
  .nav-menu {
    display: flex;
    justify-content: space-around;
    width: 100%;
    gap: 0;
  }
  
  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
    min-width: 70px;
    font-size: 0.8em;
    border-radius: 8px;
  }
  
  /* Add icons to nav links on mobile */
  .nav-link::before {
    content: '';
    width: 24px;
    height: 24px;
    margin-bottom: 0.2em;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .nav-link[href="/"]::before {
    content: '🏠';
    font-size: 1.2em;
  }
  
  .nav-link[href="/pencarian"]::before {
    content: '🔍';
    font-size: 1.2em;
  }
  
  .nav-link[href="/tentang"]::before {
    content: 'ℹ️';
    font-size: 1.2em;
  }
  
  .main-content {
    padding: 1em;
    margin-bottom: 6em; /* More space for bottom navbar */
  }
}

/* Desktop styles remain the same */
@media (min-width: 769px) {
  .app-layout .navbar {
    position: static !important;
    border-top: none !important;
    border-bottom: 1px solid #eee !important;
    box-shadow: none !important;
    width: 100% !important;
  }
  
  .app-layout .nav-container {
    flex-direction: row !important;
    justify-content: space-between !important;
    gap: 2em !important;
    max-width: 1200px !important;
    width: 100% !important;
    margin: 0 auto !important;
  }
  
  .app-layout .nav-logo {
    display: flex !important;
  }
  
  .app-layout .nav-menu {
    gap: 2em !important;
    width: auto !important;
  }
  
  .app-layout .nav-link {
    display: inline-block !important;
    flex-direction: row !important;
    min-width: auto !important;
    font-size: 1em !important;
  }
  
  .app-layout .nav-link::before {
    display: none !important;
  }
  
  .app-layout .logo {
    height: 3em !important;
  }
}

/* Global reset untuk memastikan tidak ada CSS yang interfere */
* {
  box-sizing: border-box;
}

/* Tambahan untuk memastikan navbar tidak terpengaruh halaman lain */
.app-layout {
  isolation: isolate;
}
</style>
