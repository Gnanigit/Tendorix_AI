import React, { useState } from "react";
import { Upload, File, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  label: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  label,
  accept = ".pdf",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "pdf") {
      setFileName(file.name);
      onFileSelect(file);
      toast({
        title: "File selected",
        description: `${file.name} has been selected`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`w-full p-6 border-2 border-dashed rounded-xl transition-all duration-300 ${
        isDragging
          ? "border-brand-purple bg-brand-purple/5"
          : "border-gray-300 bg-white"
      } ${fileName ? "bg-brand-light" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {fileName ? (
          <div className="flex items-center gap-3 text-gray-700 animate-fade-in">
            <File className="h-8 w-8 text-brand-purple" />
            <div className="flex flex-col">
              <span className="font-medium">{fileName}</span>
              <span className="text-sm text-gray-500">Ready to upload</span>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-brand-purple" />
            <div className="text-center">
              <h3 className="text-lg font-medium">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop a PDF file here, or click to select.
              </p>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          variant={fileName ? "outline" : "default"}
          className={fileName ? "mt-2" : "mt-4 gradient-purple"}
        >
          {fileName ? "Change file" : "Select PDF"}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
