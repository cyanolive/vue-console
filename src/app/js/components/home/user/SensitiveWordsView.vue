<style lang="stylus" rel="stylesheet/scss">
    .sensitive-words {
        .new-btn {
            background-color: #f44336;
            color: #fff;
            margin-top: 25px;
            margin-right: 10px;
        }
    }
</style>
<template>
    <div class="sensitive-words row">
        <div class="col-lg-6 col-md-6 col-lg-offset-1 col-md-offset-1">
            <ui-table
                    :data="gridData"
                    :columns="gridColumns"
                    :datakeys="gridKeys">
            </ui-table>
            <button type="button" class="new-btn btn" @click="showModal = true">ADD</button>
        </div>
    </div>
    <ui-modal :showmodal.sync="showModal"></ui-modal>
</template>
<script>
    import UiTable from './SensitiveTable.vue'
    import UiModal from './NewModal.vue'
    import {get} from '_api/callAPI'
    export default{
        name: 'SensitiveWords',

        components: {
            UiTable,
            UiModal
        },

        props: {
            appConfig: Object
        },

        data(){
            return {
                gridData: [],
                gridColumns: ['ID', 'sensitive words', 'operating'],
                gridKeys: ['id', 'name'],
                showModal: false
            }
        },

        ready(){
            this.getSensitiveWords();
        },

        methods: {
            getSensitiveWords: function () {
                get(this, '/console/api/sensitive/get', {}, function (context, data) {
                    context.$set('gridData', data);
                });
            }
        },

        events: {
            'update-sensitive-list': function (data) {
                this.getSensitiveWords();
            }
        }
    }
</script>