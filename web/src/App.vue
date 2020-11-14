<template>
  <Navbar />
  <Hero />
  <div class="columns mt-6 mb-6 mx-4">
    <div class="column is-one-fifth">
      <Panel />
    </div>
    <div class="column">
      Fourth column
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import Panel from '@/components/Panel.vue';
import Footer from '@/components/Footer.vue';

@Options({
  components: {
    Navbar,
    Hero,
    Footer,
    Panel,
  },
})
export default class App extends Vue {}
</script>
