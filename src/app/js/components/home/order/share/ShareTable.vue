<style lang="stylus" rel="stylesheet/scss">
    .share-table {
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
            max-width: 300px;
            padding: 5px 10px;
            border-right: 1px solid $border-color;
            &:last-child {
                border-right: none;
            }
        }

        td:nth-child(2) {
            color: #007aff;
        }

        .delete-share, .edit-share, .view-share {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 90%;
            margin-right: 10px;
            margin-left: 15px;
        }

        .delete-share {
            background-image: url(../../../../../assets/images/delete_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/delete_click.png);
            }
        }
        .edit-share {
            background-image: url(../../../../../assets/images/edit_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/edit_click.png);
            }
        }
        .view-share {
            background-image: url(../../../../../assets/images/view_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/view_click.png);
            }
        }
    }
</style>
<template>
    <table class="share-table table-condensed">
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
                {{entry[key]}}
            </td>
            <td>
                <a class="delete-share" role="button"
                   @click="deleteShare($event, entry)"></a>
                <a  v-if="entry['is_robot']" class="edit-share" role="button"
                   @click="editShare($event, entry['share_id'])"></a>
                <a  v-if="!entry['is_robot']" class="view-share" role="button"
                    @click="viewShare($event, entry['share_id'])"></a>
            </td>
        </tr>
        </tbody>
    </table>
    <share-edit-modal :showmodal.sync="showModal"></share-edit-modal>
</template>

<script>
    import ShareEditModal from './ShareOrderModal.vue'
    import {get, post} from '_api/callAPI.js'
    export default {
        name: 'shareTable',

        components: {
            ShareEditModal
        },

        props: {
            data: Array,
            columns: Array,
            datakeys: Array
        },

        data(){
            return {
                showModal: false
            }
        },

        methods: {
            viewOrderDetail: function (id) {
                router.go({path: './orders/' + id});
            },

            deleteShare: function (e, share) {
                if (confirm('Are you determined to delete the ShareID of ' + share.share_id
                                + " title with \"" + share.title+ "\""
                                + " goods name with \"" + share.name + "\"")) {
                    var params = {
                        id  : parseInt(share.share_id)
                    }
                    get(this, '/console/api/share/delete', params, function (context, data) {
                        if (data.sta === 0) {
                            console.log('delete share information success~!');
                        } else {
                            alert('failed to delete share information', 'tips: ' + 'data.tips');
                        }
                        context.$parent.search();
                    })
                }
            },

            editShare: function (e, id) {
                this.showModal = true;
                this.$broadcast('share-edit', id);
            },

            viewShare: function (e, id) {
                this.showModal = true;
                this.$broadcast('share-view', id);
            }
        }
    }


</script>