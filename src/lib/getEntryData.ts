import { IEntryData } from "@/common/interfaces"

interface IGetEntryDataParams {
  month: number
  day: number
}

export const getEntryData = async ({ month, day }: IGetEntryDataParams): Promise<IEntryData[]> => {
  const res = await fetch(`/api/get-entry/${month}/${day}`, { cache: 'no-store' })
  return await res.json()
}
