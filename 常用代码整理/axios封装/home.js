import { request } from './request'
export function getHomeData() {
	return request({
		url: '/home/multidata'
	})
}

export function getIconData() {
	return request({
		url: '/icon/data',
		params: {
			type,
			page
		}
	})
}