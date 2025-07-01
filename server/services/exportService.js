import createCsvWriter from 'csv-writer';
import { promises as fs } from 'fs';
import path from 'path';

export async function exportLeads(leads, format) {
  try {
    if (format === 'csv') {
      return await exportToCsv(leads);
    } else if (format === 'json') {
      return JSON.stringify(leads, null, 2);
    } else {
      throw new Error(`Unsupported export format: ${format}`);
    }
  } catch (error) {
    console.error('Export error:', error);
    throw new Error(`Failed to export leads: ${error.message}`);
  }
}

async function exportToCsv(leads) {
  const csvData = leads.map(lead => ({
    'Business Name': lead.businessName || '',
    'Owner Name': lead.ownerName || '',
    'Email': lead.email || '',
    'Phone': lead.phone || '',
    'Website': lead.website || '',
    'Address': lead.address || '',
    'Rating': lead.rating || '',
    'Review Count': lead.reviewCount || '',
    'In Google 3-Pack': lead.isInGooglePack ? 'Yes' : 'No',
    'Claimed': lead.isClaimed ? 'Yes' : 'No',
    'Description': lead.description || '',
    'Data Quality': lead.dataQuality || ''
  }));

  // Convert to CSV string manually
  const headers = Object.keys(csvData[0] || {});
  const csvRows = [
    headers.join(','),
    ...csvData.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Escape quotes and wrap in quotes if contains comma
        return value.toString().includes(',') ? `"${value.replace(/"/g, '""')}"` : value;
      }).join(',')
    )
  ];

  return csvRows.join('\n');
}
