<style lang="stylus" rel="stylesheet/scss">
    .cat-edit-modal {
        .modal-container {
            width: 350px;
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
                background-image: url(../../../../../assets/images/close.png);

            }
        }

        .cat-edit-form {
            margin-left: 24px;
            margin-right: 24px;
        }

        .cat-edit-btn {
            color: #fff;
            background-color: #f44336;
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }
</style>
<template>
    <div v-show="showeditmodal" class="cat-edit-modal">
        <ui-modal :show.sync="showeditmodal">
            <h2 slot="header">Edit classification
                <span class="closed" @click="showeditmodal=false"></span>
            </h2>
            <form id="cat-edit-form" class="cat-edit-form form-horizontal" role="form" slot="body">
                <input type="text" name="name" required class="form-control" maxlength=50 value="{{catname}}">
                <button type="sumbit" class="cat-edit-btn btn form-control" @click.prevent="editCats">SUBMIT</button>
            </form>
            <div slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from "_ui-modules/modal.vue"
    import {post} from "_api/callAPI.js"
    export default {
        name: 'EditModal',

        components: {
            UiModal
        },

        props: {
            showeditmodal: {
                type: Boolean,
                twoWay: true
            },
            catname: String,
            catid: String
        },

        methods: {
            editCats: function () {
                var form = document.getElementById('cat-edit-form'),
                        self = this;
                var formData = new FormData(form);
                formData.append('cid', this.catid);
                formData.append('desc', '');
                formData.append('icon_url', '');
                formData.append('privilege', '');
                post(this, '/console/api/category/edit', formData, function (data, status, request) {
                    console.log(JSON.stringify(data));
                    if (data.sta === 0) {
                        self.showeditmodal = false;
                        self.$parent.$parent.getAllCats();
                    } else {
                        alert('failed to modify the category of information !');
                    }
                });
            }
        }
    }
</script>