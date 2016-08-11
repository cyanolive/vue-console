<style lang="stylus" rel="stylesheet/scss">
    .user-table {
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

        .user-view {
            display: inline-block;
            margin-left: 20px;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 60%;
            background-image: url(../../../../assets/images/view_normal.png);
            &:active {
                background-image: url(../../../../assets/images/view_click.png);
            }
        }

    }
</style>
<template>
    <table class="user-table">
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
                {{entry[key] == undefined ? '--' : entry[key]}}
            </td>
            <td>
                <a class="user-view btn" role="button" @click="viewUserInfo(entry['uid'])">
                </a>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        name: 'UserTable',

        props: {
            data: Array,
            datakeys: Array,
            columns: Array
        },

        methods: {
            viewUserInfo: function (id) {
                router.go({path: './user/' + id})
            }
        }
    }
</script>