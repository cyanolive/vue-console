<style lang="stylus">

#wrapper
  position relative
  padding 0
  width 100%

@media screen and (max-width: 700px)
  html, body
    margin 0
  #wrapper
    width 100%
</style>

<template>
    <div id="wrapper" class="wrapper container-fluid">
        <router-view
                class="view"
                keep-alive
                transition
                transition-mode="out-in"
                v-bind:app-config="appConfig">
        </router-view>
    </div>
</template>

<script>
    import store from '_store/store.js'

    export default {
        data () {
            return {
                appConfig: {
                    login: false
                }
            }
        },
        /*生命周期*/
        created () {

        },

        beforeCompile () {

        },

        compiled () {

        },

        compiled () {

        },

        ready () {

        },

        beforeDestroy () {

        },

        destroyed () {

        },

        store: store
    }
</script>
