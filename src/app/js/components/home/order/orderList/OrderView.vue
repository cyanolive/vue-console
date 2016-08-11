<style lang="stylus" rel="stylesheet/scss">
    .order-list {
        select {
            color: rgba(0, 0, 0, .87);
            margin-right: 5px;
        }

        .search {
            margin-bottom: 25px;
            display: inline-block;
        }

        .search-btn {
            color: #fff;
            background-color: #f44336;
        }
    }
</style>
<template>
    <div class="order-view row">
        <div class="order-list">
            <form class="search form-inline">
                <select class="form-control" v-model="status"
                        v-el:status>
                    <option value=-1 selected>All orders</option>
                    <option value=0>Not paid</option>
                    <option value=1>Purchased</option>
                    <option value=-2>All winning orders</option>
                    <option value=2>Winning orders</option>
                    <option value=3>Confirmed orders</option>
                    <option value=4>Shipping orders</option>
                    <option value=5>Finished orders</option>
                </select>
                <select class="form-control" v-model="usertype"
                        v-el:usertype>
                    <option value=-1 selected>All users</option>
                    <option value=1>Real orders</option>
                    <option value=0>Robot orders</option>
                </select>
                <input type="text" class="form-control" placeholder="Product ID/Name" v-model="product"
                       v-el:product>
                <input type="text" class="form-control" placeholder="Buy user ID/Name" v-model="user"
                       v-el:user>
                <input type="text" class="form-control" placeholder="Order number" v-model="orderNumber"
                       v-el:orderNumber>
                <input type="text" class="form-control" placeholder="Issue Id" v-model="issueId"
                       v-el:issueId>
                <button type="button" class="search-btn btn" @click="clearOptions">CLEAR
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
    </div>
</template>
<script>
    import UiTable from './OrderTable.vue'
    import UiPaging from '_ui-modules/util/paging.vue'
    import {get} from '_api/callAPI.js'
    export default {
        name: "order",

        components: {
            UiTable,
            UiPaging
        },

        ready(){
            if (this.$route.query.issue) {
                this.issueId = this.$route.query.issue;
            }
            if (this.$route.query.status) {
                this.status = this.$route.query.status;
            }
            this.search();
        },

        data(){
            return {
                'searchTerms': 1,
                'searchContent': '',
                'gridData': [],
                'gridColumns': ['Order number', 'Commodity title', 'Issue', 'Buy user', 'Robot users', 'Buy shares', 'Buy time', 'Order status', 'management'],
                'gridKeys': ['order_id', 'name', 'period_id', 'user', 'is_robot', 'nums', 'time', 'order_sta_str'],
                'resetPage': false,
                'onlyShowRealUsers': false,
                'status': -1,
                'usertype': -1,
                'product': '',
                'orderNumber': '',
                'issueId': '',
                'user': '',
                'page': 0,
                'count': 0
            }
        },


        methods: {
            clearOptions: function () {
                this.resetPage = true;
                this.status = -1;
                this.usertype = -1;
                this.product = '';
                this.orderNumber = '';
                this.issueId = '';
                this.user = '';
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
                if (this.status != -1) {
                    params['status'] = this.status;
                }
                if (this.usertype >= 0) {
                    params['show_real_user'] = this.usertype;
                }
                if (this.product) {
                    params['product'] = this.product;
                }
                if (this.orderNumber) {
                    params['order_number'] = this.orderNumber;
                }
                if (this.issueId) {
                    params['issue_id'] = this.issueId;
                }
                if (this.user) {
                    params['user'] = this.user;
                }
                get(this, '/console/api/order/list', params, function (context, data) {
                    context.dataConverter(data);
                    context.$set('gridData', data);
                    context.resetPage = false;
                    context.page = 0;
                    context.count = 0;
                });
            },

            dataConverter: function (data) {
                data.forEach(function (item) {
                    // 订单状态： 0 未支付； 1 已购买； 2 中奖；3 确认； 4 发货； 5 完成
                    if (item['order_sta'] == 0) {
                        item['order_sta_str'] = 'Not paid';
                    } else if (item['order_sta'] == 1) {
                        item['order_sta_str'] = 'Purchased';
                    } else if (item['order_sta'] == 2) {
                        item['order_sta_str'] = 'Winning';
                    } else if (item['order_sta'] == 3) {
                        item['order_sta_str'] = 'Confirmed';
                    } else if (item['order_sta'] == 4) {
                        item['order_sta_str'] = 'shipping';
                    } else if (item['order_sta'] == 5) {
                        item['order_sta_str'] = 'finished';
                    }
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