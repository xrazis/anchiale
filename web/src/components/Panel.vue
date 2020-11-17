<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Devices
    </p>
    <a class="panel-block is-active">
      <span class="panel-icon">
        <i class="fab fa-raspberry-pi" />
      </span>
      bulma
    </a>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        Reset all filters
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Panel extends Vue {}
</script>
