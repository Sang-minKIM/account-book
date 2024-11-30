export type PaymentType = 'income' | 'expense'

export type Category =
  | '식비'
  | '카페/간식'
  | '편의점/마트/잡화'
  | '술/유흥'
  | '쇼핑'
  | '취미/여가'
  | '의료/건강/피트니스'
  | '주거/통신'
  | '보험/세금/기타금융'
  | '미용'
  | '교통/자동차'
  | '여행/숙박'
  | '교육'
  | '생활'
  | '이체'
  | '급여'
  | '카드대금'
  | '저축/투자'
  | '후불결제대금'
  | '카테고리 없음'

export interface Payment {
  id: string
  type: PaymentType
  amount: number
  from?: string
  to?: string
  memo?: string
  category: Category
  date: string
}

export type SortOrder = 'asc' | 'desc'
