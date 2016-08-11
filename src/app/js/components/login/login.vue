<style lang="stylus" rel="stylesheet/scss">

    .login {
        width: 100%;
        height: 100%;
        background-color: #2b2f3e;
    }

    .login-section {
        margin-top: 250px;
        text-align: center;
    }

    .login-form {
        width: 260px;
        margin: 40px auto;
        color: rgba(0, 0, 0, .87);
        font-size: 16px;
    }

    .user-password {
        margin-top: 16px;
        margin-bottom: 24px;
    }

    /*.login-btn {*/
        /*width: 100%;*/
        /*background-color: #f44336;*/
        /*color: #fff;*/
    /*}*/

    input::-webkit-input-placeholder {
        color: rgba(0, 0, 0, .54);
    }

    .v-enter, .v-leave {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        border-top-width: 0;
        border-bottom-width: 0;
    }

    .errors {
        color: #fff;
    }
</style>


<template>
    <div class="login row">
        <div class="login-section col-lg-offset-4 col-lg-4">
            <img src="../../../assets/images/logo-login.png" width=173 height=35>
            <form id="form" class="login-form" v-on:submit.prevent="login">
                <div class="user-name">
                    <input class="form-control" placeholder="Username" v-model="user.name">
                </div>
                <div class="user-password">
                    <input class="form-control" placeholder="Password" v-model="user.password" type="password"
                           @keyup.enter="login">
                </div>
                <button type="button" class="login-btn btn" @click.prevent.stop="increment">Inrement</button>
                <button type="button" class="login-btn btn" @click.prevent.stop="decrement">Derement</button>
            </form>
            <ul class="errors">
                <li v-show="!validation.name">Name cannot be empty.</li>
                <li v-show="!validation.password">Please provide a valid password</li>
            </ul>
            <display-view></display-view>
        </div>
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
