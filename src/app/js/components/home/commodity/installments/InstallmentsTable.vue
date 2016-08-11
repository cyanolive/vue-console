<style lang="stylus" rel="stylesheet/scss">
    .installments {
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
            min-width: 60px;
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

        .install-winning, .install-all {
            color: #f44336;
            display: inline-block;
        }

        .install-winning {
            width: 90px;
        }

    }
</style>
<template>
    <table class="installments table-condensed">
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
            <td class="{{entry.id}}">
                <a class="install-winning" role="button" @click.prevent.stop="viewWinningOrder(entry['id'])">{{entry['winner']
                    == null ? '-' : 'Winning'}}</a>
                <a class="install-all" role="button" @click="viewAllOrder(entry['id'])">All</a>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'UiTable',

        props: {
            data: Array,
            columns: Array,
            datakeys: Array
        },

        methods: {
            viewWinningOrder: function (id) {
                router.go('/home/orders?issue=' + id + "&status=-2");
            },

            viewAllOrder: function (id) {
                router.go('/home/orders?issue=' + id);
            }

        }
    }
</script>