import { IDataObject } from "@/app/api/update-entry/[id]/route"

interface IUpdateOneEntryParams {
  id: string
  body: IDataObject
}

export const updateOneEntry = async ({ id, body }: IUpdateOneEntryParams) => {
  const res = await fetch(`/api/update-entry/${id}`, { method: 'PUT', body: JSON.stringify(body) })
  return await res.json()
}
