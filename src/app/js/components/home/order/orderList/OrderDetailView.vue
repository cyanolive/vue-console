<style lang="stylus" rel="stylesheet/scss">
    .order-detail {
        margin-top: 40px;

        .basic-info, .purchase-info, .address-info {
            background-color: #f5f5f5;
            margin-top: 16px;
            margin-bottom: 16px;
            padding: 16px;
        }

        p {
            color: rgba(0, 0, 0, .54);
            font-size: 14px;

            span {
                color: rgba(0, 0, 0, .87);
                display: inline-block;
                margin-left: 10px;
                word-break: break-word;
            }
        }

        .logistics-info {
            margin-top: 24px;
            color: rgba(0, 0, 0, .54);
            font-size: 14px;
        }

        input, select {
            color: rgba(0, 0, 0, .87);
        }

        .order-detail-btn {
            background-color: #f44336;
            color: #fff;
            margin-left: 16px;
        }

        .logistics-num {
            width: 100%;
            margin-top: 16px;
        }
    }
</style>
<template>
    <div class="row">
        <div class="order-detail col-lg-8 col-md-10 col-lg-offset-1 col-md-offset-1">
            <div class="basic-info">
                <p>Order number :<span>{{orderDetail.order_id}}</span></p>
                <p>Product name :<span>{{orderDetail.name}}</span></p>
                <p>Goods Issue :<span>{{orderDetail.period_id}}</span></p>
                <p>Current progress :<span>{{orderDetail.status}}</span></p>
                <p>Lucky number :<span>{{orderDetail.lucky_code}}</span></p>
                <p>Winning users :<span>{{orderDetail.winner_id}}</span></p>
            </div>
            <div class="purchase-info">
                <p>Purchasing user :<span>{{orderDetail.user_id}}</span></p>
                <p>Purchase of shares :<span>{{orderDetail.cost}}</span></p>
                <p>Purchase number :<span>{{orderDetail.codes}}</span></p>
                <p>Buy time :<span>{{orderDetail.time}}</span></p>
            </div>
            <div v-show="isWinnersOrder" class="address-info">
                <p>Delivery Address :<span>{{orderDetail.address}}</span></p>
                <p>Receipt Name :<span>{{orderDetail.receiver}}</span></p>
                <p>Tel :<span>{{orderDetail.mobile}}</span></p>
            </div>
            <div v-show="isWinnersOrder" class="logistics-info">
                <form class="logistics form-inline" v-el:log-form>
                    <label>Logistics :</label>
                    <select class="form-control" v-model="logisticsName" name="logistics_name"
                            value={{orderDetail.log_name}}>
                        <option>圆通快递</option>
                        <option>申通快递</option>
                        <option>中通快递</option>
                        <option>顺风快递</option>
                    </select>
                    <div class="form-group logistics-num">
                        <label>Number :</label>
                        <input type="text" v-model="logisticsNum" name="logistics_num" value={{orderDetail.log_num}}>
                        <button type="button" class="order-detail-btn btn" @click="setLogistics">CONFIRM</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import {get, post}  from '_api/callAPI.js'
    export default {
        name: 'OrderDetail',

        data(){
            return {
                orderDetail: {},
                logisticsName: '',
                logisticsNum: '',
                orderID: '',
                isWinnersOrder: false
            }
        },

        route: {
            data: function (transition) {
                var params = transition.to.params;
                this.$set('orderID', params.id);
                get(this, '/console/api/order/detail', params, function (context, data) {
                    context.$set('orderDetail', data);
                    //only winner show the address and logistics
                    if (data['winner_id'] == data['user_id']) {
                        context.isWinnersOrder = true;
                    }
                });

            }
        },

        methods: {
            setLogistics: function () {
                var formData = new FormData(this.$els.logForm),
                        self = this;
                formData.append('oid', this.orderID);
                post(this, '/console/api/order/logistics/add', formData, function (data) {
                    if (data.sta === 0) {
                        self.$els.logForm.reset();
                    } else if (data.sta === -1) {
                        alert(data.tips);
                    }
                });
            }
        }
    }
</script>