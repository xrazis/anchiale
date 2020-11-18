<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Devices
    </p>
    <div class="panel-block">
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-success is-outlined " v-on:click="getClient">
            Get clients
          </button>
        </p>
        <p class="control">
          <button class="button">
            Cancel
          </button>
        </p>
      </div>
    </div>
    <div v-if="hasClients">
      <a class="panel-block " v-for="(client, index) in clients" :key="index">
        <span class="panel-icon">
          <i class="fab fa-raspberry-pi" />
        </span>
        {{ client }}
      </a>
    </div>
    <div v-else>
      <span class="panel-block">No clients yet!</span>
    </div>
    <div v-if="error">
      <span class="panel-block">{{ error }}</span>
    </div>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        Reset all filters
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';

export default class Panel extends Vue {
  private error = '';
  private hasClients = false;
  private clients: Array<string> = [];

  getClient() {
    axios
      .get('http://localhost:3000/devices')
      .then((response) => {
        this.hasClients = true;
        this.clients = response.data;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
</script>
