import React, { useState } from 'react';
import { ChevronDown, Zap, Target, TrendingUp, Users, Building, Star } from 'lucide-react';

export const EmailTemplateSelector = ({ lead, onTemplateChange }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  const emailTemplates = {
    default: {
      name: 'Revenue Growth Focus',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'bg-blue-500',
      description: 'Focus on increasing revenue and growth opportunities'
    },
    pain_point: {
      name: 'Pain Point Solution',
      icon: <Target className="w-4 h-4" />,
      color: 'bg-red-500',
      description: 'Address specific business challenges and solutions'
    },
    social_proof: {
      name: 'Social Proof Heavy',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-green-500',
      description: 'Emphasize testimonials and success stories'
    },
    curiosity: {
      name: 'Curiosity Hook',
      icon: <Zap className="w-4 h-4" />,
      color: 'bg-purple-500',
      description: 'Create intrigue and curiosity to drive responses'
    },
    competitor: {
      name: 'Competitor Advantage',
      icon: <Building className="w-4 h-4" />,
      color: 'bg-orange-500',
      description: 'Highlight competitive advantages and market position'
    },
    review_based: {
      name: 'Review Compliment',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-yellow-500',
      description: 'Start with genuine compliments about their reviews'
    }
  };

  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    setShowTemplateDropdown(false);
    onTemplateChange(templateKey);
  };

  const currentTemplate = emailTemplates[selectedTemplate];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-yellow-500" />
        Email Template Style
      </h3>
      <div className="relative">
        <button
          onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
          className={`w-full flex items-center justify-between p-4 ${currentTemplate.color} hover:opacity-90 text-white rounded-lg transition-colors shadow-lg`}
        >
          <div className="flex items-center space-x-3">
            {currentTemplate.icon}
            <div className="text-left">
              <div className="font-medium">{currentTemplate.name}</div>
              <div className="text-sm opacity-90">{currentTemplate.description}</div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showTemplateDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
            {Object.entries(emailTemplates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => handleTemplateChange(key)}
                className={`w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors ${
                  key === selectedTemplate ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                } ${key === Object.keys(emailTemplates)[0] ? 'rounded-t-lg' : ''} ${
                  key === Object.keys(emailTemplates)[Object.keys(emailTemplates).length - 1] ? 'rounded-b-lg' : ''
                }`}
              >
                <div className={`p-2 ${template.color} text-white rounded`}>
                  {template.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-800">{template.name}</div>
                  <div className="text-sm text-gray-600">{template.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
