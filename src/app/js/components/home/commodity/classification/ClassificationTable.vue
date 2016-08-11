<style lang="stylus" rel="stylesheet/scss">
    .cats {
        $border-color = rgba(0, 0, 0, .24);

        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        border-radius: 3px;
        background-color: #fff;
        width: 100%;
        font-size: 14px;

        th {
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, 0.54);
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -user-select: none;
            height: 48px;
            word-break: break-all;
        }

        td {
            background-color: #fff;
            border-bottom: 1px solid $border-color;
        }

        th, td {
            min-width: 120px;
            max-width: 144px;
            padding: 5px 10px;
            border-right: 1px solid $border-color;
            &:last-child {
                border-right: none;
            }

            .cat-edit, .cat-del {
                display: inline-block;
                width: 22px;
                height: 20px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 60%;
            }

            .cat-edit {
                margin-right: 20px;
                background-image: url(../../../../../assets/images/edit_normal.png);
                &:active {
                    background-image: url(../../../../../assets/images/edit_click.png);
                }
            }

            .cat-del {
                background-image: url(../../../../../assets/images/delete_normal.png);
                &:active {
                    background-image: url(../../../../../assets/images/delete_click.png);
                }
            }
        }

    }
</style>
<template>
    <table class="cats">
        <thead>
        <tr>
            <th v-for="key in columns">
                {{key | capitalize}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in data">
            <td v-for="key in datakeys">
                {{entry[key] | capitalize}}
            </td>
            <td data-id="{{entry['cid']}}" data-name="{{entry['c_name']}}">
                <a class="cat-edit btn" role="button" @click.stop.prevent="editCat($event)"></a>
                <a class="cat-del btn" role="button" @click.stop.prevent="delCat($event)"></a>
            </td>
        </tr>
        <tr>
            <td>—</td>
            <td>More categories</td>
            <td><span>—</span><span></span></td>
        </tr>
        </tbody>
    </table>
    <edit-modal :showeditmodal.sync="showEditModal" :catname="editCatName" :catid="editCatId"></edit-modal>
</template>

<script>
    import EditModal from './EditModal.vue'
    import {post} from '_api/callAPI.js'
    export default {
        name: 'ClassificationTable',

        props: {
            data: Array,
            columns: Array,
            datakeys: Array
        },

        components: {
            EditModal
        },

        data (){
            return {
                showEditModal: false,
                editCatName: '',
                editCatId: ''
            }
        },

        ready (){

        },

        methods: {
            editCat: function (e) {
                this.showEditModal = true;
                e = e || window.event;
                var target = e.target,
                        cname = target.parentNode.dataset.name,
                        cid = target.parentNode.dataset.id;
                this.$set('editCatName', cname);
                this.$set('editCatId', cid);
            },

            delCat: function (e) {
                e = e || window.event;
                var target = e.target,
                        cid = target.parentNode.dataset.id,
                        self = this;
                if (confirm('Are you sure to delete?')) {
                    post(this, '/console/api/category/del', {'id': cid}, function (data, status, request) {
                        if (data.sta === 0) {
                            self.$parent.getAllCats();
                        }
                    });
                }
            }

        }
    }

</script>