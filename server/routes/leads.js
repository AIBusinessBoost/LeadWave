import express from 'express';
import { searchLeads } from '../services/leadService.js';
import { exportLeads } from '../services/exportService.js';

const router = express.Router();

// Search for leads
router.post('/search', async (req, res) => {
  try {
    const { niche, location, country, maxResults } = req.body;
    
    if (!niche || !location) {
      return res.status(400).json({
        error: 'Niche and location are required'
      });
    }

    const results = await searchLeads({
      niche,
      location,
      country: country || 'US',
      maxResults: parseInt(maxResults) || 50
    });

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Failed to search for leads',
      message: error.message
    });
  }
});

// Export leads
router.post('/export', async (req, res) => {
  try {
    const { leads } = req.body;
    const format = req.query.format || 'csv';
    
    if (!leads || !Array.isArray(leads)) {
      return res.status(400).json({
        error: 'Leads data is required'
      });
    }

    const exportData = await exportLeads(leads, format);
    
    const contentType = format === 'csv' ? 'text/csv' : 'application/json';
    const filename = `leadwave-export.${format}`;
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(exportData);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      error: 'Failed to export leads',
      message: error.message
    });
  }
});

export default router;
