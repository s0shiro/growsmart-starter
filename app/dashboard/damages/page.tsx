import React from 'react'
import { getPlantingRecordsByCurrentUser } from '@/lib/planting'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { formatDate } from '@/lib/utils'

// Define an interface for the planting record
interface PlantingRecord {
  id: string
  created_at: string
  farmer_id: string
  crop_type: string
  variety: string
  planting_date: string
  field_location: string
  area_planted: number
  quantity: number
  weather_condition: string
  expenses: number
  harvest_date: string
  technician_id: string
}

const Page: React.FC = async () => {
  const allPlantingRecords: PlantingRecord[] | undefined =
    await getPlantingRecordsByCurrentUser()

  // Check if allPlantingRecords is undefined
  if (!allPlantingRecords) {
    return <div>Loading...</div> // or any other fallback UI
  }

  return (
    <div>
      <h2 className='text-2xl font-bold'>Planting Records</h2>
      {allPlantingRecords.map((record: PlantingRecord) => (
        <div key={record.id} className='mb-4 p-4 border border-gray-300'>
          <h3 className='text-lg font-semibold'>
            {record.crop_type} - {record.variety}
          </h3>
          <p>
            <strong>Planting Date: </strong>
            {formatDate(record.planting_date)}
          </p>
          <p>
            <strong>Field Location:</strong> {record.field_location}
          </p>
          <p>
            <strong>Area Planted:</strong> {record.area_planted} sqm
          </p>
          <p>
            <strong>Quantity:</strong> {record.quantity}
          </p>
          <p>
            <strong>Weather Condition:</strong> {record.weather_condition}
          </p>
          <p>
            <strong>Expenses:</strong> ${record.expenses}
          </p>
          <p>
            <strong>Harvest Date:</strong> {formatDate(record.harvest_date)}
          </p>

          <Button asChild variant={`link`}>
            <Link href={`/dashboard/farmers/${record.farmer_id}`}>
              View Farmer
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Page
