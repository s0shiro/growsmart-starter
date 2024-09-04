import { getAllCropCategory } from '@/lib/crop'
import { useQuery } from '@tanstack/react-query'

export const useGetCropCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      try {
        const data = await getAllCropCategory()
        console.log('Fetched crop categories:', data)
        return data
      } catch (error) {
        console.error('Error fetching crop categories:', error)
        throw error
      }
    },
  })
}

export default useGetCropCategory
