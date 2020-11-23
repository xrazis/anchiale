<template>
  <div>
    <Navbar />
    <Hero />
    <div class="columns mt-6 mb-6 mx-4">
      <div class="column is-one-fifth mx-2">
        <Panel />
      </div>
      <div class="column mx-2">
        <Tile />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import Panel from '@/components/Panel.vue';
import Tile from '@/components/Tile.vue';
import Footer from '@/components/Footer.vue';

@Options({
  components: {
    Navbar,
    Hero,
    Panel,
    Tile,
    Footer,
  },
})
export default class App extends Vue {}
</script>
