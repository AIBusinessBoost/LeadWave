import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ExportService {
  constructor() {
    this.exportsDir = path.join(__dirname, '../exports');
    this.ensureExportsDir();
  }

  async ensureExportsDir() {
    try {
      await fs.access(this.exportsDir);
    } catch {
      await fs.mkdir(this.exportsDir, { recursive: true });
    }
  }

  async exportLeads(leads, format = 'csv') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `leadwave-export-${timestamp}.${format}`;
    const filepath = path.join(this.exportsDir, filename);

    switch (format.toLowerCase()) {
      case 'csv':
        await this.exportToCSV(leads, filepath);
        break;
      case 'json':
        await this.exportToJSON(leads, filepath);
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    return {
      filename,
      url: `/api/exports/${filename}`,
      path: filepath
    };
  }

  async exportToCSV(leads, filepath) {
    const headers = [
      'Business Name',
      'Address',
      'Phone',
      'Website',
      'Email',
      'Owner',
      'Rating',
      'Reviews',
      'Lead Score',
      'In Google 3-Pack',
      'Google Claimed',
      'Business Status',
      'Types'
    ];

    const rows = leads.map(lead => [
      lead.name || '',
      lead.address || '',
      lead.phone || '',
      lead.website || '',
      (lead.emails || []).join('; '),
      lead.owner?.name || '',
      lead.rating || '',
      lead.totalReviews || '',
      lead.leadScore || '',
      lead.googlePackStatus?.inThreePack ? 'Yes' : 'No',
      lead.googlePackStatus?.claimed ? 'Yes' : 'No',
      lead.businessStatus || '',
      (lead.types || []).join('; ')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    await fs.writeFile(filepath, csvContent, 'utf8');
  }

  async exportToJSON(leads, filepath) {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalLeads: leads.length,
      leads: leads
    };

    await fs.writeFile(filepath, JSON.stringify(exportData, null, 2), 'utf8');
  }
}
