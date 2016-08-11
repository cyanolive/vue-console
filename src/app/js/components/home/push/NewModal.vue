<style lang="stylus" rel="stylesheet/scss">
    .push-new-modal {
        .modal-container {
            width: 450px;
        }

        h2 {
            font-size: 22px;
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
                background-image: url(../../../../assets/images/close.png);

            }
        }

        .push-new-form {
            margin-left: 24px;
            margin-right: 24px;
        }
        input[type="radio"], input[type="checkbox"] {
            margin-left: 15px;
        }
        .push-upload-pic div {
            display: inline-block;
        }
        .img-pre-wrap .img-detail-placeholder {
            width: 80px;
            height: 80px;
            background-position: center center;
            margin-left: 15px;
            img {
                position: static;
                width: 80px;
                height: 80px;
            }
        }


        .cancel-btn, .pre-release-btn  {
            color: #fff;
            background-color: #f44336;
            width: 192px;
            margin-left: 3px;
            margin-right: 3px;
        }
    }

    [class*=" datetimepicker-dropdown"]:before {
        top: -7px;
        left: 176px;
    }

    [class*=" datetimepicker-dropdown"]:after {
        top: -6px;
        left: 176px;
    }
</style>
<template>
    <div v-show="shownewmodal" class="push-new-modal">
        <ui-modal :show.sync="shownewmodal">
            <h2 slot="header">Pre-Release
                <span class="closed" @click="shownewmodal=false"></span>
            </h2>
            <form slot="body" class="push-new-form form-horizontal" role="form" v-el:form>
                <div class="form-group">
                    <label for="push-type" class="col-sm-5 control-label">Push Type : </label>
                    <input id="push-type" type="radio" checked="checked" name="type" value="0"/>Commodity
                    <input id="push-type" type="radio" name="type" value="1"/>H5
                </div>
                <div class="form-group">
                    <label class="col-sm-5 control-label" for="push-url">ID/URL : </label>
                    <div class="col-sm-7">
                        <input id="push-url" class="form-control" type="text" name="info"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-5 control-label" for="push-title">Title : </label>
                    <div class="col-sm-7">
                        <input id="push-title" class="form-control" type="text" name="title"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-5 control-label" for="push-desc">Description : </label>
                    <div class="col-sm-7">
                        <input id="push-desc" class="form-control" type="text" name="description"/>
                    </div>
                </div>
                <div class="form-group push-upload-pic">
                    <label class="col-sm-5 control-label" for="push-icon">Icon : </label>
                    <img-pre-wrap :items=files :len=1 v-ref:icon></img-pre-wrap>
                </div>
                <div class="form-group">
                    <label class="col-sm-5 control-label" for="push-expiration">Expiration Time : </label>
                    <div class='col-sm-7'>
                        <div class='input-group date' id="push-expiration" v-el:datepicker>
                            <input type='text' class="form-control" name="expiration_time" readonly/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-5 control-label" for="push-device">Android & iOS : </label>
                    <input id="push-device" type="checkbox" name="device1" value="android"/>Android
                    <input id="push-device" type="checkbox" name="device2" value="ios"/>iOS
                </div>
                <div class="form-group">
                    <label class="col-sm-5 control-label" for="push-local">Local : </label>
                    <input id="push-local" type="radio" checked="checked" name="locale" value="ru-ru"/>RU
                </div>
                <div class="form-group">
                    <button type="button" class="cancel-btn btn" @click=cancelPush>CANCEL</button>
                    <button type="submit" class="pre-release-btn btn" @click.stop.prevent="preRelease">PRE-RELEASE
                    </button>
                </div>
            </form>
            <div slot="footer"></div>
        </ui-modal>
    </div>
</template>

<script>
    import UiModal from "_ui-modules/modal.vue"
    import imgPreWrap from "_ui-modules/util/imgPreWrap.vue"
    import {post} from '_api/callAPI.js'
    export default {
        name: "NewModal",

        components: {
            UiModal,
            imgPreWrap
        },

        props: {
            shownewmodal: {
                type: Boolean,
                twoWay: true
            }
        },

        ready(){
            $('#push-expiration').datetimepicker({
                format: "YYYY-MM-DD HH:mm:ss",
                ignoreReadonly: true,
                sideBySide: true
            });
        },

        data: function () {
            return {files: []}
        },

        methods: {
            preRelease: function () {
                var formData = new FormData(this.$els.form);
                var file = this.$refs.icon.get(),
                        fileArr = [],
                        self = this;

                fileArr = this.getImages(file);
                formData.append('icon', fileArr[0]);
                formData.append('push_type', 'pre-push');

                post(this, '/console/api/message/push', formData, function (data, status) {
                    if (data.sta === 0) {
                        self.$els.form.reset();
                        self.shownewmodal = false;
                        self.$dispatch('update-prerelease-push');
                    }
                });


            },

            getImages: function (imgArr) {
                var filesArr = [],
                        self = this;
                imgArr.forEach(function (item) {
                    if (item && item.file) {
                        filesArr.push(item.file);
                    }
                });
                return filesArr;
            },

            cancelPush: function () {
                this.$els.form.reset();
                this.shownewmodal = false;
            }

        }
    }
</script>
