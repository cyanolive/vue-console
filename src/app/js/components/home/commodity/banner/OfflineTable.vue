<style lang="stylus" rel="stylesheet/scss">
    .banner-offline-table {
        margin-top: 40px;
        margin-bottom: 40px;
        border: none;
        font-size: 14px;
        color: rgba(0, 0, 0, .54);
        .on-shelf, .edit-banner, .del-banner {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 100%;
        }
        .on-shelf {
            background-image: url(../../../../../assets/images/shelve_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/shelve_click.png);
            }
        }
        .edit-banner {
            background-image: url(../../../../../assets/images/edit_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/edit_click.png);
            }
        }
        .del-banner {
            margin-left: 15px;
            margin-right: 15px;
            background-image: url(../../../../../assets/images/delete_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/delete_click.png);
            }
        }
        th {
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, 0.54);
            border-left: 1px solid rgba(0, 0, 0, .24);
            border-top: 1px solid rgba(0, 0, 0, .24);
            text-align: center;
            &:first-child {
                border-left: none;
            }
        }
        td {
            vertical-align: middle;
            text-align: center;
            background-color: #fff;
            border-left: 1px solid rgba(0, 0, 0, .24);
            border-top: 1px solid rgba(0, 0, 0, .24);
            &:first-child {
                width: 120px;
                background-color: #f5f5f5;
                border-left: none;
            }
            &:last-child {
                /*width: 222px;*/
            }

            .version {
                width: 100px;
                vertical-align: middle;
                text-align: center;
            }
        }
        tr:last-child {
            border-bottom: 1px solid rgba(0, 0, 0, .24);
        }
        .text {
            color: #007aff;
        }
        img {
            margin-top: 3px;
            margin-bottom: 3px;
        }
    }
</style>
<template>
    <table class="table banner-offline-table">
        <th>ID</th>
        <th>Title</th>
        <th>Image</th>
        <th>ClickUrl</th>
        <th>Min_Appvc</th>
        <th>Max_Appvc</th>
        <th>Operation</th>
        <tbody>
        <tr v-for="(index, item) in offline">
            <td>{{index+1}}</td>
            <td>
                <div class="text">{{item.title}}</div>
            </td>
            <td>
                <img :src="item.url" width=280 height=125/>
            </td>
            <td>
                <div class="text">{{item.path}}</div>
            </td>
            <td>
                {{item.min_appvc}}
            </td>
            <td>
                {{item.max_appvc}}
            </td>
            <td>
                <div class="row">
                    <a class="edit-banner" role="button" @click.stop.prevent="edit(item.id)"></a>
                    <a class="del-banner" role="button" @click.stop.prevent="del(item.id)"></a>
                    <a class="on-shelf" role="button" @click.stop.prevent="onShelf(item.id)"></a>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    <edit-modal :showmodal.sync="showModal" :bannerdata="bannerData"></edit-modal>
</template>
<script>
    import {get, post} from "_api/callAPI.js"
    import EditModal from "./EditModal.vue"
    export default {
        name: "OfflineView",

        props: {
            offline: Array,
        },

        components: {
            EditModal
        },

        data(){
            return {
                showModal: false,
                bannerData: {}
            };
        },

        methods: {
            del: function (id) {
                var params = {
                    id: id,
                    op: 'del'
                };

                get(this, '/console/api/banner/operation', params, function (context, data) {
                    if (data.sta === 0) {
                        console.log(data.tips);
                        context.$dispatch('update-banner-table');
                    } else {
                        alert('failed to delete the banner, ' + data.tips);
                    }
                });
            },

            onShelf: function (id) {
                var params = {
                    id: id,
                    op: 'on'
                };

                get(this, '/console/api/banner/operation', params, function (context, data) {
                    if (data.sta === 0) {
                        console.log(data.tips);
                        context.$dispatch('update-banner-table');
                    } else {
                        alert('failed to on shelf, ' + data.tips);
                    }
                });
            },

            edit: function (id) {
                var params = {
                    id: id
                };
                get(this, '/console/api/banner/info', params, function (context, data) {
                    context.$broadcast('banner_edit_click', data[0]);
                    context.showModal = true;
                });
            }
        }
    }
</script>