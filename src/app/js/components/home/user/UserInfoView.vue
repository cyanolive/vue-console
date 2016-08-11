<style lang="stylus" rel="stylesheet/scss">
    .user-info {
        caption {
            caption-side: top;
            font-size: 22px;
            color: rgba(0, 0, 0, .87);
        }

        img {
            border-radius: 50%;
            margin-left: 29px;
        }

        .person-info {
            color: rgba(0, 0, 0, .54);
            font-size: 16px;
            .user-icon {
                background-image: url(../../../../assets/images/user_icon.png);
                background-size: 55%;
                background-position: center center;
                background-repeat: no-repeat;
                width: 72px;
                height: 72px;
            }

            td:first-child {
                width: 130px;
            }

            td:nth-child(2) {
                width: 300px;
            }

            td:nth-child(3) {
                width: 500px;
            }

            .user-nickname {
                text-align: center;
                color: rgba(0, 0, 0, .87);
            }
        }

        .recharge-record, .expense-record {
            $border-color = rgba(0, 0, 0, .24);

            color: rgba(0, 0, 0, .87);
            margin-top: 40px;
            margin-bottom: 40px;
            border-top: 1px solid $border-color;
            border-bottom: 1px solid $border-color;
            border-radius: 3px;
            background-color: #fff;
            width: 60%;

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
                max-width: 250px;
                padding: 5px 10px;
                font-size: 14px;
                border-right: 1px solid $border-color;
                &:last-child {
                    border-right: none;
                }
            }
        }

        .expense-record td:nth-child(2) {
            color: #007aff;
        }
    }
</style>
<template>
    <div class="row">
        <div class="user-info col-lg-9 col-md-10 col-lg-offset-1 col-md-offset-1">
            <table class="person-info">
                <tr>
                    <td rowspan=3 class="user-icon">
                        <img :src="userIconSrc" width="72px" height="72px">
                    </td>
                    <td>UID: {{userInfo.uid}}</td>
                    <td>Credits: {{userInfo.gold}}</td>
                </tr>
                <tr>
                    <td>Phone: {{userInfo.mobile}}</td>
                    <td>Total gold: {{parseInt(userInfo.gold) + parseInt(userInfo.points)}}</td>
                </tr>
                <tr>
                    <td>Mailbox: {{userInfo.email}}</td>
                    <td>Integral: {{userInfo.points}}</td>
                </tr>
                <tr>
                    <td class="user-nickname">{{userInfo.nickname}}</td>
                    <td>Third-party account: {{userInfo.third}}</td>
                    <td>Registration time: {{userInfo.time}}</td>
                </tr>
            </table>
            <table v-if="rechargeRecord.length" class="recharge-record">
                <caption>Recharge record</caption>
                <thead>
                <th>Recharge coins</th>
                <th>Recharge amount</th>
                <th>Recharge channels</th>
                <th>Recharge time</th>
                </thead>
                <tbody>
                <tr v-for="entry in rechargeRecord">
                    <td v-for="key in rechargeColumns">
                        {{entry[key]}}
                    </td>
                </tr>
                </tbody>
            </table>
            <table v-if="expenseRecord.length" class="expense-record">
                <caption>Expenses record</caption>
                <thead>
                <th>Issue</th>
                <th>Product name</th>
                <th>Buy shares</th>
                <th>Buy time</th>
                </thead>
                <tbody>
                <tr v-for="entry in expenseRecord">
                    <td v-for="key in expenseColumns">
                        {{entry[key]}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import {get} from '_api/callAPI.js'
    export default {
        name: 'UserInfo',

        data(){
            return {
                userInfo: {},
                rechargeRecord: [],
                rechargeColumns: ['charge_coin', 'money', 'channel', 'time'],
                expenseRecord: [],
                expenseColumns: ['period_id', 'name', 'buy_unit', 'time'],
                userIconSrc: ''
            }
        },

        route: {
            data: function (transition) {
                var id = transition.to.params.id;
                get(this, '/console/api/user/detail', {uid: id}, function (context, data) {
                    context.$set('userInfo', data);
                    context.$set('userIconSrc', context.userInfo['headimgurl']);
                    context.$set('rechargeRecord', data.charge_history);
                    context.$set('expenseRecord', data.consume_history);
                });
            }
        }
    }
</script>