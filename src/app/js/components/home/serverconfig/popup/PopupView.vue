<style lang="stylus" rel="stylesheet/scss">
    .popup-view {
        img {
            height: 200px;
        }

        .img-pre-wrap .img-detail-placeholder {
            width: auto;
            min-width: 100px;
            height: 200px;
            background-position: center center;
            background-image: url(../../../../../assets/images/add_normal.png);
            border: none;
            img {
                position: static;
                width: auto;
                min-width: 100px;
                height: 200px;
            }
        }
    }
</style>
<template>
    <div class="popup-view">
        <form class="form-horizontal" v-el:form>
            <div class="form-group upload-pic">
                <label class="col-sm-2 control-label">Image : </label>
                <div class="col-sm-6">
                    <img-pre-wrap v-if="editable" :items=image :len=1 v-ref:popup></img-pre-wrap>
                    <img v-else :src="image[0].src"/>
                </div>
            </div>
            <div class="form-group">
                <label for="click-url" class="col-sm-2 control-label">ClickUrl : </label>
                <div class="col-sm-6">
                    <input id="click-url" type="text" name="click-url" class="form-control"
                           disabled="{{!editable}}" v-model="clickUrl" required/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label" for="aimed-user">Aimed User : </label>
                <div class='col-sm-2'>
                    <select type='text' class="form-control" id='aimed-user' name="aimed-user" v-model="aimedUser"
                           disabled="{{!editable}}" readonly>
                        <option v-for="(index, option) in aimed_user_dict" :value="index + 1">
                            {{option}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label" for="popup-num">Popup Num : </label>
                <div class='col-sm-6'>
                    <input id="popup-num" type="text" name="popup-num" class="form-control"
                    disabled="{{!editable}}" v-model="popupNum" placeholder="0 for unlimited" required/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-9">
                    <button class="btn btn-danger col-sm-1" @click.stop.prevent="enableEdit">
                        {{editable?"Cancel Edit":"Enable Edit"}}
                    </button>
                    <button type="submit" class="btn btn-danger col-sm-1 col-sm-offset-1"
                            disabled="{{!editable}}" @click.stop.prevent="submitPopup">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script type="text/javascript">
    import imgPreWrap from "_ui-modules/util/imgPreWrap.vue"
    import {get, post} from '_api/callAPI.js'

    export default {
        name: 'PopupConfig',

        components: {
            imgPreWrap
        },

        data() {
            return {
                image: [],
                id: 0,
                clickUrl: "",
                aimed_user_dict: ['All users', 'Unlogged in', "Logged in"],
                aimedUser: 1,
                popupNum: 0,
                editable: false
            }
        },

        methods: {
            getPopup: function () {
                get(this, '/console/api/serverconfig/popup/get', {}, function (context, data) {
                    if (data.sta == 0) {
                        try {
                            context.image.pop();
                        } finally {
                            context.image.push({src: data.image, id: 0});
                        }
                        context.clickUrl = data.path;
                        context.aimedUser = data.aimed_user;
                        context.popupNum = data.popup_num;
                    } else {
                        try {
                            context.image.pop();
                        } finally {
                        }
                        context.clickUrl = "";
                        context.aimedUser = "";
                        context.popupNum = "";
                    }
                })
            },

            enableEdit: function () {
                if (this.editable) {
                    this.getPopup();
                }
                this.editable = !this.editable;
            },

            submitPopup: function () {
                var formdata = new FormData(), _this = this;
                formdata.append("click-url", this.clickUrl);
                formdata.append("aimed-user", this.aimedUser);
                formdata.append("popup-num", this.popupNum);
                var imgdetail = this.image,
                        imgDetailArr = [],
                        self = this;
                if (this.image[0] && this.image[0].file) {
                    formdata.append('image', this.image[0].file)
                } else if (this.image[0] && this.image[0].id !== undefined) {
                    formdata.append('image', this.image[0].src);
                }
                post(this, '/console/api/serverconfig/popup/set', formdata, function (data, status) {
                    if (data.sta == -1) {
                        alert(data.tips);
                    }
                    _this.getPopup();
                    _this.editable = false;
                });
            }
        },

        ready() {
            $('#datetimepicker1').datetimepicker({
                format: "YYYY-MM-DD HH:mm:ss",
                ignoreReadonly: true,
                toolbarPlacement: "bottom",
                showTodayButton: true,
                showClear: true,
                showClose: true,
                sideBySide: true
            });
            $('#datetimepicker2').datetimepicker({
                format: "YYYY-MM-DD HH:mm:ss",
                ignoreReadonly: true,
                toolbarPlacement: "bottom",
                showTodayButton: true,
                showClear: true,
                showClose: true,
                sideBySide: true
            });
            this.getPopup();
        },
    }
</script>