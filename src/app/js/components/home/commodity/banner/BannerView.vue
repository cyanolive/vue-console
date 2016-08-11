<style lang="stylus" rel="stylesheet/scss">
    .commodity-banner {
        .add-banner-btn, .order-banner-btn {
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
    <div class="commodity-banner row">
        <div class="col-lg-10 col-lg-offset-1">
            <form class="form-inline">
                <span class="control-label">Show specific version config :</span>
                <input type="text" class="form-control" v-model="selectedVersion">
                <button type="button" class="search-btn btn" @click="getVersionBanners">{{btnText}}</button>
            <button type="button" class="add-banner-btn btn" @click="addBanner">ADD</button>
            <button type="button" class="order-banner-btn btn" @click="sortBanner" v-el:sort>SEQUENCE</button>
                </form>
        </div>
        <div class="col-lg-10 col-lg-offset-1">
            <online-table :online="onlineData"></online-table>
            <offline-table :offline="offlineData"></offline-table>
        </div>
    </div>
    <add-modal :showmodal.sync="showModal"></add-modal>
    <sort-modal :showsortmodal.sync="showSortModal" :bannerlist="onlineData"></sort-modal>
</template>
<script>
    import AddModal from "./AddModal.vue"
    import SortModal from "./SortModal.vue"
    import OnlineTable from "./OnlineTable.vue"
    import OfflineTable from "./OfflineTable.vue"
    import {get} from "_api/callAPI.js"
    export default{
        name: 'BannerView',

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
            this.getBanners();
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
            addBanner: function () {
                this.showModal = true;
            },

            getBanners: function () {
                get(this, '/console/api/banner/get', {}, function (context, data) {
                    context.$set('onlineData', data.online);
                    context.$set('offlineData', data.offline);
                    context.$els.sort.disabled = false;
                });
            },

            getVersionBanners: function() {
                if (this.btnText == "Show") {
                    if (this.selectedVersion == "") {
                        return;
                    }
                    var params = {
                        appvc: this.selectedVersion
                    };
                    get(this, '/console/api/banner/get', params, function (context, data) {
                        context.$set('onlineData', data.online);
                        context.$set('offlineData', data.offline);
                        context.$els.sort.disabled = true;
                        context.btnText = "Clear";
                    });
                } else {
                    this.getBanners();
                    this.btnText = "Show";
                    this.selectedVersion = "";
                }
            },

            sortBanner: function () {
                this.showSortModal = true;
            }
        },

        events: {
            'update-banner-table': function () {
                this.getBanners();
            }
        }

    }
</script>