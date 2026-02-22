import request from '@/utils/http'
import type { TradeMarkResponseData, Trademark, ResponseData } from './type'
enum Api {
  TrademarkList = '/product/baseTrademark',
  TrademarkSave = '/product/baseTrademark/save',
  TrademarkUpdate = '/product/baseTrademark/update',
  TrademarkRemove = '/product/baseTrademark/remove',
}

export function getTrademarkList(page: number, limit: number) {
  return request.get<any, TradeMarkResponseData>(
    `${Api.TrademarkList}/${page}/${limit}`,
  )
}
export function saveTrademark(data: Trademark) {
  return request.post<any, ResponseData>(Api.TrademarkSave, data)
}

export function updateTrademark(data: Trademark) {
  return request.post<any, ResponseData>(Api.TrademarkUpdate, data)
}

export function removeTrademark(id: number) {
  return request.get<any, ResponseData>(`${Api.TrademarkRemove}/${id}`)
}
