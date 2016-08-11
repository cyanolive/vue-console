<style lang="stylus" rel="stylesheet/scss">
    .push-published-table {
        margin-top: 40px;
        .pub-table {
            border: 1px solid rgba(0, 0, 0, .24);
            border-left: none;
            border-right: none;
            font-size: 14px;
            color: rgba(0, 0, 0, .54);
        }
        td {
            border-right: 1px solid rgba(0, 0, 0, .24);
            &:first-child {
                text-align: center;
                vertical-align: middle;
                width: 50px;
            }
            &:last-child {
                border-right: none;
                background-color: #fff;
            }
        }
        .pub-title {
            color: #007aff;
            margin-bottom: 5px;
        }
        .pub-time {
            margin-left: 10px;
        }
    }
</style>
<template>
    <div class="push-published-table row">
        <div class="col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1">
            <table class="pub-table table">
                <tbody>
                <tr v-for="data in pushData">
                    <td>{{data.rank}}</td>
                    <td>
                        <div class="pub-title">Title : <span>{{data.title}}</span></div>
                        <div>ID/URL : <span>{{data.url}}</span></div>
                        <div>{{data.creator}}<span class="pub-time">{{data.push_time}}</span></div>
                    </td>
                </tr>
                </tbody>
            </table>
            <ui-paging></ui-paging>
        </div>
    </div>
</template>
<script>
    import {get} from '_api/callAPI.js'
    import UiPaging from '_ui-modules/util/paging.vue'
    export default {
        name: "ReleaseView",

        components: {
            UiPaging
        },

        props: {
            appConfig: Object
        },

        ready(){
            this.getPubPushInfo();
        },

        data(){
            return {
                pushData: []
            }
        },

        methods: {
            getPubPushInfo: function () {
                get(this, '/console/api/message/get?status=released', {}, function (context, data) {
                    context.$set('pushData', data);
                });
            }
        },

        events: {
            'paging-update-data': function (params) {
                get(this, '/console/api/message/get?status=released', params, function (context, data) {
                    context.$set('pushData', data);
                });
            }
        }
    }
</script>