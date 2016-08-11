<style lang="stylus" rel="stylesheet/scss">
    .commodity-cat {
        .new-btn, .sorting-btn {
            background-color: #f44336;
            color: #fff;
            margin-top: 25px;
            margin-right: 10px;
        }
    }
</style>
<template>
    <div class="commodity-cat row">
        <div class="col-lg-4 col-md-4 col-lg-offset-1 col-md-offset-1">
            <ui-table
                    :data="gridData"
                    :columns="gridColumns"
                    :datakeys="gridKeys">
            </ui-table>
            <button type="button" class="new-btn btn" @click="showNewModal = true">CLASSIFICATION</button>
            <button type="button" class="sorting-btn btn" @click="showSortModal = true">SORTING</button>
        </div>
    </div>
    <new-modal :shownewmodal.sync="showNewModal"></new-modal>
    <sort-modal :showsortmodal.sync="showSortModal" :sortdata="gridData"></sort-modal>
</template>
<script>

    import UiTable from './ClassificationTable.vue'
    import SortModal from './SortModal.vue'
    import NewModal from './NewModal.vue'
    import {get} from '_api/callAPI.js'

    export default {
        name: 'ClassificationView',

        components: {
            UiTable,
            NewModal,
            SortModal
        },

        props: {
            appConfig: Object,
        },

        data (){
            return {
                gridData: [],
                gridColumns: ['ID', 'category name', 'operating'],
                gridKeys: ['cid', 'c_name'],
                showNewModal: false,
                showSortModal: false
            }
        },

        ready (){
            this.getAllCats();
        },

        methods: {
            getAllCats: function () {
                get(this, '/console/api/category/list', {}, function (self, value) {
                    self.$set('gridData', value);
                });
            }
        }
    }

</script>