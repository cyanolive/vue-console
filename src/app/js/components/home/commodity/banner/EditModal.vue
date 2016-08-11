<style lang="stylus" rel="stylesheet/scss">
    .edit-banner-modal {
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
                background-image: url(../../../../../assets/images/close.png);

            }
        }

        .edit-banner-form {
            margin-left: 24px;
            margin-right: 24px;
        }
        .upload-pic div {
            display: inline-block;
        }
        .img-pre-wrap .img-detail-placeholder {
            width: 280px;
            height: 125px;
            background-position: center center;
            background-image: url(../../../../../assets/images/banner_add.png);
            border: none;
            img {
                position: static;
                width: 280px;
                height: 125px;
            }
        }
        .edit-banner-btn {
            background-color: #f44336;
            color: #fff;
            background-color: #f44336;
            width: 192px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }
</style>
<template>
    <div v-show="showmodal" class="edit-banner-modal">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header">Edit
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form slot="body" class="form-horizontal" role="form" v-el:form>
                <div class="form-group">
                    <label for="edit-banner-title" class="col-sm-3 control-label">Title : </label>
                    <div class="col-sm-8">
                        <input id="edit-banner-title" type="text" name="title" class="form-control"
                               v-model="title" required/>
                    </div>
                </div>
                <div class="form-group upload-pic">
                    <label for="edit-banner-img" class="col-sm-3 control-label">Banner : </label>
                    <div class="col-sm-8">
                        <img-pre-wrap :items=files :len=1 v-ref:banner></img-pre-wrap>
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-banner-url" class="col-sm-3 control-label">URL : </label>
                    <div class="col-sm-8">
                        <input id="edit-banner-url" type="text" name="path" v-model="path"
                               class="form-control" required/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-min-appvc" class="col-sm-3 control-label">Min Appvc : </label>
                    <div class="col-sm-8">
                        <input id="edit-min-appvc" placeholder="0" type="text" name="min_appvc" v-model="minappvc"
                               class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-max-appvc" class="col-sm-3 control-label">Max Appvc : </label>
                    <div class="col-sm-8">
                        <input id="edit-max-appvc" placeholder="2147483647" type="text" name="max_appvc" v-model="maxappvc"
                               class="form-control"/>
                    </div>
                </div>
                <div class="form-group" style="text-align: center">
                    <button type="submit" class="btn edit-banner-btn" @click.top.prevent="editBanner(id)">
                        FINISH
                    </button>
                </div>
            </form>
            <div class="row" slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from "_ui-modules/modal.vue"
    import imgPreWrap from "_ui-modules/util/imgPreWrap.vue"
    import {get, post} from '_api/callAPI.js'
    export default {
        name: "EditModal",

        components: {
            UiModal,
            imgPreWrap
        },

        props: {
            showmodal: {
                type: Boolean,
                twoWay: true
            }
        },

        data(){
            return {
                id: 0,
                title: "",
                files: [],
                path: "",
                minappvc: "",
                maxappvc: ""
            }
        },

        methods: {
            editBanner: function (id) {
                var formData = new FormData(this.$els.form);
                if (this.minappvc == "") {
                    formData.delete("min_appvc");
                }
                if (this.maxappvc == "") {
                    formData.delete("max_appvc");
                }
                var file = this.$refs.banner.get(),
                        fileArr = [],
                        self = this;

                fileArr = this.getImages(file);
                formData.append('banner', fileArr[0]);
                formData.append('id', id);
                post(this, '/console/api/banner/edit', formData, function (data, status) {
                    if (data.sta === 0) {
                        self.showmodal = false;
                        console.log('Edit the banner success!');
                        self.$dispatch('update-banner-table');
                    } else {
                        alert('Failed to edit the banner, ' + data.tips);
                    }
                });
            },

            getImages: function (imgArr) {
                var filesArr = [],
                        self = this;
                imgArr.forEach(function (item) {
                    if (item && item.file) {
                        filesArr.push(item.file);
                    } else if (item && item.id !== undefined) {
                        filesArr.push(self.files[0].src);
                    }
                });
                return filesArr;
            }
        },

        events: {
            'banner_edit_click': function (bannerData) {
                this.id = bannerData.id;
                this.title = bannerData.title;
                try {
                    this.files.pop();
                } finally {
                    this.files.push({src: bannerData.url, id: 0});
                }
                this.path = bannerData.path;
                this.minappvc = bannerData.min_appvc;
                this.maxappvc = bannerData.max_appvc;
            }
        }
    }
</script>