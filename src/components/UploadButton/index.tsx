import { Input } from "@chakra-ui/react";
import * as React from "react";

interface IUploadButtonProps {
  onUpload: (file: File) => void;
}

function UploadButton({ onUpload }: IUploadButtonProps) {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <label
      style={{
        fontWeight: 600,
        color: "white",
        padding: "8px 16px",
        backgroundColor: "#2E87FF",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Upload
      <Input type="file" display="none" onChange={handleUpload} />
    </label>
  );
}

export default UploadButton;
