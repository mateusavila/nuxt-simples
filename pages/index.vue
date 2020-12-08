<template>
  <div class="container">
    <h1>Teste feio</h1>
    <h2>Dados de page</h2>
    {{page}}

    <h2>Lista de posts</h2>
    {{posts}}
  </div>
</template>

<script>
export default {
  async asyncData ({ store, $config: { BASEAPI } }) {
    console.log(BASEAPI)
    // eu to mandando o valor de BASEAPI para as rotas
    await store.dispatch('page/loadPage', BASEAPI)
  },
  computed: {
    loading () {
      return this.$store.state.page.loaded
    },
    posts () {
      return this.$store.state.page.posts
    },
    page () {
      return this.$store.state.page.page
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
}
</style>
