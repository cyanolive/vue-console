<style lang="stylus" rel="stylesheet/scss">
    .splash-view {
        img {
            height: 400px;
        }

        .img-pre-wrap .img-detail-placeholder {
            width: auto;
            min-width: 200px;
            height: 400px;
            background-position: center center;
            background-image: url(../../../../../assets/images/add_normal.png);
            border: none;
            img {
                position: static;
                width: auto;
                min-width: 200px;
                height: 400px;
            }
        }
    }
</style>
<template>
    <div class="splash-view">
        <form class="form-horizontal" v-el:form>
            <div class="form-group upload-pic">
                <label class="col-sm-2 control-label">Image : </label>
                <div class="col-sm-6">
                    <img-pre-wrap v-if="editable" :items=image :len=1 v-ref:splash></img-pre-wrap>
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
                <label class="col-sm-2 control-label" for="start-time">Start Time : </label>
                <div class='col-sm-6'>
                    <div class='input-group date' id='datetimepicker1'>
                        <input type='text' class="form-control" name="start-time" v-model="startTime"
                               disabled="{{!editable}}" readonly/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label" for="end-time">End Time : </label>
                <div class='col-sm-6'>
                    <div class='input-group date' id='datetimepicker2'>
                        <input type='text' class="form-control" name="end-time" v-model="endTime"
                               disabled="{{!editable}}" readonly/>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-9">
                    <button class="btn btn-danger col-sm-1" @click.stop.prevent="enableEdit">
                        {{editable?"Cancel Edit":"Enable Edit"}}
                    </button>
                    <button type="submit" class="btn btn-danger col-sm-1 col-sm-offset-1"
                            disabled="{{!editable}}" @click.stop.prevent="submitSplash">
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
        name: 'SplashConfig',

        components: {
            imgPreWrap
        },

        data() {
            return {
                image: [],
                id: 0,
                clickUrl: "",
                startTime: "",
                endTime: "",
                editable: false
            }
        },

        methods: {
            getSplash: function () {
                get(this, '/console/api/serverconfig/splash/get', {}, function (context, data) {
                    if (data.sta == 0) {
                        try {
                            context.image.pop();
                        } finally {
                            context.image.push({src: data.image, id: 0});
                        }
                        context.clickUrl = data.path;
                        context.startTime = data.start_time;
                        context.endTime = data.end_time;
                    } else {
                        try {
                            context.image.pop();
                        } finally {
                        }
                        context.clickUrl = "";
                        context.startTime = "";
                        context.endTime = "";
                    }
                })
            },

            enableEdit: function () {
                if (this.editable) {
                    this.getSplash();
                }
                this.editable = !this.editable;
            },

            submitSplash: function () {
                var formdata = new FormData(), _this = this;
                formdata.append("click-url", this.clickUrl);
                formdata.append("start-time", this.startTime);
                formdata.append("end-time", this.endTime);
                var imgdetail = this.image,
                        imgDetailArr = [],
                        self = this;
                if (this.image[0] && this.image[0].file) {
                    formdata.append('image', this.image[0].file)
                } else if (this.image[0] && this.image[0].id !== undefined) {
                    formdata.append('image', this.image[0].src);
                }
                post(this, '/console/api/serverconfig/splash/set', formdata, function (data, status) {
                    if(data.sta == -1) {
                        alert(data.tips);
                    }
                    _this.getSplash();
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
            this.getSplash();
        },
    }
</script>