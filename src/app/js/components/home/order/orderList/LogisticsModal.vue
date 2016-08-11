<style lang="stylus" rel="stylesheet/scss">
    .logistic-setting-modal {
        .modal-container {
            width: 350px;
        }

        .setting-logistics-header {
            height: 64px;
            color: rgba(0, 0, 0, .87);
            padding: 0 24px;
            line-height: 64px;
            background-color: #f5f5f5;
            border-bottom: 1px solid rgba(0, 0, 0, .24);
            span {
                float: right;
                width: 16px;
                height: 16px;
                margin-top: 24px;
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url(../../../../../assets/images/close.png);

            }
        }

        label {
            display: inline-block;
            width: 40%;
        }

        input, select {
            display: inline-block;
            width: 55%;
        }

        .setting-logistics-form {
            margin-left: 24px;
            margin-right: 24px;
            input, select {
                margin-right: 8px;
                color: rgba(0, 0, 0, .87);
                font-size: 16px;
            }
        }

        .setting-logistics-btn {
            width: 100%;
            color: #fff;
            margin-top: 10px;
            margin-bottom: 24px;
            background-color: #f44336;
        }
    }
</style>
<template>
    <div v-show="showmodal" class="logistic-setting-modal">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header" class="setting-logistics-header">Send goods
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form class="setting-logistics-form" slot="body" v-el:form>
                <div class="from-group">
                    <label for="order-number">Order number : </label>
                    <input id="order-number" type="text" :value='orderID' disabled name="oid">
                </div>
                <div class="from-group">
                    <label for="issue">Issue : </label>
                    <input id="issue" type="text" :value='issueID' disabled>
                </div>
                <div class="from-group">
                    <label for="logistics">Logistics : </label>
                    <select id="logistics" name="logistics_name">
                        <option>圆通快递</option>
                        <option>申通快递</option>
                        <option>中通快递</option>
                        <option>顺风快递</option>
                    </select>
                </div>
                <div class="from-group">
                    <label for="number">Number : </label>
                    <input id="number" type="text" name="logistics_num">
                </div>
                <button type="button" class="setting-logistics-btn btn" @click="setLogistics">CONFIRM</button>
            </form>
            <div class="row" slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from '_ui-modules/modal.vue'
    import {post} from '_api/callAPI.js'
    export default {
        name: 'LogisticsModal',

        props: {
            showmodal: {
                type: Boolean,
                twoWay: true
            }
        },

        components: {
            UiModal
        },

        data(){
            return {
                orderID: '000',
                issueID: '000'
            }
        },

        methods: {
            setLogistics: function () {
                var formData = new FormData(this.$els.form),
                        self = this;
                formData.append('oid', this.orderID);
                post(this, '/console/api/order/logistics/add', formData, function (data) {
                    if (data.sta === 0) {
                        self.showmodal = false;
                    }
                })
            }
        },

        events: {
            'set-logistics': function (oid, issue) {
                this.$set('orderID', oid);
                this.$set('issueID', issue);
            }
        }
    }
</script>