# vueAdmin
a simple admin template based on [vuejs2](http://vuejs.org/) and [element](http://element.eleme.io/#/).

### Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

```

### Browser Support

Modern browsers and Internet Explorer 10+.

### snapshots
![image](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/login.png)
![image](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/main.png)
![image](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/edit.jpg)

### wechat group（加不进时请扫我）
![image](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/code.jpg)
![image](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/mywechatid.jpg)

### License
[MIT](http://opensource.org/licenses/MIT)

<template>
    <div>
        <el-upload class="upload-demo" drag action="http://zqres.oss-cn-hangzhou.aliyuncs.com" :accept="acceptType" multiple :data="configure" :before-upload="beforeupload" :on-success="handleAvatarSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script src="./vm.js"></script>


import util from 'utils';
import $http from 'http';
import md5 from 'js-md5';
import config from '../../../common/js/uploadconfig';
export default {
    data() {
        return {
            acceptType: "image/*",
            configure: config,
            keyList: [],
            UrlList:[]
        }
    },
    methods: {
        handleAvatarSuccess(res, file, fileList) {
            this.UrlList=[];
            this.keyList.forEach(item => {
                this.UrlList.push('http://resimg.iqeq01.com/' + item)
            })
            console.log(file)
        },
        beforeupload(file) {
            this.configure.key = util.createKey(file);
            this.keyList.push(this.configure.key);
            //console.log('http://resimg.iqeq01.com/' + this.configure.key)
        },
    },
    mounted() {

    }
}
