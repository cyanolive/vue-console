<style lang="stylus" rel="stylesheet/scss">
    .share-order-modal {

        .modal-container {
            width: 700px;
        }

        .modify-btn {
            color: #fff;

            background-color: #f44336;
            width: 192px;
            margin-top: 10px;
            margin-bottom: 20px;
        }

        .input-append {
            display: inline-block;
            .add-on {
                display: inline-block;
                width: auto;
                height: 30px;
                min-width: 16px;
                padding: 4px 5px;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                text-shadow: 0 1px 0 #fff;
                background-color: #eee;
                border: 1px solid #a9a9a9;
                margin-left: -1px;
            }

            input[type="text"] {
                width: 430px;
            }

        }
        .icon-calendar {
            display: inline-block;
            background-image: url(../../../../../assets/images/calendar.png);
            background-position: -0px -0px;
            background-size: 100%;
            margin-top: 1px;
            line-height: 14px;
            background-repeat: no-repeat;
        }

        [class*=" datetimepicker-dropdown"]:before {
            top: -7px;
            left: 176px;
        }

        [class*=" datetimepicker-dropdown"]:after {
            top: -6px;
            left: 176px;
        }

        .modal-body {
            margin-bottom: 0px;
        }
        .img-pre-wrap .img-detail-placeholder {
            width: 120px;
            height: 90px;
            background-position: center center;
            img {
                position: static;
                width: 120px;
                height: 90px;
            }
        }

        .share-order-header {
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
    }
</style>
<template>
    <div v-show="showmodal" class="share-order-modal">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header" class="share-order-header">{{operate}} Share Record
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form id="share-form" class="form-horizontal" slot="body" v-el:form>
                <input name="id" hidden v-model="shareId"/>
                <div class="form-group">
                    <label for="user-id" class="col-sm-2 control-label">User ID : </label>
                    <div class="col-sm-10">
                        <input id="user-id" class="form-control" type="text" :value='userId' disabled name="uid">
                    </div>
                </div>
                <div class="form-group">
                    <label for="period-id" class="col-sm-2 control-label">Period ID : </label>
                    <div class="col-sm-10">
                        <input id="period-id" class="form-control" type="text" :value='periodId' disabled name="pid">
                    </div>
                </div>
                <div class="form-group">
                    <label for="title" class="col-sm-2 control-label">Title : </label>
                    <div class="col-sm-10">
                        <input id="title" class="form-control" type="text" v-model="title" name="title"
                               :disabled="!enabled">
                    </div>
                </div>
                <div class="form-group">
                    <label for="content" class="col-sm-2 control-label">Content : </label>
                    <div class="col-sm-10">
                        <textarea id="content" class="form-control" name="content" rows=3 v-model="content"
                                  :disabled="!enabled"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="share-time">Share Time : </label>
                    <div class='col-sm-10'>
                        <div class='input-group date' id='datetimepicker1'>
                            <input type='text' class="form-control" name="share-time" v-model="shareTime"
                                   disabled="{{!enabled}}" readonly/>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="img-detail" class="control-label col-sm-2">Images: </label>
                    <div class="col-sm-10">
                        <div id="img-detail" class="img-detail">
                            <img-pre-wrap :items=images :len=imgLen :enabled=enabled v-ref:imgdetail></img-pre-wrap>
                        </div>
                    </div>
                </div>
                <div class="form-group" v-if="enabled" style="text-align: center">
                    <button type="submit" class="modify-btn btn" @click.stop.prevent="uploadShare">SUBMIT
                    </button>
                </div>
            </form>
            <div class="row" slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from '_ui-modules/modal.vue'
    import {get, post} from '_api/callAPI.js'
    import imgPreWrap from '_ui-modules/util/imgPreWrap.vue'

    export default {
        name: 'ShareOrderModal',

        props: {
            showmodal: {
                type: Boolean,
                twoWay: true
            }
        },

        components: {
            UiModal,
            imgPreWrap
        },

        data(){
            return {
                images: [],
                imgLen: 8,
                shareId: -1,
                userId: -1,
                periodId: -1,
                title: '',
                content: '',
                shareTime: '',
                enabled: true,
                operate: 'View'
            }
        },

        ready(){
            $('#datetimepicker1').datetimepicker({
                format: "YYYY-MM-DD HH:mm:ss",
                ignoreReadonly: true,
                toolbarPlacement: "bottom",
                showTodayButton: true,
                showClear: true,
                showClose: true,
                sideBySide: true
            });
        },

        methods: {
            getFormData: function () {
                var form = document.getElementById('share-form');
                var formData = new FormData(form);
                var imgdetail = this.images,
                        imgDetailArr = [],
                        self = this;
                imgDetailArr = this.getDetailImages(imgdetail);
                imgDetailArr.forEach(function (item, i) {
                    formData.append('image' + i, item);
                });
                return formData;
            },

            uploadShare: function () {
                var formData = this.getFormData(),
                        self = this;
                formData.append('uid', this.userId);
                formData.append('pid', this.periodId);
                if (self.shareId == -1) {
                    post(this, '/console/api/share/add', formData, function (data) {
                        if (data.sta === 0) {
                            self.showmodal = false;
                            self.$parent.$parent.search();
                        }
                    })
                } else {
                    post(this, '/console/api/share/edit', formData, function (data) {
                        if (data.sta === 0) {
                            self.showmodal = false;
                            self.$parent.$parent.search();
                        }
                    })
                }
            },

            getDetailImages: function (imgArr) {
                var filesArr = [],
                        self = this;
                imgArr.forEach(function (item) {
                    if (item && item.file) {
                        filesArr.push(item.file);
                    } else if (item && item.id !== undefined) {
                        filesArr.push(self.images[item.id]['src']);
                    }
                });
                return filesArr;
            }
        },

        events: {
            'share-order': function (uid, pid) {
                this.enabled = true;
                this.operate = "Add";
                this.$set('userId', uid);
                this.$set('periodId', pid);
                this.title = "";
                this.content = "";
                this.shareTime = "";
                while (this.images.pop()) {
                }
            },

            'share-edit': function (id) {
                this.enabled = true;
                this.operate = "Edit";
                var params = {
                    id: parseInt(id)
                }
                while (this.images.pop()) {
                }
                get(this, '/console/api/share/detail', params, function (context, data) {
                    context.shareId = data.display_id;
                    context.userId = data.user;
                    context.periodId = data.treasure;
                    context.title = data.title;
                    context.content = data.desc;
                    context.shareTime = data.display_time;

                    data.images.forEach(function (image, index) {
                        context.images.push({src: image['big_url'], id: index, imgid: image['img_id']});
                    });
                })
            },

            'share-view': function (id) {
                this.enabled = false;
                this.operate = "View";
                var params = {
                    id: parseInt(id)
                }
                while (this.images.pop()) {
                }
                get(this, '/console/api/share/detail', params, function (context, data) {
                    context.shareId = data.display_id;
                    context.userId = data.user;
                    context.periodId = data.treasure;
                    context.title = data.title;
                    context.content = data.desc;
                    context.shareTime = data.display_time;

                    data.images.forEach(function (image, index) {
                        context.images.push({src: image['big_url'], id: index, img_id: image['img_id']});
                    });
                })
            }
        }
    }
</script>