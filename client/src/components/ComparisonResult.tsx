import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ComparisonResultProps {
  isLoading: boolean;
  hasResults: boolean;
  matchPercentage: number;
  differences: {
    added: number;
    modified: number;
    removed: number;
  };
  criteriaMet: number;
  criteriaNotMet: number;
  matchedCriteria: string[]; // 🔄 Fixed prop name
  unmatchedCriteria: string[]; // 🔄 Fixed prop name
  recommendation: string;
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({
  isLoading,
  hasResults,
  matchPercentage = 0,
  differences = { added: 0, modified: 0, removed: 0 },
  criteriaMet = 0,
  criteriaNotMet = 0,
  matchedCriteria = [], // 🔄 Fixed prop name
  unmatchedCriteria = [], // 🔄 Fixed prop name
  recommendation = "",
}) => {
  if (isLoading) {
    return (
      <Card className="w-full border bg-white shadow-sm animate-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-center">
            Comparing Files...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={45} className="h-2 my-6" />
          <p className="text-center text-sm text-muted-foreground">
            This may take a moment
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!hasResults) {
    return null;
  }

  const getMatchStatus = () => {
    if (matchPercentage >= 95) {
      return {
        icon: <CheckCircle className="h-12 w-12 text-green-500" />,
        text: "Excellent Match",
        color: "text-green-500",
      };
    } else if (matchPercentage >= 75) {
      return {
        icon: <AlertCircle className="h-12 w-12 text-amber-500" />,
        text: "Good Match",
        color: "text-amber-500",
      };
    } else {
      return {
        icon: <XCircle className="h-12 w-12 text-red-500" />,
        text: "Poor Match",
        color: "text-red-500",
      };
    }
  };

  const status = getMatchStatus();

  return (
    <Card className="w-full border bg-white shadow-sm animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Comparison Results</CardTitle>
        <div className="flex items-center gap-2">
          {status.icon}
          <span className={`font-semibold ${status.color}`}>{status.text}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Match Percentage</span>
            <span className="text-sm font-medium">{matchPercentage}%</span>
          </div>
          <Progress value={matchPercentage} className="h-2" />
        </div>
        {/* Differences Overview
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold text-green-600">
              {differences.added}
            </span>
            <p className="text-sm text-gray-600 mt-1">Added</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold text-yellow-600">
              {differences.modified}
            </span>
            <p className="text-sm text-gray-600 mt-1">Modified</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold text-red-600">
              {differences.removed}
            </span>
            <p className="text-sm text-gray-600 mt-1">Removed</p>
          </div>
        </div> */}
        {/* Criteria Overview */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold text-blue-600">
              {criteriaMet}
            </span>
            <p className="text-sm text-gray-600 mt-1">Criteria Met</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold text-red-600">
              {criteriaNotMet}
            </span>
            <p className="text-sm text-gray-600 mt-1">Criteria Not Met</p>
          </div>
        </div>
        {/* Matched and Unmatched Criteria */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Matched Criteria</h3>
          <ul className="list-disc list-inside text-green-600">
            {matchedCriteria.length > 0 ? (
              matchedCriteria.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <p className="text-sm text-gray-500">No matched criteria</p>
            )}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Unmatched Criteria</h3>
          <ul className="list-disc list-inside text-red-600">
            {unmatchedCriteria.length > 0 ? (
              unmatchedCriteria.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No unmatched criteria</p>
            )}
          </ul>
        </div>
        {/* Recommendation Section */}
        {recommendation && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium text-gray-800">
              <strong>Recommendation:</strong> {recommendation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonResult;
