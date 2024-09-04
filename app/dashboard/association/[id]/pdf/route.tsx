import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from '@react-pdf/renderer'
import { NextResponse } from 'next/server'
import { getAssociationDetails } from '../../actions'
import { getAssociationNameById } from '@/lib/association'

// Define the types for the data
type AssociationMember = {
  id: string
  created_at: string
  user_id: string
  firstname: string
  lastname: string
  gender: string
  municipality: string
  barangay: string
  phone: string
  association_id: string | null
  position: string | null // Allow position to be null
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4, // Reduced margin from 10 to 4
  },
  table: {
    display: 'flex',
    width: 'auto',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '16.66%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: '#d3d3d3',
    textAlign: 'center',
    padding: 4,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '16.66%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    padding: 4,
  },
  tableCell: {
    textAlign: 'center',
    fontWeight: 'normal',
  },
})

// Create Document Component
const MasterList: React.FC<{
  data: AssociationMember[] | null
  associationName: string | undefined
}> = ({ data, associationName }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.title}>{associationName} Masterlist</Text>

      {data && data.length > 0 ? (
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Name</Text>
            <Text style={styles.tableColHeader}>Gender</Text>
            <Text style={styles.tableColHeader}>Barangay</Text>
            <Text style={styles.tableColHeader}>Position</Text>
            <Text style={styles.tableColHeader}>Municipality</Text>
            <Text style={styles.tableColHeader}>Organization</Text>
          </View>

          {/* Table Rows */}
          {data.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCol}>
                {item.firstname} {item.lastname}
              </Text>
              <Text style={styles.tableCol}>{item.gender}</Text>
              <Text style={styles.tableCol}>{item.barangay}</Text>
              <Text style={styles.tableCol}>{item.position ?? ''}</Text>
              <Text style={styles.tableCol}>{item.municipality}</Text>
              <Text style={styles.tableCol}>{associationName}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </Page>
  </Document>
)

// Update the GET handler to allow null
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await getAssociationDetails(params.id)

    const association = await getAssociationNameById(params.id)

    const stream = await renderToStream(
      <MasterList data={data} associationName={association?.name} />,
    )

    return new NextResponse(stream as unknown as ReadableStream)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
