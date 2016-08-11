<style lang="stylus" rel="stylesheet/scss">
    .commodity-catalog {
        select {
            color: rgba(0, 0, 0, .87);
        }

        .search {
            margin-bottom: 25px;
            .search-terms {
                margin-right: 5px;
            }
        }

        .search-btn, .sequence-btn, .add-btn {
            color: #fff;
            background-color: #f44336;
        }

        .sequence-btn, .add-btn {
            float: right;
            margin-left: 16px;
        }
    }
</style>
<template>
    <div class="commodity-catalog row">
        <div>
            <form class="search form-inline">
                <select class="form-control search-terms" v-model="searchTerms">
                    <option value=3 selected>Product name</option>
                    <option value=1>Product ID</option>
                    <option value=2>Classification</option>
                </select>
                <input type="text" class="form-control" placeholder="Name / ID / Classification"
                       v-model="searchContent">
                <button type="submit" class="search-btn btn" @click.prevent="search">SEARCH</button>
                <button type="button" class="add-btn btn" @click="addProduct">ADD</button>
                <!--<button type="button" class="sequence-btn btn">SEQUENCE</button>-->
            </form>

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
    import UiTable from './CatalogTable.vue'
    import UiPaging from '_ui-modules/util/paging.vue'
    import {get} from '_api/callAPI.js'
    export default {
        name: 'Catalog',

        components: {
            UiTable,
            UiPaging
        },

        props: {
            appConfig: Object,
        },

        ready (){
            this.dataConverter();
        },

        data () {
            return {
                searchQuery: '',
                gridColumns: ['ID', 'commodity title', 'Classification', 'Current installments / maximum installments', 'Current installments progress', 'Total price', 'Unit price', 'Added Time', 'Status', 'Priority', 'current robots', 'next robots', 'Management'],
                gridKeys: ['id', 'title', 'c_name', 'cur/max', 'buy_num', 'price', 'unit', 'time', 'status'],
                gridData: [],
                searchTerms: 1, //product id
                searchContent: ''
            }
        },
        methods: {
            dataConverter: function () {
                get(this, '/console/api/treasure/list', {}, function (context, data) {
                    context.$emit('update-pro-list-data', data);
                });
            },

            search: function () {
                get(this, '/console/api/treasure/list', {
                    key: this.searchTerms,
                    word: this.searchContent
                }, function (context, data) {
                    data.forEach(function (item) {
                        item['cur/max'] = item['current_period'] + '/' + item['total_period'];
                    });
                    context.$set('gridData', data);
                });
            },

            addProduct: function () {
                router.go('/home/commodity/addProduct');
            },

        },

        events: {
            'update-pro-list-data': function (data) {
                data.forEach(function (item) {
                    item['cur/max'] = item['current_period'] + '/' + item['total_period'];
                });
                this.$set('gridData', data);
            },
            'paging-update-data': function (params) {
                get(this, '/console/api/treasure/list', params, function (context, data) {
                    context.$emit('update-pro-list-data', data);
                });
            },
            'update-list-data': function () {
                this.dataConverter();
            }
        }
    }
</script>