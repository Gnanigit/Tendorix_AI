import axios from "axios";

export const uploadAndComparePDFs = async (baselineFile) => {
  const formData = new FormData();
  formData.append("file", baselineFile);

  try {
    const response = await axios.post(
      "http://localhost:5000/evaluate_tender",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Upload & Evaluation failed:", error);
    return { success: false, message: "Evaluation failed." };
  }
};
