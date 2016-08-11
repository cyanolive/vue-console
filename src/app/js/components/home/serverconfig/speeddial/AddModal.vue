<style lang="stylus" rel="stylesheet/scss">
    .add-speeddial-modal {
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

        .add-speeddial-form {
            margin-left: 24px;
            margin-right: 24px;
        }
        .upload-pic div {
            display: inline-block;
        }
        .img-pre-wrap .img-detail-placeholder {
            width: 100px;
            height: 100px;
            background-position: center center;
            background-image: url(../../../../../assets/images/add_normal.png);
            border: none;
            img {
                position: static;
                width: 100px;
                height: 100px;
            }
        }
        .add-speeddial-btn {
            color: #fff;
            background-color: #f44336;
            width: 192px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }
</style>
<template>
    <div v-show="showmodal" class="add-speeddial-modal">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header">Add
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form slot="body" class="form-horizontal" role="form" v-el:form>
                <div class="form-group">
                    <label for="add-speeddial-title" class="col-sm-3 control-label">Title : </label>
                    <div class="col-sm-8">
                        <input id="add-speeddial-title" type="text" name="title" class="form-control" required/>
                    </div>
                </div>
                <div class="form-group upload-pic">
                    <label for="add-speeddial-img" class="col-sm-3 control-label">Image : </label>
                    <div class="col-sm-8">
                        <img-pre-wrap :items=images :len=1 v-ref:speeddial></img-pre-wrap>
                    </div>
                </div>
                <div class="form-group">
                    <label for="add-speeddial-title" class="col-sm-3 control-label">URL : </label>
                    <div class="col-sm-8">
                        <input id="add-speeddial-title" type="text" name="path" class="form-control" required/>
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
                    <button type="submit" class="btn add-speeddial-btn" @click.top.prevent="addSpeeddial">FINISH</button>
                </div>
            </form>
            <div class="row" slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from "_ui-modules/modal.vue"
    import imgPreWrap from "_ui-modules/util/imgPreWrap.vue"
    import {post} from '_api/callAPI.js'
    export default {
        name: "AddModal",

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

        data() {
            return {
                images: [],
                minappvc: "",
                maxappvc: ""
            }
        },

        methods: {
            addSpeeddial: function () {
                var formData = new FormData(this.$els.form);
                if (this.minappvc == "") {
                    formData.delete("min_appvc");
                }
                if (this.maxappvc == "") {
                    formData.delete("max_appvc");
                }
                var file = this.images,
                        fileArr = [],
                        self = this;

                fileArr = this.getImages(file);
                formData.append('image', fileArr[0]);
                post(this, '/console/api/speeddial/add', formData, function (data, status) {
                    if (data.sta === 0) {
                        self.$els.form.reset();
                        self.showmodal = false;
                        self.$dispatch('update-speeddial-table');
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
            }
        }
    }
</script>