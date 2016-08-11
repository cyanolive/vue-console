<style lang="stylus" rel="stylesheet/scss">

    .list-demo, .modal-demo, .table-demo, .shoppingcart-demo {
        display: none;
    }

    li {
        position: relative
    }

    a.v-link-active:before {
        content: '';
        display: inline-block;
        background-image: url(../../../assets/images/active.png);
        background-size: 100%;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-position: center center;
        vertical-align: middle;
        position: absolute;
        left: -30px;
        top: 4px;
    }

    .sub-ul {
        margin-left: 6px;
    }
</style>

<template>
    <div id="home" class="home">

        <!-- header -->
        <header id="header">
            <a href="#" class="logo"><img src="../../../assets/images/logo.png"></a>
        </header>

        <!-- main view -->
        <div class="app-container clearfix">
            <div class="container-sidebar pull-left">
                <ul v-el:root>
                    <li class="commodity" @click.self="clickMenu">
                        <a @click.self="clickMenu">Commodity</a>
                        <ul class="sub-ul" v-el:commodity>
                            <li><a v-link="{path: '/home/commodity/catalog'}">Catalog</a></li>
                            <li><a v-link="{path: '/home/commodity/addProduct'}">Add</a></li>
                            <li><a v-link="{path: '/home/commodity/classification'}">Classification</a></li>
                            <li><a v-link="{path: '/home/commodity/installments'}">Installments</a></li>
                            <li><a v-link="{path: '/home/commodity/banner'}">Banner</a></li>
                        </ul>
                    </li>
                    <li class="user-list" @click.self="clickMenu">
                        <a @click.self="clickMenu">User</a>
                        <ul class="sub-ul" v-el:user>
                            <li><a v-link="{path: '/home/user'}">User List</a></li>
                            <li><a v-link="{path: '/home/sensitiveWords'}">Sensitive words</a></li>
                        </ul>
                    </li>
                    <li class="order-forms" @click.self="clickMenu">
                        <a @click.self="clickMenu">Orders</a>
                        <ul class="sub-ul" v-el:order>
                            <li><a v-link="{path: '/home/orders'}">Order List</a></li>
                            <li><a v-link="{path: '/home/shares'}">Share Orders</a></li>
                        </ul>
                    </li>
                    <li class="push-list" @click.self="clickMenu">
                        <a @click.self="clickMenu">Push</a>
                        <ul class="sub-ul" v-el:push>
                            <li><a v-link="{path: '/home/preRelease'}">Pre-Release</a></li>
                            <li><a v-link="{path: '/home/release'}">Published</a></li>
                        </ul>
                    </li>

                    <li class="server-config" @click.self="clickMenu">
                        <a @click.self="clickMenu">Server Config</a>
                        <ul class="sub-ul" v-el:serverconfig>
                            <li><a v-link="{path: '/home/serverconfig/general'}">General</a></li>
                            <li><a v-link="{path: '/home/serverconfig/speeddial'}">Speeddial</a></li>
                            <li><a v-link="{path: '/home/serverconfig/splash'}">Splash</a></li>
                            <li><a v-link="{path: '/home/serverconfig/popup'}">Popup</a></li>
                            <li><a v-link="{path: '/home/serverconfig/updation'}">Updation</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="container-body">
                <div class="container-body-scroll">
                    <router-view
                            v-bind:app-config="appConfig">
                    </router-view>
                </div>
            </div>
        </div>

        <!-- footer -->
        <footer></footer>
    </div>
</template>


<script>
    export default {

        name: 'Home',

        // 这里定义 props 数据，包括 父组件传递下来的（必须在这里定义一次） 和 该模板自定义的 props 数据。
        props: {
            appConfig: Object,
        },

        methods: {
            clickMenu: function (e) {
                var node = e.currentTarget;
                if (node.nodeName == "A") {
                    node = node.parentNode.getElementsByTagName("ul")[0];
                } else {
                    node = e.currentTarget.getElementsByTagName("ul")[0];
                }
                if (node.style.display == "none"){
                    node.style.display = "";
                } else {
                    node.style.display = "none";
                }
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
            },
            data: function (transition) {
                transition.next();
                var _this = this;
                setTimeout(function () {
                    var rootNode = _this.$els.root;
                    for (var i = 0; i < rootNode.children.length; i++){
                        if(rootNode.children[i].getElementsByClassName("v-link-active").length > 0) {
                            rootNode.children[i].getElementsByClassName("sub-ul")[0].style.display = "";
                        }
                        if(rootNode.children[i].getElementsByClassName("v-link-active").length == 0) {
                            rootNode.children[i].getElementsByClassName("sub-ul")[0].style.display = "none";
                        }
                    }
                });
            }
        },

        http: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },

        ready () {
            console.log(this.appConfig.login);
        },

        compiled() {
            this.$els.commodity.style.display = "none";
            this.$els.user.style.display = "none";
            this.$els.order.style.display = "none";
            this.$els.push.style.display = "none";
            this.$els.serverconfig.style.display = "none";
        }
    }
</script>
