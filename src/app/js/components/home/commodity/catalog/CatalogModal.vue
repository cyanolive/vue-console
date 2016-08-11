<style lang="stylus" rel="stylesheet/scss">
    .setting-product-header {
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

    .setting-product-form {
        margin-left: 24px;
        margin-right: 24px;
        input, select {
            margin-right: 8px;
            color: rgba(0, 0, 0, .87);
            font-size: 16px;
        }
    }

    .setting-product-btn {
        color: #fff;
        margin-bottom: 24px;
        background-color: #f44336;
    }
</style>
<template>
    <div v-show="showmodal" class="catalog-setting-modal">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header" class="setting-product-header">Setting
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form id="setting-product-form" class="setting-product-form form-horizontal" role="form" slot="body">
                <div class="form-group">
                    <label for="total-price" class="control-label col-sm-4">Total Price :</label>
                    <div class="col-sm-7 input-group">
                        <input type="text" id="total-price" class="form-control" name="total"
                               required>
                        <span class="input-group-addon">coin</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="unit-price" class="control-label col-sm-4">Unit Price :</label>
                    <div class="col-sm-7 input-group">
                        <select id="unit-price" class="form-control" name="unit">
                            <option value=1 selected>1</option>
                            <option value=10>10</option>
                        </select>
                        <span class="input-group-addon">coin</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="default-coin" class="control-label col-sm-4">Default Coin :</label>
                    <div class="col-sm-7 input-group">
                        <input type="text" id="default-coin" class="form-control" name="default_coin"
                               value=1>
                        <span class="input-group-addon">coin</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="periods" class="control-label col-sm-4">Installments :</label>
                    <div class="col-sm-7" style="padding-left: 0px">
                        <input type="text" id="periods" class="form-control" name="periods" required>
                    </div>
                </div>
                <div>
                    <button type="submit" class="btn setting-product-btn col-sm-offset-1 col-sm-10"
                            @click.prevent="setProduct">SUBMIT
                    </button>
                </div>
            </form>
            <div class="row" slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script type="text/javascript">
    import UiModal from '_ui-modules/modal.vue'
    import {get, post} from '_api/callAPI.js'

    export default {

        name: 'CatalogModal',

        components: {
            UiModal
        },

        props: {
            showmodal: {
                type: Boolean,
                twoWay: true
            },
            proid: ''
        },

        data (){
            return {}
        },

        methods: {
            setProduct: function () {
                var form = document.getElementById('setting-product-form');
                var formData = new FormData(form),
                        self = this;
                formData.append('pid', this.proid);
                post(this, '/console/api/product/set', formData, function (data, status, request) {
                    if (data.sta === 0) {
                        self.showmodal = false;
                        self.$parent.$parent.dataConverter();
                    } else {
                        alert('failed to modify the commodity information!')
                    }
                });
            }
        }
    }
</script>
