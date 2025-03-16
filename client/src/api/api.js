import axios from "axios";

export const uploadAndComparePDFs = async (baselineFile) => {
  const formData = new FormData();
  formData.append("file", baselineFile);

  try {
    const response = await axios.post(
      "https://tendorix-ai.onrender.com/evaluate_tender",
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
