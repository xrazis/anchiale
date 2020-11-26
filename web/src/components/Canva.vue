<template>
  <canvas id="chart"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';
import Chart from 'chart.js';

export default class Canva extends Vue {
  @Prop() readonly points!: [];

  mounted() {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '-60m',
          '-55m',
          '-50m',
          '-45m',
          '-40m',
          '-35m',
          '-30m',
          '-25m',
          '-20m',
          '-15m',
          '-10m',
          '-5m',
        ],
        datasets: [
          {
            // one line graph
            label: 'Number of Moons',
            data: [0, 0, 1, 2, 37, 42, 27, 14, null, 10, 10, 55],

            borderColor: [
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 5,
                max: 60,
              },
            },
          ],
        },
      },
    });
  }
}
</script>

<style></style>
