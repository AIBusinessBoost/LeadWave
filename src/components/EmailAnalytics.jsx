import React from 'react';
import { BarChart3, TrendingUp, Mail, Users, Clock, Target } from 'lucide-react';

export const EmailAnalytics = () => {
  const analyticsData = {
    totalSent: 1247,
    openRate: 34.2,
    clickRate: 8.7,
    replyRate: 4.3,
    bounceRate: 2.1,
    avgResponseTime: '2.4 hours'
  };

  const recentCampaigns = [
    { name: 'Tech Startups Q4', sent: 156, opens: 67, clicks: 23, replies: 8 },
    { name: 'Healthcare Outreach', sent: 89, opens: 34, clicks: 12, replies: 5 },
    { name: 'Retail Partnership', sent: 203, opens: 78, clicks: 19, replies: 7 }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
        Email Analytics Dashboard
      </h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Mail className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{analyticsData.totalSent}</div>
          <div className="text-gray-300 text-xs">Total Sent</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{analyticsData.openRate}%</div>
          <div className="text-gray-300 text-xs">Open Rate</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Target className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{analyticsData.clickRate}%</div>
          <div className="text-gray-300 text-xs">Click Rate</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{analyticsData.replyRate}%</div>
          <div className="text-gray-300 text-xs">Reply Rate</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Mail className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{analyticsData.bounceRate}%</div>
          <div className="text-gray-300 text-xs">Bounce Rate</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{analyticsData.avgResponseTime}</div>
          <div className="text-gray-300 text-xs">Avg Response</div>
        </div>
      </div>
      
      {/* Recent Campaigns */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-md font-medium text-white mb-4">Recent Campaigns</h4>
        <div className="space-y-3">
          {recentCampaigns.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex-1">
                <div className="text-white font-medium">{campaign.name}</div>
                <div className="text-sm text-gray-300">
                  {campaign.sent} sent • {campaign.opens} opens • {campaign.clicks} clicks • {campaign.replies} replies
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-400">
                  {((campaign.opens / campaign.sent) * 100).toFixed(1)}% open rate
                </div>
                <div className="text-xs text-gray-400">
                  {((campaign.replies / campaign.sent) * 100).toFixed(1)}% reply rate
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
