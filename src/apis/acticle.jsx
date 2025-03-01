import { request } from "../utils"


// 获取频道下拉列表
export function getChannelsAPI() {
    return request(
        {
            url: '/channels',
            method: 'GET'
        }
    )
}

// 提交文章表单
export function createArticleAPI(data) {
    return request(
        {
            url: '/mp/articles?draft=false',
            method: 'POST',
            data
        }
    )
}

// 获取文章列表
export function getArticleListAPI(params) {
    return request(
        {
            url: '/mp/articles',
            method: 'GET',
            params
        }
    )
}

// 删除文章
export function deleteArticleListAPI(id) {
    return request(
        {
            url: `mp/articles/${id}`,
            method: 'DELETE',
        }
    )
}

// 获取文章
export function getArticleID(id) {
    return request(
        {
            url: `mp/articles/${id}`,
        }
    )
}
// 更新文章
export function updateArticleAPI(data) {
    return request(
        {
            url: `mp/articles/${data.id}}?draft=false`,
            method: 'PUT',
            data
        }
    )
}










