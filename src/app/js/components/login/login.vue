<style lang="stylus" rel="stylesheet/scss">

</style>

<template>
    <div class="container">
        <div class="card large blue-grey darken-1">
            <div class="row">
                <form class="col s12">
                    <input type="text" class="validate">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" class="validate">
                            <label for="icon_prefix">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">phone</i>
                            <input id="icon_telephone" type="tel" class="validate">
                            <label for="icon_telephone">Telephone</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <a class="btn" onclick="Materialize.toast('I am a toast!', 3000, 'btn')">Toast!</a>
    </div>
</template>


<script>
    import Vue from 'vue'
    import {post} from '_api/callAPI.js'
    import {SHA1} from '_util/sha1'
    import {incrementCounter, decrementCounter} from '_vuex/actions.js'
    import DisplayView from '_components/login/DisplayView.vue'

    export default {

        name: 'Login',

        data () {
            return {
                user: {
                    name: '',
                    password: ''
                }
            }
        },

        components: {
            DisplayView
        },

        computed: {
            validation () {
                return {
                    name: !!this.user.name.trim(),
                    password: !!this.user.password.trim()
                }
            },
            isValid () {
                var validation = this.validation
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            }
        },

        http: {
            headers: {'session-token': 'log-in'}
        },

        methods: {
            login () {
//                var self = this;
//                if (this.isValid) {
//                    var params = {
//                        user_name: this.user.name,
//                        hashed_password: SHA1(this.user.password)
//                    };
//                    this.user.name = ''
//                    this.user.password = ''
//                    post(this, '/console/api/console/login', params, function (data, status, request) {
//                        if (data.sta === 0) {
//                            router.go('./home/commodity/catalog');
//                        } else {
//                            alert('failed to log in !')
//                        }
//                    });
//                }

            }
        },

        vuex: {
            actions: {
                increment: incrementCounter,
                decrement: decrementCounter
            }
        }
    }
</script>
