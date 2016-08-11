<style lang="stylus" rel="stylesheet/scss">
    .speeddial-online-table {
        border: none;
        margin-top: 40px;
        font-size: 14px;
        color: rgba(0, 0, 0, .54);
        .off-shelf {
            display: inline-block;
            width: 22px;
            height: 20px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(../../../../../assets/images/soldout_normal.png);
            &:active {
                background-image: url(../../../../../assets/images/soldout_click.png);
            }
        }
        th {
            background-color: #f5f5f5;
            color: rgba(0, 0, 0, 0.54);
            border-left: 1px solid rgba(0, 0, 0, .24);
            border-top: 1px solid rgba(0, 0, 0, .24);
            text-align: center;
            &:first-child {
                border-left: none;
            }
        }
        td {
            vertical-align: middle;
            text-align: center;
            background-color: #fff;
            border-left: 1px solid rgba(0, 0, 0, .24);
            border-top: 1px solid rgba(0, 0, 0, .24);
            &:first-child {
                width: 120px;
                background-color: #f5f5f5;
                border-left: none;
            }

            .version {
                width: 100px;
                vertical-align: middle;
                text-align: center;
            }
        }
        tr:last-child {
            border-bottom: 1px solid rgba(0, 0, 0, .24);
        }
        .text {
            color: #007aff;
            text-align: left;
        }
        img {
            margin-top: 3px;
            margin-bottom: 3px;
        }
    }
</style>
<template>
    <table class="speeddial-online-table table">
        <tbody>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>ClickUrl</th>
            <th>Min_Appvc</th>
            <th>Max_Appvc</th>
            <th>Operation</th>
        </tr>
        <tr v-for="item in online">
            <td>{{$index+1}}</td>
            <td>
                <div class="text">{{item.title}}</div>
            </td>
            <td>
                <img :src="item.url"/>
            </td>
            <td>
                <div class="text">{{item.path}}</div>
            </td>
            <td>
                {{item.min_appvc}}
            </td>
            <td>
                {{item.max_appvc}}
            </td>
            <td>
                <a class="off-shelf" role="button" @click.stop.prevent="offShelf(item.id)"></a>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import {get} from "_api/callAPI.js"
    export default{
        name: "OnlineTable",

        props: {
            online: Array,
        },

        methods: {
            offShelf: function (id) {
                var params = {
                    id: id,
                    op: 'off'
                };
                get(this, '/console/api/speeddial/operation', params, function (context, data) {
                    if (data.sta === 0) {
                        console.log(data.tips);
                        context.$dispatch('update-speeddial-table');
                    } else {
                        alert('failed to off shelf, ' + data.tips);
                    }
                });
            }
        }


    }
</script>