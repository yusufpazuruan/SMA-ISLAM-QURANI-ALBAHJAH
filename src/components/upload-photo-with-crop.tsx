import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ImageCropper } from "@/components/image-cropper";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

const accept = {
  "image/*": [],
};

export default function UploadPhotosWithCrop() {
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        alert("Selected image is too large!");
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  return (

        <div className="flex items-center justify-center">

          {selectedFile ? (
            <ImageCropper
              dialogOpen={isDialogOpen}
              setDialogOpen={setDialogOpen}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          ) : (
            <Avatar
              {...getRootProps()}
              className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
            >
              <input {...getInputProps()} />
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_LpRm4tYP6WUAec9I_hQ8sX8M86lkEqKqw&s" alt="Islamic Boy Avatar AI" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
  );
}
