/**
 * 整个项目api的管理
 * 
 */ 
import axios from 'axios';
import request from "./request"
const apiClient = axios.create({
  baseURL: 'http://8.130.77.76:3000/api/login', // 设置后端API的基础URL
  // 其他axios配置，如拦截器等
});

export default {

  getTasks() {
    return apiClient.get('/Task');
  },
  // 获取borrowlist数据
  getborrowRecords() {
    return apiClient.get('/borrowRecords');
  },
  // 获取user数据
  getuser() {
    return apiClient.get('/users');
  },
  // home组件 左侧学生任务数据获取
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  //获取学生借阅情况
  getCountData() {
    return request({
      url: '',
      method: 'get',
      mock: true
    })
  },
 
  //图书管理
  getUserData(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
      // data:{total: 0,page: 1,}
    })
  },
  addUser(params) {
    return request({
      url: '/user/add',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
      // data:{total: 0,page: 1,}
    })
  },
  editUser(params) {
    return request({
      url: '/user/edit',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  deleteUser(params) {
    return request({
      url: '/user/delete',
      method: 'get',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  // 根据用户的用户名不同 返回不一样的菜单列表
  getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  }

}