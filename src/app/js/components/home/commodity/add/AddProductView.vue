<style lang="stylus" rel="stylesheet/scss">
    .commodity-add {
        font-size: 16px;
        color: rgba(0, 0, 0, .87);

        label {
            color: #f44336;
        }

        .not-necessary {
            color: rgba(0, 0, 0, .54);
        }

        .add-product-btn, .update-product-btn {
            background-color: #f44336;
            color: #fff;
            margin-right: 16px;
        }

        .add-product-description {
            color: #f44336;
            margin-top: 10px;
        }

        .add-product-title-warning {
            color: rgba(0, 0, 0, .54);
            margin-top: 16px;
        }
    }

</style>
<template>
    <div class="commodity-add row">
        <form id="add-product-form" class="add-product form-horizontal col-lg-10" role="form"
              enctype="multipart/form- data">
            <div class="form-group">
                <label for="classification" class="control-label col-lg-2">Classification: </label>
                <div class="col-lg-2">
                    <select class="form-control" id="classification" required name="cid" v-model="proInfo.cid">
                        <option selected>Select category</option>
                        <option v-for="cat in catInfos" value={{cat.cid}}>{{cat.c_name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="title" class="control-label col-lg-2">Commodity title: </label>
                <div class="col-lg-8">
                    <input type="text" id="title" name="name" class="form-control" maxlength=100 required
                           v-model="proInfo.name"></input>
                    <span class="help-block">You can enter up {{proInfo.name.length == 0 ? 100 : 100-proInfo.name.length}} characters</span>
                </div>
            </div>
            <div class="form-group">
                <label for="subTitle" class="control-label col-lg-2 not-necessary">Subtitle: </label>
                <div class="col-lg-8">
                    <input type="text" id="subTitle" name="sub_title" class="form-control" max-length=100
                           v-model="proInfo.subtitle"></input>
                    <span class="help-block">You can enter up {{proInfo.subtitle.length == 0 ? 100 : 100-proInfo.subtitle.length}} characters</span>
                </div>
            </div>
            <div class="form-group row">
                <label for="thumbnails" class="control-label col-lg-2">Thumbnails: </label>
                <div class="col-lg-8">
                    <img-pre-wrap :items=thumbnails :len=1 v-ref:imgthumb></img-pre-wrap>
                </div>
            </div>
            <div class="form-group row">
                <label for="img-list" class="control-label col-lg-2">Image List: </label>
                <div class="col-lg-8">
                    <img-pre-wrap :items=images :len=imgDetailLen v-ref:imgpre></img-pre-wrap>
                </div>
            </div>
            <div class="form-group">
                <label for="product-detail" class="control-label col-lg-2 not-necessary">Product Details: </label>
                <div class="col-lg-8">
                    <textarea id="product-detail" name="detail" class="form-control" rows=3
                              v-model="proInfo.detail"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label for="img-detail" class="control-label col-lg-2">Image Detail: </label>
                <div id="img-detail" class="col-lg-8">
                    <img-pre-wrap :items=imagesList :len=imgLen v-ref:imgdetail></img-pre-wrap>
                </div>
            </div>
            <div class="col-lg-offset-1">
                <button v-if="showUpdateBtn" type="submit" class="update-product-btn btn col-lg-1"
                        @click.prevent="updateProduct">FINISH
                </button>
                <button v-else type="submit" class="add-product-btn btn col-lg-1" @click.prevent="addProduct">FINISH
                </button>
                <span class="add-product-description">(Description: red for mandatory option)</span>
            </div>
        </form>
    </div>
</template>

<script type="text/javascript">
    import {get, post} from '_api/callAPI.js'
    import imgPreWrap from '_ui-modules/util/imgPreWrap.vue'

    export default {
        name: 'AddProduct',

        data (){
            return {
                // items:[{src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1183223528,3058066243&fm=116&gp=0.jpg',fileid:1}],
                thumbnails: [],
                images: [],
                imagesList: [],
                catInfos: [],
                imgDetailLen: 5,
                imgLen: 10,
                showUpdateBtn: false,
                proInfo: {
                    name: '',
                    subtitle: ''
                }
            }
        },

        components: {
            imgPreWrap
        },

        created (){
            if (this.$route.query.pid != undefined) {
                this.showUpdateBtn = true;
                this.getProData();
            }
            this.getCats();
        },

        methods: {
            getProData: function () {
                var id = this.$route.query.pid;
                get(this, '/console/api/product/info', {pid: id}, function (self, info) {
                    self.$set('proInfo', info);
                    info.thumbnails.forEach(function (thumb, index) {
                        self.thumbnails.unshift({src: thumb['big_url'], id: index});
                    });
                    info.images.forEach(function (image, index) {
                        self.images.push({src: image['big_url'], id: index});
                    });
                    info.details.forEach(function (image, index) {
                        self.imagesList.push({src: image['big_url'], id: index});
                    });
                });
            },
            getCats: function () {
                get(this, '/console/api/category/list', {}, function (self, msg) {
                    self.$set('catInfos', msg);
                });
            },
            getFormData: function () {
                var form = document.getElementById('add-product-form');
                var formData = new FormData(form);
                var files = this.images,
                        thumbfiles = this.thumbnails,
                        imgDetail = this.imagesList,
                        filesArr = [],
                        thumbFilesArr = [],
                        imgDetailArr = [],
                        self = this;
                filesArr = this.getImages(files);
                thumbFilesArr = this.getThumbImages(thumbfiles);
                imgDetailArr = this.getDetailImages(imgDetail);
                formData.append('thumbnails', thumbFilesArr[0]);
                filesArr.forEach(function (item, i) {
                    formData.append('file' + i, item);
                });
                imgDetailArr.forEach(function (item, i) {
                    formData.append('image' + i, item);
                });
                return formData;
            },
            updateProduct: function () {
                var formData = this.getFormData(),
                        pid = this.$route.query.pid,
                        form = document.getElementById('add-product-form');
                formData.append('pid', pid);
                post(this, '/console/api/product/edit', formData, function (msg) {
                    console.log(JSON.stringify(msg));
                    form.reset();
                    router.go('/home/commodity/addProduct');
                });
            },
            addProduct: function () {
                var formData = this.getFormData(),
                        form = document.getElementById('add-product-form');
                post(this, '/console/api/product/add', formData, function (msg) {
                    form.reset();
                    console.log(JSON.stringify(msg));
                });
            },
            getImages: function (imgArr) {
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
            },
            getThumbImages: function (imgArr) {
                var filesArr = [],
                        self = this;
                imgArr.forEach(function (item) {
                    if (item && item.file) {
                        filesArr.push(item.file);
                    } else if (item && item.id !== undefined) {
                        filesArr.push(self.thumbnails[item.id]['src']);
                    }
                });
                return filesArr;
            },
            getDetailImages: function (imgArr) {
                var filesArr = [],
                        self = this;
                imgArr.forEach(function (item) {
                    if (item && item.file) {
                        filesArr.push(item.file);
                    } else if (item && item.id !== undefined) {
                        filesArr.push(self.imagesList[item.id]['src']);
                    }
                });
                return filesArr;
            }
        }
    }
</script>