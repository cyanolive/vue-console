<style lang="stylus" rel="stylesheet/scss">
    .user-wrapper {
        select {
            color: rgba(0, 0, 0, .87);
        }

        .search {
            margin-bottom: 25px;
            display: inline-block;
        }

        .search-btn {
            color: #fff;
            background-color: #f44336;
        }

        .show-user {
            float: right;
            color: rgba(0, 0, 0, .87);
            font-size: 14px;
        }

        .new-user {
            margin-bottom: 5px;
        }
    }
</style>
<template>
    <div class="user-wrapper">
        <div>
            <form class="search form-inline">
                <select class="form-control" v-model="searchTerms">
                    <option selected value=1>Nickname</option>
                    <option value=2>UID</option>
                    <option value=3>Mailbox</option>
                    <option value=4>Phone</option>
                </select>
                <input type="text" class="form-control" placeholder="nickname/UID/mailbox/phone"
                       v-model="searchContent">
                <button type="button" class="search-btn btn" @click="search">SEARCH</button>
            </form>
            <div class="show-user">
                <p class="new-user">Today's New: {{newUsers}}</p>
                <p>Total visitors: {{totalUsers}}</p>
            </div>
            <ui-table
                    :data="gridData"
                    :columns="gridColumns"
                    :datakeys="gridKeys">
            </ui-table>
            <ui-paging></ui-paging>
        </div>
    </div>
</template>
<script>
    import UiTable from './UserTable.vue'
    import UiPaging from '_ui-modules/util/paging.vue'
    import {get} from '_api/callAPI.js'
    export default {
        name: 'UserList',

        props: {
            appConfig: Object
        },

        components: {
            UiTable,
            UiPaging
        },

        data (){
            return {
                gridColumns: ['UID', 'nickname', 'mailbox', 'phone', 'third-party account', 'registration time', 'credits', 'total gold', 'intergral', 'operate'],
                gridKeys: ['uid', 'nickname', 'email', 'mobile', 'third', 'time', 'gold', 'total', 'points'],
                gridData: [],
                searchTerms: 1,
                searchContent: '',
                totalUsers: 0,
                newUsers: 0
            }
        },

        ready(){
            this.getUserList();
            this.getUseNum();
        },

        methods: {
            getUserList: function () {
                get(this, '/console/api/user/list', {}, function (context, data) {
                    context.dataConverter(data);
                });
            },

            dataConverter: function (data) {
                data.forEach(function (item) {
                    item['total'] = item['gold'] + item['points'];
                });
                this.$set('gridData', data);
            },

            search: function () {
                get(this, '/console/api/user/list', {
                    key: this.searchTerms,
                    word: this.searchContent
                }, function (context, data) {
                    context.$emit('update-user-list', data);
                });
            },

            getUseNum: function () {
                get(this, '/console/api/user/statistics', {}, function (context, data) {
                    context.$set('totalUsers', data[0].total_users);
                    context.$set('newUsers', data[1].new_user);
                });
            }
        },

        events: {
            'update-user-list': function (data) {
                data.forEach(function (item) {
                    item['total'] = item['gold'] + item['points'];
                });
                this.$set('gridData', data);
            },

            'paging-update-data': function (params) {
                this.$emit('update-list-data', params);
            },

            'update-list-data': function (params) {
                get(this, '/console/api/user/list', params, function (context, data) {
                    context.dataConverter(data);
                });
            }
        }
    }
</script>