<style lang="stylus" rel="stylesheet/scss">
    .push-release {
        .push-release-header {
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .push-release-btn {
            margin-left: 40px;
        }
        .push-add-btn, .push-delete-btn, .push-release-btn {
            color: #fff;
            background-color: #f44336;
            float: right;
            margin-top: 30px;
        }

        .push-table {
            width: 100%;
            border-top: 1px solid rgba(0, 0, 0, .24);
            border-bottom: 1px solid rgba(0, 0, 0, .24);
        }
        tr {
            border-bottom: 1px solid rgba(0, 0, 0, .24);
        }
        td {
            padding: 7px 10px;
        }
        td:first-child {
            width: 150px;
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, .54);
            font-size: 15px;
        }
        td:nth-child(2) {
            background-color: #fff;
            padding-left: 35px;
        }
    }
</style>
<template>
    <div class="push-release row">
        <div class="push-release-header col-lg-offset-2 col-lg-6">
            <button class="btn push-add-btn" type="button" @click="addPush">ADD</button>
        </div>
        <div class="push-release-table col-lg-offset-2 col-lg-6">
            <table class="push-table">
                <tr>
                    <td>User</td>
                    <td>{{releaseData.creator}}</td>
                </tr>
                <tr>
                    <td>Create Time</td>
                    <td>{{releaseData.time}}</td>
                </tr>
                <tr>
                    <td>Expiration Time</td>
                    <td>{{releaseData.expiration_time}}</td>
                </tr>
                <tr>
                    <td>Device</td>
                    <td>{{releaseData.deviceType.length > 1 ? releaseData.deviceType.join(' && ') :
                        releaseData.deviceType[0]}}
                    </td>
                </tr>
                <tr>
                    <td>Push Type</td>
                    <td>{{releaseData.type}}</td>
                </tr>
                <tr>
                    <td>ID/URL</td>
                    <td>{{releaseData.url}}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{{releaseData.title}}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{{releaseData.description}}</td>
                </tr>
                <tr>
                    <td>Icon</td>
                    <td>
                        <img :src="releaseData.iconUrl" width=80 height=80/>
                    </td>
                </tr>
            </table>
        </div>
        <div class="push-release-footer col-lg-offset-2 col-lg-6">
            <button class="btn push-release-btn" type="button" @click="release(releaseData.id, releaseData.locale)">
                RELEASE
            </button>
            <button class="btn push-delete-btn" type="button" @click="delete(releaseData.id)">DELETE</button>
        </div>
    </div>
    <new-modal :shownewmodal.sync="showNewModal"></new-modal>
</template>
<script>
    import NewModal from "./NewModal.vue"
    import {get, post} from "_api/callAPI.js"
    export default {
        name: "PreRelease",

        components: {
            NewModal
        },

        props: {
            appConfig: Object
        },

        data (){
            return {
                showNewModal: false,
                releaseData: {
                    deviceType: []
                }
            }
        },

        ready(){
            this.getReleaseData();
        },

        methods: {
            addPush: function () {
                this.showNewModal = true;
            },

            getReleaseData: function () {
                var params = {
                    count: 1,
                    status: "prereleased"
                };
                get(this, '/console/api/message/get', params, function (context, data) {
                    context.$set('releaseData', data[0]);
                });
            },

            release: function (id, locale) {
                var formData = new FormData();
                formData.append('push_type', 'push');
                formData.append('locale', locale);
                formData.append('id', id);
                post(this, '/console/api/message/push', formData, function (data, status) {
                    if (data.sta === 0) {
                        console.log('release success!');
                    }
                });
            },

            delete: function (id) {
                var self = this;
                get(this, '/console/api/message/del', {id: id}, function (context, data) {
                    if (data.sta === 0) {
                        console.log('delete success!');
                        self.$emit('update-prerelease-push');
                    } else {
                        alert('failed to delete!');
                    }
                })
            }
        },

        events: {
            'update-prerelease-push': function () {
                this.getReleaseData();
            }
        }
    }
</script>