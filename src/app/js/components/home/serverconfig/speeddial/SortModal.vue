<style lang="stylus" rel="stylesheet/scss">
    .speeddial-sort-modal {
        .modal-container {
            width: 448px;
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

        table {
            margin-left: 24px;
            margin-right: 24px;
            width: 90%;
            font-size: 14px;
        }

        tr {
            border-top: 1px solid rgba(0, 0, 0, .12);
            &:last-child {
                border-bottom: 1px solid rgba(0, 0, 0, .12);
            }
        }

        td {
            max-width: 144px;
            padding: 5px 10px;
            border-right: 1px solid rgba(0, 0, 0, .12);
            &:first-child {
                color: #007aff;
            }
            &:last-child {
                border-right: none;
                width: 100px;
            }
        }

        .speeddial-sort-up, .speeddial-sort-down {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 95%;
        }

        .speeddial-sort-up {
            margin-right: 20px;
            background-image: url(../../../../../assets/images/moveup_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/moveup_click.png);
            }
        }

        .speeddial-sort-down {
            background-image: url(../../../../../assets/images/movedown_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/movedown_click.png);
            }
        }

        .speeddial-confirm-btn {
            width: 400px;
            color: #fff;
            background-color: #f44336;
            margin-left: 24px;
            margin-bottom: 24px;
        }
    }
</style>
<template>
    <div v-show="showsortmodal" class="speeddial-sort-modal">
        <ui-modal :show.sync="showsortmodal">
            <h2 slot="header">Sequence
                <span class="closed" @click="showsortmodal=false"></span>
            </h2>
            <table id="speeddial-sort-table" slot="body">
                <tbody v-el:tbody>
                <tr v-for="key in speeddiallist" data-bid={{key.id}}>
                    <td>{{key.title}}</td>
                    <td>
                        <span class="speeddial-sort-up" @click="up($event)"></span>
                        <span class="speeddial-sort-down" @click="down($event)"></span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div slot="footer">
                <button type="button" class="speeddial-confirm-btn btn" @click="sort">CONFIRM</button>
            </div>
        </ui-modal>
    </div>
</template>
<script>
    import UiModal from '_ui-modules/modal.vue'
    import {post} from '_api/callAPI.js'
    export default{
        name: "SortModal",

        components: {
            UiModal
        },

        props: {
            showsortmodal: {
                type: Boolean,
                twoWay: true
            },
            speeddiallist: {
                type: Array
            }
        },

        methods: {
            up: function (e) {
                e = e || window.event;
                var target = e.target,
                        parent = target.parentNode.parentNode,
                        preSibling = parent.previousElementSibling || parent.previousSibling;
                if (preSibling) {
                    this.$els.tbody.insertBefore(parent, preSibling);
                }
            },

            down: function (e) {
                e = e || window.event;
                var target = e.target,
                        parent = target.parentNode.parentNode,
                        nextSibling = parent.nextElementSibling || parent.nextSibling;
                if (nextSibling) {
                    this.$els.tbody.insertBefore(nextSibling, parent);
                }
            },

            sort: function () {
                var trs = this.$els.tbody.getElementsByTagName('tr'),
                        trArr = Array.prototype.slice.call(trs, 0),
                        self = this;
                if (trArr.length > 0) {
                    var ids = trArr.map(function (item) {
                        return item.dataset.bid;
                    });

                    post(this, '/console/api/speeddial/sort', ids, function (data, status) {
                        if (data.sta === 0) {
                            console.log(data.tips);
                            self.showsortmodal = false;
                            self.$dispatch('update-speeddial-table');
                        } else {
                            alert('failed to sort the speeddial, ' + data.tips);
                        }
                    })
                }
            }
        }
    }
</script>