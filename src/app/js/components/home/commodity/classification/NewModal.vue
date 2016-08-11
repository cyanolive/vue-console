<style lang="stylus" rel="stylesheet/scss">
    .cat-new-modal {
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

        .cat-new-form {
            margin-left: 24px;
            margin-right: 24px;
        }

        .cat-new-btn {
            color: #fff;
            background-color: #f44336;
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }
</style>
<template>
    <div v-show="shownewmodal" class="cat-new-modal">
        <ui-modal :show.sync="shownewmodal">
            <h2 slot="header">New classification
                <span class="closed" @click="shownewmodal=false"></span>
            </h2>
            <form id="cat-new-form" class="cat-new-form form-horizontal" role="form" slot="body">
                <input type="text" name="name" required class="form-control" maxlength=50>
                <button type="sumbit" class="cat-new-btn btn form-control" @click.prevent="addCats">SUBMIT</button>
            </form>
            <div slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from "_ui-modules/modal.vue"
    import {post} from "_api/callAPI.js"
    export default {
        name: 'NewModal',

        components: {
            UiModal
        },

        props: {
            shownewmodal: {
                type: Boolean,
                twoWay: true
            }
        },

        methods: {
            addCats: function () {
                var form = document.getElementById('cat-new-form')
                self = this;
                var formData = new FormData(form);
                formData.append('desc', '');
                formData.append('icon_url', '');
                post(this, '/console/api/category/add', formData, function (data, status, request) {
                    if (data.sta === 0) {
                        self.shownewmodal = false;
                        self.$parent.getAllCats();
                    } else {
                        alert('failed to add the new category!');
                    }
                });
            }
        }
    }
</script>