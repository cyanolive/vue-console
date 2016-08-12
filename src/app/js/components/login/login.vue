<style>
    .login-container {
        margin-top: 100px;
    }

    .login-header h3 {
        margin-top: 30px;
        margin-bottom: 10px;
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
    }

    .login-button {
        margin-top: 30px;
    }

    .login-footer {
        padding-top: 40px;
        margin-bottom: 40px;
    }
</style>

<template>
    <div class="container login-container">
        <div class="row">
            <div class="card col s12 l8 offset-l2 m8 offset-m2 z-depth-5">
                <div class="login-header">
                    <h3>WeiyouBot</h3>
                </div>
                <div class="col s10 offset-s1 l8 offset-l2">
                    <form class="form login-form">
                        <!--<div class="input-field">-->
                        <!--<i class="material-icons prefix">account_circle</i>-->
                        <!--<input id="icon_prefix" type="text" class="validate">-->
                        <!--<label for="icon_prefix">Username</label>-->
                        <!--</div>-->
                        <text-field icon="account_circle" label="Username" type="email"
                                    error-message="wrong e-mail" :validate-func.sync="validation" validate>

                        </text-field>
                        <div class="input-field">
                            <i class="material-icons prefix">vpn_key</i>
                            <input id="icon_telephone" type="password" class="validate">
                            <label for="icon_telephone">Password</label>
                        </div>
                        <div class="center-align login-button">
                            <button type="button" class="waves-effect waves-dark btn white black-text z-depth-4"
                                    @click.prevent.stop="login">LOG IN
                            </button>
                        </div>
                    </form>
                    <div class="login-footer grey-text center-align">
                        Welcome To WeiyouBot Console
                    </div>
                </div>
            </div>
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
                },
                validation: function (context) {
                    var object = $(context.$els.input);
                    var len = object.val().length;
                    return len > 0;
                }.bind(this)
            }
        },

        components: {
            DisplayView,
            'text-field': require('_muv-components/forms/text-field.vue')
        },

        compiled: function () {
            $("body").addClass("light-blue");
        },

        computed: {
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
