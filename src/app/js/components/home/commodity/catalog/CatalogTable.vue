<style lang="stylus" rel="stylesheet/scss">
    .catalog {
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
            min-width: 80px;
            max-width: 144px;
            padding: 5px 10px;
            border-right: 1px solid $border-color;
            &:last-child {
                border-right: none;
            }
        }

        td:nth-child(2) {
            color: #007aff;
            max-width: 300px;
        }

        th.active {
            color: #000;
        }

        th.active .arrow {
            opacity: 1;
        }

        .arrow {
            display: inline-block;
            vertical-align: middle;
            width: 0;
            height: 0;
            margin-left: 5px;
            opacity: 0.66;
        }

        .cata-setting, .cata-edit, .cata-view, .cata-sold-out, .cata-hit-shelves, .cata-reshelves {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 75%;
        }
        .cata-setting {
            background-image: url(../../../../../assets/images/settings_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/settings_click.png);
            }
        }
        .cata-edit {
            background-image: url(../../../../../assets/images/edit_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/edit_click.png);
            }
        }
        .cata-view {
            background-image: url(../../../../../assets/images/view_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/view_click.png);
            }
        }
        .cata-hit-shelves {
            background-image: url(../../../../../assets/images/shelve_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/shelve_click.png);
            }
        }
        .cata-sold-out {
            background-image: url(../../../../../assets/images/soldout_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/soldout_click.png);
            }
        }
        .cata-reshelves {
            background-image: url(../../../../../assets/images/reshelve_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/reshelve_click.png);
            }
        }
    }
</style>

<template>
    <table class="catalog">
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
                <select class="form-control" v-model="entry.privilege" :value="entry.privilege"
                        @change="setPrivilege($event, entry)">
                    <option v-for="option in privileges" :value="option">
                        {{option}}
                    </option>
                </select>
            </td>
            <td>
                <select class="form-control" :value="entry.robot_cur" @change="setRobot($event, entry.id)">
                    <option v-for="option in robotStatusList" :value="robotStatusList.indexOf(option)">
                        {{option}}
                    </option>
                </select>
            </td>
            <td>
                <select class="form-control" :value="entry.robot" @change="setNextRobot($event, entry.id)">
                    <option v-for="option in robotStatusList" :value="robotStatusList.indexOf(option)">
                        {{option}}
                    </option>
                </select>
            </td>
            <td data-pid="{{entry['id']}}">
                <a class="cata-setting" title="setting" role="button" @click.stop.prevent="showSetModal($event)"></a>
                <a class="cata-edit" title="edit" role="button" @click.stop.prevent="editProduct($event)"></a>
                <a class="cata-view" title="view" role="button" @click.stop.prevent="showInstallments($event)"></a>
                <a v-if="entry['status'] == 'Not on sales'" title="put on shelves" class="cata-hit-shelves"
                   role="button"
                   @click.stop.prevent="hitShelves(entry['id'])"></a>
                <a v-if="entry['status'] == 'On sales'" title="put off shelves" class="cata-sold-out" role="button"
                   @click.stop.prevent="soldOut($event)"></a>
                <a v-if="entry['status'] == 'unveiled'" title="reshelf" class="cata-reshelves" role="button"
                   @click.stop.prevent="hitShelves(entry['id'])"></a>
            </td>
        </tr>
        </tbody>
    </table>
    <catalog-modal :showModal.sync="showSetting" :proid="operatingId">
    </catalog-modal>
</template>

<script>
    import CatalogModal from './CatalogModal.vue'
    import {get, post} from '_api/callAPI.js'
    export default {

        name: 'UiTable',

        components: {
            CatalogModal
        },

        props: {
            data: Array,
            columns: Array,
            datakeys: Array
        },

        data () {
            return {
                showSetting: false,
                operatingId: '',
                robotStatus: {},
                privileges: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                robotStatusList: ['No bots', 'Bots,normal', 'Robot winning']
            }
        },

        methods: {
            showSetModal: function (e) {
                e = e || window.event;
                this.showSetting = e.target.className.indexOf('cata-setting') == -1 ? false : true;
                var proId = e.target.parentNode.dataset.pid;
                this.$set('operatingId', proId);

            },

            editProduct: function (e) {
                e = e || window.event;
                var proId = e.target.parentNode.dataset.pid;
                this.$set('operatingId', proId);
                router.go('/home/commodity/addProduct?pid=' + this.operatingId);
            },

            showInstallments: function (e) {
                e = e || window.event;
                var proId = e.target.parentNode.dataset.pid;
                this.$set('operatingId', proId);
                router.go('/home/commodity/installments?pid=' + this.operatingId);
            },

            soldOut: function (e) {
                e = e || window.event;
                var proId = e.target.parentNode.dataset.pid;
                var params = {pid: proId};
                if (confirm('Once confirmed the shelf, current activities immediately ended, periods unfinished orders will all return, please confirm whether the shelf?'))
                    post(this, '/console/api/product/del', params, function (data, status, request) {
                        if (data.sta === 0) {
                            console.log('Product off the shelf success');
                        }
                    });
            },

            hitShelves: function (id) {
                var params = {pid: id};
                get(this, '/console/api/product/on_sale', params, function (context, data) {
                    if (data.sta == 0) {
                        context.$dispatch('update-list-data');
                        console.log('Product was added to success');
                    } else if (data.sta == -1 || data.sta == -2) {
                        alert('failed to added the product,' + data.tips);
                    }
                });
            },

            setRobot: function (e, id) {
                if (confirm('Are you determined to do this?')) {
                    var target = e.target || window.event.target;
                    var value = target.value;
                    var params = {
                        status: value,
                        gid: parseInt(id),
                        timing: 'immediately'
                    }
                    get(this, '/console/api/robot/set', params, function (context, data) {
                        if (data.sta === 0) {
                            console.log('setting robot success~!');
                        } else {
                            alert('failed to set robot', 'tips: ' + 'data.tips');
                        }
                    });

                }
            },

            setNextRobot: function (e, id) {
                if (confirm('Are you determined to do this?')) {
                    var target = e.target || window.event.target;
                    var value = target.value;
                    var params = {
                        status: value,
                        gid: parseInt(id),
                        timing: 'next'
                    }
                    get(this, '/console/api/robot/set', params, function (context, data) {
                        if (data.sta === 0) {
                            console.log('setting robot success~!');
                        } else {
                            alert('failed to set robot', 'tips: ' + 'data.tips');
                        }
                    });

                }
            },

            setPrivilege: function (e, product) {
                if (confirm('Are you determined to set the goods id with ' + product.id
                                + " name with \"" + product.title + "\""
                                + " to privilege of " + product.privilege)) {
                    var params = {
                        gid: parseInt(product.id),
                        privilege: product.privilege
                    }
                    get(this, '/console/api/product/privilege/set', params, function (context, data) {
                        if (data.sta === 0) {
                            console.log('setting privilege success~!');
                        } else {
                            alert('failed to set privilege', 'tips: ' + 'data.tips');
                        }
                    })
                }
            }
        }

    }
</script>
