<template>
    <div>
        <router-view
                v-bind:app-config="appConfig">
        </router-view>
    </div>
</template>

<script>

    export default {

        name: 'Commodity',

        // 这里定义 props 数据，包括 父组件传递下来的（必须在这里定义一次） 和 该模板自定义的 props 数据。
        props: {
            appConfig: Object,
        },

        data () {
            return {
                privateState: {},
                // sharedState: store.data.state
            }
        },

        route: {
            activate: function (transition) {
                console.log('hook-example activated!')
                transition.next()
            },
            deactivate: function (transition) {
                console.log('hook-example deactivated!')
                transition.next()
            }
        },

        created () {
            console.log(this.appConfig.login)
        },

    }
</script>
