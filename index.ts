import { Response } from 'cross-fetch'
import Taro from '@tarojs/taro'

interface TaroFetchOptions {
  method?: string
  body: any
  headers: any
}

function taroFetch(uri: string, options: TaroFetchOptions): Promise<Response> {
  return new Promise((resolve) => {
    const { body: data, headers: header } = options
    Taro.request({
      url: uri,
      data,
      header,
      dataType: 'other',
      method: 'POST',
      success(res) {
        const response = new Response(res.data)
        resolve(response)
      },
    })
  })
}

export function createFetch() {
  return (uri, options) => taroFetch(uri, options)
}
