//引入node中的path模块的resolve方法
const { resolve } = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./client/client.js',
    output:{
        filename:'main.js',
         //resolve方法用于拼接绝对路径，__dirname：当前文件所在目录的绝对路径
        path:resolve(__dirname,'dist')
    },
    module:{},
    plugins:[
        //plugins的配置
        //html-webpack-plugin
        //功能：创建一个空的index.html文件，该文件自动引入了打包后输出的所有资源(js/css)
        new HtmlWebpackPlugin({
            template: 'index.html',
        })
    ],
    mode:'development',

}