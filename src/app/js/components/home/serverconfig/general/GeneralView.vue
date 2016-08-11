<style lang="stylus" rel="stylesheet/scss">
    .general-view {
        font-size: 16px;
        color: rgba(0, 0, 0, .87);

        h3 {
            margin-bottom: 0px;
        }

        .login-tips-form {
            margin-top: 20px;
            border-style: dashed;
        }

        .config-title {
            margin-bottom: 10px;
        }

        .panel {
            padding-top: 20px;
            border: 1px;
            border-style: solid;
        }

        .form-control {
            min-width: 80px;
        }
    }

</style>
<template>
    <div class="general-view col-md-offset-1">
        <div class="row config-title">
            <h3 class="col-lg-1">LoginTips</h3>
        </div>
        <div class="col-lg-9 panel">
            <form class="form-horizontal" v-el:login-tips-form>
                <div class="form-group">
                    <label for="origin-login-tips" class="col-lg-2 control-label">Origin Tips : </label>
                    <div class="col-lg-9">
                        <input id="origin-login-tips" class="form-control" type="text" :value='originTips' readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="new-login-tips" class="col-lg-2 control-label">New Tips : </label>
                    <div class="col-lg-9">
                        <input id="new-login-tips" class="form-control" type="text" v-model="newTips">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-9">
                        <button type="submit" class="btn btn-danger col-lg-2" @click.stop.prevent="setLoginTips">
                            Modify
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-lg-12"></div>
        <div class="row config-title">
            <h3 class="col-lg-1">InvitationActive</h3>
        </div>
        <div class="col-lg-9 panel">
            <form class="form-horizontal" v-el:invitation-active-form>
                <div class="form-group">
                    <label for="origin-invitation-active" class="col-lg-2 col-xs-2 control-label">Origin Status
                        : </label>
                    <div class="col-lg-1 col-xs-2">
                        <input id="origin-invitation-active" class="form-control" type="text"
                               :value='originInvitationStatus'
                               readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="new-invitation-active" class="col-lg-2 col-xs-2 control-label">New Tips : </label>
                    <div class="col-lg-1 col-xs-2">
                        <select class="form-control" disabled v-model="newInvitationStatus">
                            <option value=true>True</option>
                            <option value=false>False</option>
                        </select>
                    </div>
                    <div class="col-lg-offset-2  col-lg-9">
                        <span id="helpBlock" class="help-Block">Hard coded in server, cannot modify by now</span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-9">
                        <button type="submit" class="btn btn-danger col-lg-2" disabled
                                @click.stop.prevent="">
                            Modify
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {get, post} from '_api/callAPI.js'

    export default {
        name: 'GeneralConfig',

        data() {
            return {
                originTips: "",
                newTips: "",
                originInvitationStatus: "True",
                newInvitationStatus: ""
            }
        },

        methods: {
            getLoginTips: function () {
                get(this, '/console/api/serverconfig/general/get', {}, function (context, data) {
                    if (data.sta == 0 && data.tips) {
                        context.originTips = data.tips
                    }
                })
            },

            setLoginTips: function () {
                if (this.newTips) {
                    var formdata = new FormData(), _this = this;
                    formdata.append("tips", this.newTips);
                    post(this, '/console/api/serverconfig/general/set', formdata, function (context, data) {
                        _this.getLoginTips();
                        _this.newTips = "";
                    });
                }
            }
        },

        ready() {
            this.getLoginTips()
        },

        components: {}
    }
</script>