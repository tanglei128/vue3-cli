import request from '@/utils/request'
// 获取app
export function getUserInfo(params){
    return request({
        url: '/api/userinfo',
        method: 'GET',
        params,
    });
}


export function getUserInfoMethodPost(params){
    return request({
        url: '/api/userinfo',
        method: 'POST',
        params,
    });
}

export function getUserInfo4(data){
    return request({
        url: '/api/userinfo4',
        method: 'POST',
        data,
    });
}