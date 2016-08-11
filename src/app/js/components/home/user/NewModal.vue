<style lang="stylus" rel="stylesheet/scss">
    .add-sensitive-word {
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
                background-image: url(../../../../assets/images/close.png);

            }
        }

        .sensitive-word-form {
            margin-left: 24px;
            margin-right: 24px;
        }

        .sensitive-word-btn {
            color: #fff;
            background-color: #f44336;
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }
</style>
<template>
    <div v-show="showmodal" class="add-sensitive-word">
        <ui-modal :show.sync="showmodal">
            <h2 slot="header">New sensitive words
                <span class="closed" @click="showmodal=false"></span>
            </h2>
            <form id="cat-new-form" class="sensitive-word-form form-horizontal" role="form" slot="body">
                <input type="text" name="word" required class="form-control" maxlength=50 v-el:input>
                <button type="sumbit" class="sensitive-word-btn btn form-control" @click.prevent="addWords">SUBMIT
                </button>
            </form>
            <div slot="footer"></div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from '_ui-modules/modal.vue'
    import {post} from '_api/callAPI'
    export default{
        name: 'Modal',

        components: {
            UiModal
        },

        props: {
            showmodal: {
                type: Boolean,
                twoWay: true
            }
        },

        methods: {
            addWords: function () {
                var params = {word: this.$els.input.value};
                var self = this;
                post(this, '/console/api/sensitive/add', params, function (data, status, request) {
                    if (data.sta === 0) {
                        self.showmodal = false;
                        self.$els.input.value = '';
                        self.$dispatch('update-sensitive-list');
                    } else {
                        alert('failed to add the new sensitive word!');
                    }
                });
            }
        }
    }
</script>