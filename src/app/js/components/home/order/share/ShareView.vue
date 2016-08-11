<style lang="stylus" rel="stylesheet/scss">
    .share-list {
        select {
            color: rgba(0, 0, 0, .87);
            margin-right: 5px;
        }

        .search {
            margin-bottom: 25px;
            display: inline-block;
        }

        .short {
            max-width: 180px;
        }

        .clear-btn {
            color: #fff;
            background-color: #f44336;
            margin-left: 10px;
            margin-right: 10px;
        }

        .search-btn {
            color: #fff;
            background-color: #f44336;
        }

        .input-append {
            display: inline-block;

            .add-on {
                display: inline-block;
                width: auto;
                height: 30px;
                min-width: 16px;
                padding: 4px 5px;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                text-shadow: 0 1px 0 #fff;
                background-color: #eee;
                border: 1px solid #a9a9a9;
                margin-left: -1px;
            }

            .icon-calendar {
                display: inline-block;
                background-image: url(../../../../../assets/images/calendar.png);
                background-position: -0px -0px;
                background-size: 100%;
                margin-top: 1px;
                line-height: 14px;
                background-repeat: no-repeat;
            }

            .icon-remove {
                display: inline-block;
                background-image: url(../../../../../assets/images/close.png);
                background-position: -0px -0px;
                background-size: 100%;
                margin-top: 1px;
                line-height: 14px;
                background-repeat: no-repeat;
            }
        }

        [class*=" datetimepicker-dropdown"]:before {
            top: -7px;
            left: 176px;
        }

        [class*=" datetimepicker-dropdown"]:after {
            top: -6px;
            left: 176px;
        }

    }
</style>
<template>
    <div class="order-view row">
        <div class="share-list">
            <form class="search form-inline">
                <select class="form-control" v-model="usertype"
                        v-el:usertype>
                    <option value=-1 selected>All users</option>
                    <option value=1>Real orders</option>
                    <option value=0>Robot orders</option>
                </select>
                <input type="text" class="form-control" placeholder="Product ID/Name" v-model="product"
                       v-el:product>
                <input type="text" class="short form-control" placeholder="Buy user ID/Name" v-model="user"
                       v-el:user>
                <input type="text" class="short form-control" placeholder="Period Id" v-model="issueId"
                       v-el:issueId>
                <div class="form-group">
                    <label class="control-label" for="start-time">From : </label>
                    <input class="form-control" id="start-time" type="text" placeholder="blank with no limit"
                           name="share-time" v-model="starttime" readonly/>
                </div>
                <div class="form-group">
                    <label class="control-label" for="end-time">To : </label>
                    <input class="form-control" id="end-time" type="text" placeholder="blank with no limit"
                           name="share-time" v-model="endtime" readonly/>
                </div>
                <button type="button" class="clear-btn btn" @click="clearOptions">CLEAR
                </button>
                <button type="button" class="search-btn btn" @click="search">SEARCH
                </button>
            </form>
            <ui-table
                    :data="gridData"
                    :columns="gridColumns"
                    :datakeys="gridKeys">
            </ui-table>
            <ui-paging :resetpage='resetPage'></ui-paging>
    </div>
</template>
<script>
    import UiTable from './ShareTable.vue'
    import UiPaging from '_ui-modules/util/paging.vue'
    import {get} from '_api/callAPI.js'
    export default {
        name: "order",

        components: {
            UiTable,
            UiPaging
        },

        ready(){
            $('#start-time').datetimepicker({
                format: "YYYY-MM-DD",
                ignoreReadonly: true,
                toolbarPlacement: "bottom",
                showTodayButton: true,
                showClear: true,
                showClose: true,
                useCurrent: false
            });

            $('#end-time').datetimepicker({
                format: "YYYY-MM-DD",
                ignoreReadonly: true,
                toolbarPlacement: "bottom",
                showTodayButton: true,
                showClear: true,
                showClose: true,
                useCurrent: false
            });

            this.search();
        },

        data(){
            return {
                'gridData': [],
                'gridColumns': ['Share ID', 'Commodity title', 'Period', 'Share user', 'Robot users', 'Share title', 'Share time', 'management'],
                'gridKeys': ['share_id', 'name', 'period_id', 'user', 'is_robot', 'title', 'share_time'],
                'resetPage': false,
                'usertype': -1,
                'product': '',
                'issueId': '',
                'user': '',
                'starttime': '',
                'endtime': '',
                'page': 0,
                'count': 0
            }
        },


        methods: {
            clearOptions: function () {
                this.resetPage = true;
                this.usertype = -1;
                this.product = '';
                this.issueId = '';
                this.user = '';
                this.starttime = '';
                this.endtime = '';
                this.resetPage = false;
            },

            search: function () {
                var params = {};
                if (this.page) {
                    params['page'] = this.page;
                } else {
                    this.resetPage = true;
                }
                if (this.count) {
                    params['count'] = this.count;
                }
                if (this.usertype >= 0) {
                    params['show_real_user'] = this.usertype;
                }
                if (this.product) {
                    params['product'] = this.product;
                }
                if (this.issueId) {
                    params['issue_id'] = this.issueId;
                }
                if (this.user) {
                    params['user'] = this.user;
                }
                if (this.starttime) {
                    params['start_time'] = this.starttime + " 00:00:00";
                }
                if (this.endtime) {
                    params['end_time'] = this.endtime + " 00:00:00"
                }
                get(this, '/console/api/share/list', params, function (context, data) {
                    context.$set('gridData', data);
                    context.resetPage = false;
                    context.page = 0;
                    context.count = 0;
                });
            }
        },

        events: {
            'paging-update-data': function (params) {
                if (params.page) {
                    this.page = params.page;
                }
                if (params.count) {
                    this.count = params.count;
                }
                this.search();
            }
        }

    }
</script>