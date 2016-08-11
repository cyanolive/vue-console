<style lang="stylus" rel="stylesheet/scss">
    .cat-sort-modal {
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

        table {
            margin-left: 24px;
            margin-right: 24px;
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
            &:nth-child(2) {
                width: 144px;
                color: #007aff;
            }
            &:last-child {
                border-right: none;
                width: 100px;
            }
        }

        .cat-sort-up, .cat-sort-down {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 95%;
        }

        .cat-sort-up {
            margin-right: 20px;
            background-image: url(../../../../../assets/images/moveup_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/moveup_click.png);
            }
        }

        .cat-sort-down {
            background-image: url(../../../../../assets/images/movedown_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/movedown_click.png);
            }
        }

        .cat-confirm-btn {
            width: 85%;
            color: #fff;
            background-color: #f44336;
            margin-left: 24px;
            margin-bottom: 24px;
        }
    }
</style>
<template>
    <div v-show="showsortmodal" class="cat-sort-modal">
        <ui-modal :show.sync="showsortmodal">
            <h2 slot="header">Sequence
                <span class="closed" @click="showsortmodal=false"></span>
            </h2>
            <table id="cat-sort-table" slot="body">
                <tbody v-el:tbody>
                <tr v-for="key in sortdata">
                    <td class="cat-id">{{key.cid}}</td>
                    <td>{{key.c_name}}</td>
                    <td>
                        <span class="cat-sort-up" @click="up($event)"></span>
                        <span class="cat-sort-down" @click="down($event)"></span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div slot="footer">
                <button type="button" class="cat-confirm-btn btn" @click="sort">CONFIRM</button>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import UiModal from '_ui-modules/modal.vue'
    import {post} from '_api/callAPI.js'
    export default {
        components: {
            UiModal
        },

        props: {
            showsortmodal: Boolean,
            sortdata: Array
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
                var cidNodes = this.$els.tbody.querySelectorAll('.cat-id'),
                        cidArr = Array.prototype.slice.call(cidNodes, 0),
                        cidOrder = [],
                        self = this;
                cidArr.forEach(function (item) {
                    cidOrder.push(item.innerHTML);
                });
                post(this, '/console/api/category/sort', cidOrder, function (data, status, request) {
                    if (data.sta === 0) {
                        self.showsortmodal = false;
                    }
                });
            }
        }
    }
</script>