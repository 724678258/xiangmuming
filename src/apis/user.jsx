import { request } from "../utils"


// 登录请求
export function loginAPI(fromData) {
    return request(
        {
            url: '/authorizations',
            method: 'POST',
            data: fromData
        }
    )
}

// 获取用户信息
export function getProfileAPI() {
    return request(
        {
            url: '/user/profile',
            method: 'GET'
        }
    )
}


