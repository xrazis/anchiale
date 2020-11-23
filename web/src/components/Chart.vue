<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Table
    </p>
    <div class="panel-block">
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-success is-outlined " v-on:click="getData">
            Fetch Data
          </button>
        </p>
        <p class="control">
          <button class="button is-outlined" v-on:click="clearData">
            Clear
          </button>
        </p>
      </div>
    </div>
    <div v-if="hasPoint">
      <div class="mx-4 py-2" v-for="(point, index) in points" :key="index">
        {{ point }}
      </div>
    </div>
    <div v-else-if="error">
      <span class="panel-block">{{ error }}</span>
    </div>
    <div v-else>
      <span class="panel-block">No data yet, try fetching!</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';

export default class Chart extends Vue {
  private error = '';
  private hasPoint = false;
  private points = [];

  getData() {
    axios
      .get(`${process.env.VUE_APP_SERVER_URL}/measurements`)
      .then((response) => {
        this.hasPoint = true;
        this.points = response.data;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  clearData() {
    this.hasPoint = false;
  }

  createChart(chartId, chartData) {
    const ctx = document.getElementById(chartId);
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
    });
  }
}
</script>
