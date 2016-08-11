<style lang="stylus" rel="stylesheet/scss">
    .order-table {
        $border-color = rgba(0, 0, 0, .24);

        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        border-radius: 3px;
        background-color: #fff;
        width: 100%;
        font-size: 14px;

        th {
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, 0.54);
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -user-select: none;
            height: 48px;
            word-break: break-all;
        }

        td {
            background-color: #fff;
            border-bottom: 1px solid $border-color;
        }

        th, td {
            min-width: 120px;
            padding: 5px 10px;
            border-right: 1px solid $border-color;
            &:last-child {
                border-right: none;
            }
        }

        td:nth-child(2) {
            color: #007aff;
        }

        .shipping-setting, .view-order, .share-order {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            margin-right: 10px;
            margin-left: 15px;
        }

        .shipping-setting {
            background-image: url(../../../../../assets/images/shipping_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/shipping_click.png);
            }
        }

        .share-order {
            background-image: url(../../../../../assets/images/share_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/share_click.png);
            }
        }

        .view-order {
            background-image: url(../../../../../assets/images/view_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/view_click.png);
            }
        }
    }
</style>
<template>
    <table class="order-table table-condensed">
        <thead>
        <tr>
            <th v-for="key in columns">
                {{key | capitalize}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in data">
            <td v-for="key in datakeys">
                {{entry[key]}}
            </td>
            <td>
                <a class="view-order" role="button" @click="viewOrderDetail(entry['order_id'])"></a>
                <a v-if="entry['order_sta'] == 3 && !entry['is_robot']" class="shipping-setting"
                   role="button"
                   @click="setShipping(entry['order_id'], entry['period_id'])"></a>
                <a v-if="entry['order_sta'] >= 2 && entry['is_robot'] && !entry['dis_time']" class="share-order"
                   role="button"
                   @click="shareOrder(entry['user_id'], entry['period_id'])"></a>

            </td>
        </tr>
        </tbody>
    </table>
    <ui-view-modal :showmodal.sync="showViewModal"></ui-view-modal>
    <share-order-modal :showmodal.sync="showShareModal"></share-order-modal>
</template>

<script>
    import UiViewModal from './LogisticsModal.vue'
    import ShareOrderModal from '../share/ShareOrderModal.vue'
    export default {
        name: 'orderTable',

        components: {
            UiViewModal,
            ShareOrderModal
        },

        props: {
            data: Array,
            columns: Array,
            datakeys: Array
        },

        data(){
            return {
                showViewModal: false,
                showShareModal: false
            }
        },

        methods: {
            viewOrderDetail: function (id) {
                router.go({path: './orders/' + id});
            },

            setShipping: function (oid, issue) {
                this.showViewModal = true;
                this.$broadcast('set-logistics', oid, issue);
            },

            shareOrder: function (uid, pid) {
                this.showShareModal = true;
                this.$broadcast('share-order', uid, pid);
            }
        }
    }


</script>