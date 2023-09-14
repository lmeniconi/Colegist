export type KnexRawResponse = {
  fields: Field[]
  rows: Row[]
}

type Row = {
  [key: string]: any
}

type Field = {
  name: string
}
