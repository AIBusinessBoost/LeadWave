import React from 'react';
import { Star, TrendingUp, Shield, Award, Target, Zap } from 'lucide-react';

export const LeadScoring = ({ lead }) => {
  // Calculate lead score based on multiple factors
  const calculateLeadScore = (lead) => {
    let score = 0;
    let factors = [];

    // Rating factor (0-25 points)
    const ratingScore = Math.round((lead.rating / 5) * 25);
    score += ratingScore;
    factors.push({ name: 'Rating', score: ratingScore, max: 25 });

    // Reviews factor (0-20 points)
    const reviewScore = Math.min(20, Math.round(lead.reviews / 10));
    score += reviewScore;
    factors.push({ name: 'Reviews', score: reviewScore, max: 20 });

    // Verification factor (0-15 points)
    const verificationScore = lead.verified ? 15 : 0;
    score += verificationScore;
    factors.push({ name: 'Verified', score: verificationScore, max: 15 });

    // Category priority (0-20 points)
    const highValueCategories = ['Technology Services', 'Healthcare', 'Professional Services'];
    const categoryScore = highValueCategories.includes(lead.category) ? 20 : 10;
    score += categoryScore;
    factors.push({ name: 'Category', score: categoryScore, max: 20 });

    // Contact completeness (0-20 points)
    let contactScore = 0;
    if (lead.email) contactScore += 7;
    if (lead.phone) contactScore += 7;
    if (lead.website) contactScore += 6;
    score += contactScore;
    factors.push({ name: 'Contact Info', score: contactScore, max: 20 });

    return { totalScore: score, maxScore: 100, factors };
  };

  const { totalScore, maxScore, factors } = calculateLeadScore(lead);
  const scorePercentage = (totalScore / maxScore) * 100;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    if (percentage >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreLabel = (percentage) => {
    if (percentage >= 80) return 'Hot Lead';
    if (percentage >= 60) return 'Warm Lead';
    if (percentage >= 40) return 'Cold Lead';
    return 'Low Priority';
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return <Zap className="w-4 h-4" />;
    if (percentage >= 60) return <Target className="w-4 h-4" />;
    if (percentage >= 40) return <TrendingUp className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  return (
    <div className="bg-white/5 rounded-lg p-3 mt-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={getScoreColor(scorePercentage)}>
            {getScoreIcon(scorePercentage)}
          </div>
          <span className={`text-sm font-medium ${getScoreColor(scorePercentage)}`}>
            {getScoreLabel(scorePercentage)}
          </span>
        </div>
        <div className={`text-sm font-bold ${getScoreColor(scorePercentage)}`}>
          {totalScore}/{maxScore}
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            scorePercentage >= 80 ? 'bg-green-400' :
            scorePercentage >= 60 ? 'bg-yellow-400' :
            scorePercentage >= 40 ? 'bg-orange-400' : 'bg-red-400'
          }`}
          style={{ width: `${scorePercentage}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
        {factors.map((factor, index) => (
          <div key={index} className="flex justify-between">
            <span>{factor.name}:</span>
            <span>{factor.score}/{factor.max}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
