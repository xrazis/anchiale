<template>
  <div>
    <Navbar />
    <Hero />
    <div class="columns mt-6 mb-6 mx-4">
      <div class="column is-one-fifth mx-2">
        <Devices />
      </div>
      <div class="column mx-2">
        <Chart />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import Devices from '@/components/Devices.vue';
import Chart from '@/components/Chart.vue';
import Footer from '@/components/Footer.vue';

@Options({
  components: {
    Navbar,
    Hero,
    Devices,
    Chart,
    Footer,
  },
})
export default class App extends Vue {}
</script>
