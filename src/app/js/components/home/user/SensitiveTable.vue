<style lang="stylus" rel="stylesheet/scss">
    .sensitive-words-table {
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
        }

        td {
            background-color: #fff;
            border-bottom: 1px solid $border-color;
        }

        th, td {
            max-width: 162px;
            padding: 5px 10px;
            border-right: 1px solid $border-color;
            word-break: break-all;
            &:last-child {
                border-right: none;
            }
        }

        .sen-del {
            display: inline-block;
            margin-left: 20px;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 60%;
            background-image: url(../../../../assets/images/delete_normal.png);
            &:active {
                background-image: url(../../../../assets/images/delete_click.png);
            }
        }

    }
</style>
<template>
    <table class="sensitive-words-table">
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
                <a class="sen-del btn" role="button" @click.stop.prevent="delWord(entry['id'])"></a>
            </td>
        </tr>
        <tr>
            <td>—</td>
            <td>More sensitive words</td>
            <td><span>—</span><span></span></td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import {post} from '_api/callAPI'
    export default{
        name: 'SensitiveTable',

        props: {
            data: Array,
            columns: Array,
            datakeys: Array,
        },

        methods: {
            delWord: function (id) {
                var self = this
                post(this, '/console/api/sensitive/del', {id: id}, function (data, status) {
                    if (data.sta === 0) {
                        self.$dispatch('update-sensitive-list');
                    }
                });
            }
        }
    }
</script>