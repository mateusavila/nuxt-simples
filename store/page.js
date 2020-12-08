export const state = () => ({
  loaded: false,
  page: {
    // Aqui tu bota os valores do teu ACF. 
    acf: {
      
    },
    title: ''
  },
  posts: []
})
export const getters = {
  loaded: state => state.loaded,
  page: state => state.page,
  posts: state => state.posts
}
export const mutations = {
  // estas mutações mudam os dados dos estados. A primeira vai dizer para state.loaded para parar de carregar
  updateLoaded (state, loaded) { state.loaded = loaded },
  // a segunda vai alimentar a página
  updatePage (state, page) { state.page = page },
  // a terceira vai alimentar a lista de posts
  updatePosts (state, posts) { state.posts = posts }
}
export const actions = {
  loadPage ({ commit, state }, BASEAPI) { 
    // este state.loaded é pra evitar que o site fique carregando doidamente
    if (!state.loaded) {
      Promise.all([
        // a primeira hora está carregando a home. Tu pode pesquisar mais em https://developer.wordpress.org/rest-api/reference/posts/
        fetch(BASEAPI + '/wp/v2/pages/?slug=home&_fields=acf,title', { mode: 'cors' }),
        // esta rota aqui puxa as notícias, por exemplo.
        fetch(BASEAPI + '/wp/v2/posts/?_fields=acf,title,categories,slug&per_page=12&page=1', { mode: 'cors' }),
      ]).then(async ([pageResource, postsResource]) => {
        const page = await pageResource.json()
        const posts  = await postsResource.json()
        return { page, posts }
      }).then((response) => {
        // aqui estamos alimentando o state com os conteúdos de verdade. Repare que o WP sempre manda um array.
        commit('updatePage', response.page[0])

        // aqui estamos alimentando a lista de posts
        commit('updatePosts', response.posts)
        
        // aqui estamos avisando a VUEX para parar de puxar dados. ele puxa uma vez apenas por carregamento. 
        commit('updateLoaded', true)
      })
    }
  }
}