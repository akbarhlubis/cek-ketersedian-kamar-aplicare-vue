<template>
  <div class="tentang-page">
    <div class="hero-section">
      <h1>Tentang Aplikasi</h1>
      <p class="hero-subtitle">Aplikasi Vue.js untuk Cek Ketersediaan Kamar</p>
    </div>
    
    <div class="content-section">
      <div class="info-card">
        <h2>Tentang Proyek</h2>
        <p>
          Aplikasi ini dibuat menggunakan Vue.js 3 dengan TypeScript untuk menampilkan 
          dan mengelola data post dari JSONPlaceholder API. Fitur utama termasuk:
        </p>
        <ul>
          <li>Menampilkan daftar post dengan pagination</li>
          <li>Pencarian post berdasarkan judul dan konten</li>
          <li>Detail view untuk setiap post</li>
          <li>Responsive design untuk berbagai ukuran layar</li>
        </ul>
      </div>
      
      <div class="tech-stack">
        <h2>Teknologi yang Digunakan</h2>
        <div class="tech-grid">
          <div class="tech-item">
            <h3>Vue.js 3</h3>
            <p>Framework JavaScript progressive untuk membangun user interface</p>
          </div>
          <div class="tech-item">
            <h3>TypeScript</h3>
            <p>Superset dari JavaScript yang menambahkan static typing</p>
          </div>
          <div class="tech-item">
            <h3>Vue Router</h3>
            <p>Official router untuk Vue.js untuk single-page applications</p>
          </div>
          <div class="tech-item">
            <h3>Vite</h3>
            <p>Build tool yang cepat untuk development dan production</p>
          </div>
        </div>
      </div>
      
      <div class="features">
        <h2>Fitur Aplikasi</h2>
        <div class="feature-list">
          <div class="feature-item">
            <h3>📱 Responsive Design</h3>
            <p>Interface yang menyesuaikan dengan berbagai ukuran layar</p>
          </div>
          <div class="feature-item">
            <h3>🔍 Pencarian Real-time</h3>
            <p>Cari post berdasarkan judul atau konten secara langsung</p>
          </div>
          <div class="feature-item">
            <h3>📄 Pagination</h3>
            <p>Navigasi yang mudah untuk menampilkan banyak data</p>
          </div>
          <div class="feature-item">
            <h3>⚡ Performance</h3>
            <p>Loading yang cepat dengan optimisasi Vite</p>
          </div>
        </div>
      </div>
      
      <div class="contact-info">
        <h2>Informasi Kontak</h2>
        <p>Dikembangkan dengan ❤️ menggunakan Vue.js</p>
        <p>Untuk informasi lebih lanjut, silakan hubungi developer.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePageTitle } from '../composables/usePageTitle'

const { setPageTitle } = usePageTitle();

// Set custom title for about page
onMounted(() => {
  setPageTitle('Tentang');
});
</script>

<style scoped>
.tentang-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 3em 0;
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3em;
}

.hero-section h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2em;
  color: #333;
  opacity: 0.9;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 3em;
}

.info-card {
  background: #f8f9fa;
  padding: 2em;
  border-radius: 12px;
  border-left: 4px solid #42b883;
}

.info-card h2 {
  color: #333;
  margin-bottom: 1em;
}

.info-card p {
  color: #555;
  line-height: 1.6;
}

.info-card ul {
  margin-left: 1.5em;
  line-height: 1.8;
  color: #555;
}

.info-card li {
  margin-bottom: 0.5em;
}

.tech-stack h2,
.features h2,
.contact-info h2 {
  color: #333;
  margin-bottom: 1.5em;
  text-align: center;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5em;
}

.tech-item {
  background: white;
  padding: 1.5em;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.tech-item h3 {
  color: #42b883;
  margin-bottom: 0.5em;
}

.tech-item p {
  color: #666;
  font-size: 0.9em;
}
.feature-list {
  color: #333;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2em;
}

.feature-item {
  background: white;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item h3 {
  color: #333;
  margin-bottom: 1em;
  font-size: 1.1em;
}

.contact-info {
  background: #42b883;
  color: white;
  padding: 2em;
  border-radius: 12px;
  text-align: center;
}

.contact-info h2 {
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2em;
  }
  
  .hero-subtitle {
    font-size: 1em;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
  
  .info-card,
  .tech-item,
  .feature-item,
  .contact-info {
    padding: 1.5em;
  }
}
</style>
