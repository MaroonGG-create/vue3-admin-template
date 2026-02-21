import request from '@/utils/http'

enum Api {
  TrademarkList = '/product/baseTrademark',
  TrademarkSave = '/product/baseTrademark/save',
  TrademarkUpdate = '/product/baseTrademark/update',
  TrademarkRemove = '/admin/product/baseTrademark/remove',
}

export function getTrademarkList(page: number, limit: number) {
  return request.get<any>(`${Api.TrademarkList}/${page}/${limit}`)
}
export function saveTrademark(data: any) {
  return request.post<any>(Api.TrademarkSave, data)
}

export function updateTrademark(data: any) {
  return request.post<any>(Api.TrademarkUpdate, data)
}

export function removeTrademark(id: number) {
  return request.get<any>(`${Api.TrademarkRemove}/${id}`)
}
