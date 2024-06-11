import instance from '@/core/api'
import { ICategory } from './types'
import { IFCATEGORY_DETAIL } from '@/types/category'

export const getAllCategory = async (): Promise<ICategory[]> => {
    const { data } = await instance.get('/api/categories')
    return data.data
}

export const getCategory = async (_id: string): Promise<ICategory> => {
    const { data } = await instance.get(`/api/categories/${_id}`)
    return data.data
}
export const getCategoryDetails = async (id: String): Promise<IFCATEGORY_DETAIL[]> => {
    const { data } = await instance.get(`api/infoProduct?category=${id}`)
    return data.data
}
