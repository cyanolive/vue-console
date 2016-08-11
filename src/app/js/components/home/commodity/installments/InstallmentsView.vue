<style lang="stylus" rel="stylesheet/scss">
    .commodity-installments {
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
        .filter {
            float: right;
            margin-top: 2px;
        }
    }
</style>

<template>
    <div class="commodity-installments row">
        <form class="search form-inline">
            <select class="form-control" v-model="searchTerms">
                <option value=2 selected>Product name</option>
                <option value=1>Installment ID</option>
            </select>
            <input type="text" class="form-control" placeholder="Product name / ID" v-model="searchContent">
            <button type="button" class="search-btn btn" @click="search">SEARCH</button>
        </form>
        <form class="filter form-inline">
            <select class="filter form-control">
                <option>All installments</option>
            </select>
        </form>
        <ui-table
                :data="gridData"
                :columns="gridColumns"
                :datakeys="gridKeys">
        </ui-table>
        <ui-paging></ui-paging>
    </div>
</template>

<script>
    import UiTable from './InstallmentsTable.vue'
    import UiPaging from '_ui-modules/util/paging.vue'
    import {get} from '_api/callAPI.js'
    export default {
        name: 'installments',

        components: {
            UiTable,
            UiPaging
        },

        props: {
            // appConfig: Object,
        },

        ready (){
            let pid = this.$route.query.pid;
            if (pid !== undefined) {
                this.getProductInstallByPid(pid);
            } else {
                this.getAllInstallments();
            }

        },

        data (){
            return {
                'searchTerms': 2,
                'searchContent': '',
                'gridData': [],
                'gridColumns': ['ID', 'name', 'current installments progress', 'winning user', 'order status', 'lottery time', 'management'],
                'gridKeys': ['id', 'name', 'cur/max', 'winner', 'status', 'lottery_time']
            }
        },

        methods: {
            getAllInstallments: function () {
                get(this, '/console/api/period/list', {}, this.installConverter);
            },

            installConverter: function (self, value) {
                value.forEach(function (item) {
                    item['cur/max'] = item['current'] + '/' + item['total'];
                    switch (item['status']) {
                        case 1:
                            item['status'] = 'progressing';
                            break;
                        case 2:
                            item['status'] = 'waiting for the award';
                            break;
                        case 3:
                            item['status'] = 'has the lottery';
                            break;
                        default:
                            item['status'] = '-';
                    }
                });
                self.$set('gridData', value);
            },

            search: function () {
                var params = {};
                params.key = this.searchTerms,
                        params.word = this.searchContent;
                get(this, '/console/api/period/list', params, this.installConverter);
            },

            getProductInstallByPid: function (pid) {
                get(this, '/console/api/period/list', {key: 3, word: pid}, this.installConverter);
            }
        },

        events: {
            'paging-update-data': function (params) {
                this.$emit('update-list-data', params);
            },

            'update-list-data': function (params) {
                get(this, '/console/api/period/list', params, this.installConverter);
            }
        }
    }
</script>