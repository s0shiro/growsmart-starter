'use server'

import { createClient } from '@/utils/supabase/server'

export const recordInspection = async (data: {
  plantingID: string
  farmerID: string
  dateOfInspection: string
  damagedQuantity: number
  damagedReason: string
  findings?: string
}) => {
  const supabase = createClient()

  const inspectionData = {
    planting_id: data.plantingID,
    farmer_id: data.farmerID,
    date: data.dateOfInspection,
    findings: data.findings,
    damaged: data.damagedQuantity,
    damaged_reason: data.damagedReason,
  }

  const { error } = await supabase.from('inspections').insert([inspectionData])

  if (error) {
    console.error('Supabase error:', error.message)
  }
}

export const getInspectionsByPlantingID = async (plantingID: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('inspections')
    .select('*, planting_records(status)')
    .eq('planting_id', plantingID)

  console.log(data)

  if (error) {
    console.error('Supabase error:', error.message)
    return []
  }

  return data
}
