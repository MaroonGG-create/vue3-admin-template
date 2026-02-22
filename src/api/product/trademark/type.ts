export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}

export type Records = Trademark[]

export interface TradeMarkResponseData extends ResponseData {
  data: {
    current: number
    records: Records
    pages: number
    searchCount: boolean
    size: number
    total: number
  }
}
