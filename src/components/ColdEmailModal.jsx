import React, { useState } from 'react';
import { X, Send, Copy, Mail, User, Building, Globe } from 'lucide-react';

export const ColdEmailModal = ({ lead, onClose }) => {
  const [emailContent, setEmailContent] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');

  const templates = {
    professional: {
      subject: `Partnership Opportunity with ${lead.name}`,
      content: `Hi there,

I hope this email finds you well. I came across ${lead.name} and was impressed by your work in ${lead.category}.

I'd love to discuss a potential partnership opportunity that could benefit both our businesses. Would you be open to a brief 15-minute call this week?

Looking forward to hearing from you.

Best regards,
[Your Name]`
    },
    casual: {
      subject: `Quick question about ${lead.name}`,
      content: `Hey there!

I noticed ${lead.name} and thought you might be interested in what we're doing. We help businesses like yours grow through [your service].

Would you be up for a quick chat? No pressure at all!

Cheers,
[Your Name]`
    },
    direct: {
      subject: `Grow ${lead.name} with our proven system`,
      content: `Hello,

I specialize in helping ${lead.category} businesses increase their revenue by 25-40% within 90 days.

${lead.name} has great potential, and I'd like to show you exactly how we can help you achieve similar results.

Are you available for a 10-minute call this week?

Best,
[Your Name]`
    }
  };

  React.useEffect(() => {
    const template = templates[selectedTemplate];
    setSubject(template.subject);
    setEmailContent(template.content);
  }, [selectedTemplate, lead]);

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoLink, '_blank');
    onClose();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Send Cold Email</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lead Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Building className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">{lead.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{lead.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{lead.website}</span>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="professional" className="text-gray-900 bg-white">Professional</option>
              <option value="casual" className="text-gray-900 bg-white">Casual</option>
              <option value="direct" className="text-gray-900 bg-white">Direct</option>
            </select>
          </div>

          {/* Subject Line */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject Line
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject line..."
              />
              <button
                onClick={() => copyToClipboard(subject)}
                className="px-3 py-2 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors"
                title="Copy subject"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Email Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Content
            </label>
            <div className="relative">
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter your email content..."
              />
              <button
                onClick={() => copyToClipboard(emailContent)}
                className="absolute top-2 right-2 px-2 py-1 bg-gray-600/20 text-gray-300 rounded hover:bg-gray-600/30 transition-colors"
                title="Copy content"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={handleSendEmail}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
