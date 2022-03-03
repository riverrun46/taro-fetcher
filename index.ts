import { Response } from 'cross-fetch'
import Taro from '@tarojs/taro'

interface TaroFetchOptions {
  method?: string
  body: any
  headers: any
}

async function taroFetch(uri: string, options: TaroFetchOptions): Promise<Response> {
  const { data, statusCode, errMsg, header } = await Taro.request({
    url: uri,
    data: options.body,
    header: options.headers,
    dataType: 'other',
    method: 'POST',
  })

  const response = new Response(data, {
    headers: header,
    status: statusCode,
    statusText: errMsg || '',
  })
  return response
}

export function createFetch() {
  return (uri, options) => taroFetch(uri, options)
}
