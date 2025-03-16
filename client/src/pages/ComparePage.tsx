import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import FileUpload from "@/components/FileUpload";
import ComparisonResult from "@/components/ComparisonResult";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { uploadAndComparePDFs } from "../api/api.js";

const ComparePage = () => {
  const [baselineFile, setBaselineFile] = useState<File | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState({
    hasResults: false,
    matchPercentage: 0,
    differences: { added: 0, modified: 0, removed: 0 },
    criteriaMet: 0,
    criteriaNotMet: 0,
    recommendation: "",
    matchedCriteria: [], // 🆕 Added array for matched criteria
    unmatchedCriteria: [], // 🆕 Added array for unmatched criteria
  });

  const [responseText, SetResponseText] = useState("");

  const handleCompare = async () => {
    if (!baselineFile) {
      toast({
        title: "Missing file",
        description: "Please select a baseline file",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);

    try {
      const result = await uploadAndComparePDFs(baselineFile);

      if (!result.success) {
        throw new Error("Failed to compare files.");
      }

      setComparisonResults({
        hasResults: true,
        matchPercentage: result.matchPercentage,
        differences: result.differences,
        criteriaMet: result.criteriaMet,
        criteriaNotMet: result.criteriaNotMet,
        recommendation: result.recommendation,
        matchedCriteria: result.matchedItems || [],
        unmatchedCriteria: result.unmatchedItems || [],
      });

      toast({
        title: "Comparison complete",
        description: `Match percentage: ${result.matchPercentage}%`,
      });
    } catch (error) {
      console.error("Comparison Error:", error);
      toast({
        title: "Comparison Failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setBaselineFile(null);
    setComparisonResults({
      hasResults: false,
      matchPercentage: 0,
      differences: { added: 0, modified: 0, removed: 0 },
      criteriaMet: 0,
      criteriaNotMet: 0,
      recommendation: "",
      matchedCriteria: [],
      unmatchedCriteria: [],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Tender Evolution
          </h1>
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Baseline File</h2>
            <FileUpload
              onFileSelect={setBaselineFile}
              label="Upload Baseline File"
            />
          </div>
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={handleCompare}
              disabled={!baselineFile || isComparing}
              className="gradient-purple"
              size="lg"
            >
              {isComparing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Comparing...
                </>
              ) : (
                <>
                  Evolute Tender
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            {baselineFile && (
              <Button onClick={handleReset} variant="outline" size="lg">
                Reset
              </Button>
            )}
          </div>
          <ComparisonResult
            isLoading={isComparing}
            hasResults={comparisonResults.hasResults}
            matchPercentage={comparisonResults.matchPercentage}
            differences={comparisonResults.differences}
            criteriaMet={comparisonResults.criteriaMet}
            criteriaNotMet={comparisonResults.criteriaNotMet}
            recommendation={comparisonResults.recommendation}
            matchedCriteria={comparisonResults.matchedCriteria}
            unmatchedCriteria={comparisonResults.unmatchedCriteria}
          />

          {/* 🆕 Section to Display Response Text */}
          {responseText && (
            <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Response Details</h2>
              <pre className="whitespace-pre-wrap text-gray-800 bg-gray-100 p-4 rounded-md">
                {JSON.stringify(responseText, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
      <footer className="py-8 px-6 bg-gray-800 text-white text-center">
        &copy; {new Date().getFullYear()} Tender Evolution. All rights reserved.
      </footer>
    </div>
  );
};

export default ComparePage;
