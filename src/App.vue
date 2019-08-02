<template>
  <div id="app" class="app d-flex flex-column">
    <Header></Header>
    <router-view id="content" class="main_content"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.app {
  height: 100%;
  max-height: 100%;
}
.main_content {
  flex: 2;
}
</style>
