<style lang="stylus" rel="stylesheet/scss">
    .server-config-speeddial {
        .add-speeddial-btn, .order-speeddial-btn {
            float: right;
            background-color: #f44336;
            color: #fff;
            margin-left: 15px;
        }
        .search-btn {
            background-color: #f44336;
            color: #fff;
            margin-left: 15px;
        }
    }
</style>

<template>
    <div class="server-config-speeddial row">
        <div class="col-lg-10 col-lg-offset-1">
            <form class="form-inline">
                <span class="control-label">Show specific version config :</span>
                <input type="text" class="form-control" v-model="selectedVersion">
                <button type="button" class="search-btn btn" @click="getVersionSpeeddials">{{btnText}}</button>
                <button type="button" class="add-speeddial-btn btn" @click="addSpeeddial">ADD</button>
                <button type="button" class="order-speeddial-btn btn" @click="sortSpeeddial" v-el:sort>SEQUENCE</button>
            </form>
        </div>
        <div class="col-lg-10 col-lg-offset-1">
            <online-table :online="onlineData"></online-table>
            <offline-table :offline="offlineData"></offline-table>
        </div>
    </div>
    <add-modal :showmodal.sync="showModal"></add-modal>
    <sort-modal :showsortmodal.sync="showSortModal" :speeddiallist="onlineData"></sort-modal>
</template>
<script>
    import AddModal from "./AddModal.vue"
    import SortModal from "./SortModal.vue"
    import OnlineTable from "./OnlineTable.vue"
    import OfflineTable from "./OfflineTable.vue"
    import {get} from "_api/callAPI.js"
    export default{
        name: 'SpeeddialView',

        props: {
            appConfig: Object
        },

        components: {
            AddModal,
            SortModal,
            OnlineTable,
            OfflineTable
        },

        ready(){
            this.getSpeeddials();
        },

        data(){
            return {
                showModal: false,
                showSortModal: false,
                offlineData: [],
                onlineData: [],
                selectedVersion: "",
                btnText: "Show"
            }
        },

        methods: {
            addSpeeddial: function () {
                this.showModal = true;
            },

            getSpeeddials: function () {
                get(this, '/console/api/speeddial/get', {}, function (context, data) {
                    context.$set('onlineData', data.online);
                    context.$set('offlineData', data.offline);
                    context.$els.sort.disabled = false;
                });
            },

            getVersionSpeeddials: function() {
                if (this.btnText == "Show") {
                    if (this.selectedVersion == "") {
                        return;
                    }
                    var params = {
                        appvc: this.selectedVersion
                    };
                    get(this, '/console/api/speeddial/get', params, function (context, data) {
                        context.$set('onlineData', data.online);
                        context.$set('offlineData', data.offline);
                        context.$els.sort.disabled = true;
                        context.btnText = "Clear";
                    });
                } else {
                    this.getSpeeddials();
                    this.btnText = "Show";
                    this.selectedVersion = "";
                }
            },

            sortSpeeddial: function () {
                this.showSortModal = true;
            }
        },

        events: {
            'update-speeddial-table': function () {
                this.getSpeeddials();
            }
        }

    }
</script>