const express = require("express");
const multer = require("multer");
const { getDocument } = require("pdfjs-dist");
require("dotenv").config();
const OpenAI = require("openai");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Configure file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Azure OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT_NAME}`,
  defaultQuery: { "api-version": "2023-12-01-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
});

// Example company profile
const companyProfile = {
  name: "XYZ Corp",
  revenue: "Above $5 million",
  certifications: [
    "ISO 9001",
    "ISO 27001",
    "COPP (Certificate of Pharmaceutical Products)",
    "Non-conviction certificate",
    "DRUG LICENSE",
  ],
  experience: "10+ years in the industry",
  employees: "More than 50 employees",
};

// Function to extract text using pdfjs-dist
async function extractTextFromPDF(pdfBuffer) {
  try {
    const pdfData = new Uint8Array(pdfBuffer);
    const loadingTask = getDocument({
      data: pdfData,
      standardFontDataUrl:
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/standard_fonts/",
    });
    const pdf = await loadingTask.promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }

    if (!text.trim()) {
      throw new Error("No readable text found in the PDF.");
    }

    return text.trim();
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw new Error("Failed to process PDF");
  }
}

// API Endpoint to upload PDF and analyze eligibility
app.post("/evaluate_tender", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📄 Received PDF:", req.file.originalname);

    // Extract text from the PDF
    const extractedText = await extractTextFromPDF(req.file.buffer);

    // Construct prompt
    const prompt = `
    The following is a tender document:
  
    ${extractedText}
  
    The company profile is:
  
    Name: ${companyProfile.name}
    Revenue: ${companyProfile.revenue}
    Certifications: ${companyProfile.certifications.join(", ")}
    Experience: ${companyProfile.experience}
    Employees: ${companyProfile.employees}
  
    Compare the tender requirements with the company profile and determine:
        - Number of criteria the company meets
    - Number of criteria the company does not meet
    - A match percentage (how well the company matches the tender requirements, between 0-100%)
    - A list of matched criteria
    - A list of unmatched criteria
    - Key differences between the company profile and the tender requirements
    - Provide a short recommendation on whether the company should bid.

    **Return ONLY valid JSON output without markdown formatting. Do NOT include triple backticks or extra text.**
    
    JSON format:
    {
      "matchPercentage": <number>, 
      "criteriaMet": <number>,
      "criteriaNotMet": <number>,
      "matchedItems": ["<matched1>", "<matched2>", ...], 
      "unmatchedItems": ["<unmatched1>", "<unmatched2>", ...],
      "differences": ["<difference1>", "<difference2>", ...], 
      "recommendation": "<summary>"
    }

  `;

    console.log("📝 Sending request to OpenAI API...");

    // Call Azure OpenAI API
    const response = await openai.chat.completions.create({
      model: process.env.AZURE_DEPLOYMENT_NAME,
      messages: [{ role: "user", content: prompt }],
    });

    const llmResponse = response.choices[0]?.message?.content || "{}";
    // console.log("✅ OpenAI API Response:", llmResponse);

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(llmResponse);
    } catch (error) {
      console.error("❌ Failed to parse JSON:", error);
      return res.status(500).json({ error: "Invalid response format from AI" });
    }

    // Send structured response
    res.json({
      success: true,
      matchPercentage: parsedResponse.matchPercentage || 0,
      criteriaMet: parsedResponse.criteriaMet,
      criteriaNotMet: parsedResponse.criteriaNotMet,
      matchedItems: parsedResponse.matchedItems || [], // Default to empty array
      unmatchedItems: parsedResponse.unmatchedItems || [], // Default to empty array
      differences: parsedResponse.differences || [],
      recommendation: parsedResponse.recommendation,
    });
  } catch (error) {
    console.error("❌ Error processing request:", error.message);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
