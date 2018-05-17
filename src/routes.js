//登录退出
import Login from './pages/Login.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // {
    //     path: "/",
    //     component: Home,
    //     hidden: true,
    //     children: [{
    //         path: "/changePassword",
    //         component: changePassword,
    //         name: "修改密码",
    //     }]
    // },

];
export default routes;