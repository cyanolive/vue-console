<style lang="stylus" rel="stylesheet/scss">
    .updation-view {
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
    }
</style>
<template>
    <div class="updation-view col-md-offset-1">
        <div class="row config-title">
            <h3 class="col-lg-1">Android</h3>
        </div>
        <div class="col-lg-10 panel">
            <form class="form-horizontal" v-el:form>
                <div class="form-group">
                    <label for="title" class="col-sm-2 control-label">Title : </label>
                    <div class="col-sm-9">
                        <input id="title" type="text" name="title" class="form-control"
                               disabled="{{!editableAndroid}}" v-model="title_android" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="content" class="col-sm-2 control-label">Content : </label>
                    <div class="col-sm-9">
                        <textarea id="content" class="form-control" name="content" rows=5 v-model="content_android"
                                  disabled="{{!editableAndroid}}" required></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label for="version-name" class="col-sm-2 control-label">Version Name : </label>
                    <div class="col-sm-9">
                        <input id="version-name" type="text" name="version-name" class="form-control"
                               disabled="{{!editableAndroid}}" v-model="version_name_android" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="version-code" class="col-sm-2 control-label">Version Code : </label>
                    <div class="col-sm-9">
                        <input id="version-code" type="text" name="version-code" class="form-control"
                               disabled="{{!editableAndroid}}" v-model="version_code_android" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="package-name" class="col-sm-2 control-label">Package Name : </label>
                    <div class="col-sm-9">
                        <input id="package-name" type="text" name="package-name" class="form-control"
                               disabled="{{!editableAndroid}}" v-model="package_name_android" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="download-url" class="col-sm-2 control-label">Download URL : </label>
                    <div class="col-sm-9">
                        <input id="download-url" type="text" name="download-url" class="form-control"
                               disabled="{{!editableAndroid}}" v-model="download_url_android" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="thirdparty-url" class="col-sm-2 control-label">Thirdparty URL : </label>
                    <div class="col-sm-9">
                        <input id="thirdparty-url" type="text" name="thirdparty-url" class="form-control"
                               disabled="{{!editableAndroid}}" v-model="thirdparty_url_android" required/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-9">
                        <button class="btn btn-danger col-sm-2" @click.stop.prevent="enableEditAndroid">
                            {{editableAndroid?"Cancel Edit":"Enable Edit"}}
                        </button>
                        <button type="submit" class="btn btn-danger col-sm-2 col-sm-offset-1"
                                disabled="{{!editableAndroid}}" @click.stop.prevent="submitUpdation(0)">
                            Submit
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
        name: 'Updation',

        data() {
            return {
                editableAndroid: false,
                title_android: "",
                content_android: "",
                version_name_android: "",
                version_code_android: 0,
                package_name_android: "",
                download_url_android: "",
                thirdparty_url_android: ""
            }
        },

        methods: {
            getUpdation: function (os) {
                if (os == 0) {
                    var params = {os: "android"};
                    get(this, '/console/api/serverconfig/updation/get', params, function (context, data) {
                        if (data.sta == 0) {
                            context.title_android = data.whats_new_title;
                            context.content_android = data.whats_new_content;
                            context.version_name_android = data.version_name;
                            context.version_code_android = data.version_code;
                            context.package_name_android = data.package_name;
                            context.download_url_android = data.download_url;
                            context.thirdparty_url_android = data.download_url_thirdparty;
                        } else {
                            context.title_android = "";
                            context.content_android = "";
                            context.version_name_android = "";
                            context.version_code_android = 0;
                            context.package_name_android = "";
                            context.download_url_android = "";
                            context.thirdparty_url_android = "";
                        }
                    })
                }
            },

            enableEditAndroid: function () {
                if (this.editableAndroid) {
                    this.getUpdation(0);
                }
                this.editableAndroid = !this.editableAndroid;
            },

            submitUpdation: function (os) {
                if (os == 0) {
                    var formdata = new FormData(), _this = this;
                    formdata.append("os", "android");
                    formdata.append("title", this.title_android);
                    formdata.append("content", this.content_android);
                    formdata.append("appvn", this.version_name_android);
                    formdata.append("appvc", this.version_code_android);
                    formdata.append("packageName", this.package_name_android);
                    formdata.append("downloadUrl", this.download_url_android);
                    formdata.append("thirdpartyUrl", this.thirdparty_url_android);
                    post(this, '/console/api/serverconfig/updation/set', formdata, function (data, status) {
                        if (data.sta == -1) {
                            alert(data.tips);
                        }
                        _this.getUpdation(0);
                        _this.editableAndroid = false;
                    });
                }
            }
        },

        ready() {
            this.getUpdation(0);
        },
    }
</script>