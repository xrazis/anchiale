<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome to the admin panel for anchiale
        </h1>
        <h2 class="subtitle mt-3">
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary is-inverted">
                Get clients
              </button>
            </p>
            <p class="control">
              <button class="button">
                Cancel
              </button>
            </p>
            <p class="control">
              <button class="button is-danger">
                Delete post
              </button>
            </p>
          </div>
        </h2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Hero extends Vue {}
</script>
