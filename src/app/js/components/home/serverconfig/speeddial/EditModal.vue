<style lang="stylus" rel="stylesheet/scss">
    .edit-speeddial-modal {
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

        .edit-speeddial-form {
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
        .edit-speeddial-btn {
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
    <div v-show="showmodal" class="edit-speeddial-modal">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header">Edit
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form slot="body" class="form-horizontal" role="form" v-el:form>
                <div class="form-group">
                    <label for="edit-speeddial-title" class="col-sm-3 control-label">Title : </label>
                    <div class="col-sm-8">
                        <input id="edit-speeddial-title" type="text" name="title" class="form-control"
                               v-model="title" required/>
                    </div>
                </div>
                <div class="form-group upload-pic">
                    <label for="edit-speeddial-img" class="col-sm-3 control-label">Image : </label>
                    <div class="col-sm-8">
                        <img-pre-wrap :items=files :len=1 v-ref:speeddial></img-pre-wrap>
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-speeddial-url" class="col-sm-3 control-label">URL : </label>
                    <div class="col-sm-8">
                        <input id="edit-speeddial-url" type="text" name="path" v-model="path"
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
                    <button type="submit" class="btn edit-speeddial-btn" @click.top.prevent="editSpeeddial(id)">
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
            editSpeeddial: function (id) {
                var formData = new FormData(this.$els.form);
                if (this.minappvc == "") {
                    formData.delete("min_appvc");
                }
                if (this.maxappvc == "") {
                    formData.delete("max_appvc");
                }
                var file = this.$refs.speeddial.get(),
                        fileArr = [],
                        self = this;

                fileArr = this.getImages(file);
                formData.append('image', fileArr[0]);
                formData.append('id', id);
                post(this, '/console/api/speeddial/edit', formData, function (data, status) {
                    if (data.sta === 0) {
                        self.showmodal = false;
                        console.log('Edit the speeddial success!');
                        self.$dispatch('update-speeddial-table');
                    } else {
                        alert('Failed to edit the speeddial, ' + data.tips);
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
            'speeddial_edit_click': function (speeddialData) {
                this.id = speeddialData.id;
                this.title = speeddialData.title;
                try {
                    this.files.pop();
                } finally {
                    this.files.push({src: speeddialData.url, id: 0});
                }
                this.path = speeddialData.path;
                this.minappvc = speeddialData.min_appvc;
                this.maxappvc = speeddialData.max_appvc;
            }
        }
    }
</script>