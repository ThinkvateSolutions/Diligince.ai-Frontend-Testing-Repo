<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9b0ce35 (Initial commit)
// import React, { useRef, useState } from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   File,
//   Upload,
//   FileText,
//   Image as ImageIcon,
//   Eye,
//   Trash,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";

// interface DocumentsStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// // --- Configuration Constants ---
// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
// const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
// const ALLOWED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

// const DocumentsStep: React.FC<DocumentsStepProps> = ({
//   onNext,
//   onPrevious,
// }) => {
//   const { formData, updateFormData, saveAsDraft } = useRequirement();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [newDocumentType, setNewDocumentType] = useState<
//     "drawing" | "reference" | "compliance" | "other"
//   >();
//   const [otherDocumentType, setOtherDocumentType] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const handleNext = () => {
//     onNext();
//   };

//   const handleSaveAsDraft = async () => {
//     if (!formData.title || formData.title.trim() === "") {
//       toast.error("A title is required to save a draft.");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       await saveAsDraft();
//       toast.success("Draft saved successfully!");
//     } catch (error) {
//       console.error("Error saving draft:", error);
//       toast.error("Failed to save draft. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!newDocumentType) return;

//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (!newDocumentType) {
//       toast.error("Please select a document type before uploading.");
//       return;
//     }

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleFiles = (files: FileList) => {
//     if (!newDocumentType) {
//       toast.error("Please select a document type first.");
//       return;
//     }

//     if (newDocumentType === "other" && otherDocumentType.trim() === "") {
//       toast.error("Please specify the document type for 'Other'.");
//       return;
//     }

//     const validFiles: File[] = [];
//     const invalidFiles: { name: string; reason: string }[] = [];

//     Array.from(files).forEach((file) => {
//       if (!ALLOWED_MIME_TYPES.includes(file.type)) {
//         invalidFiles.push({
//           name: file.name,
//           reason: "Unsupported file type.",
//         });
//       } else if (file.size > MAX_FILE_SIZE_BYTES) {
//         invalidFiles.push({
//           name: file.name,
//           reason: `File size exceeds ${MAX_FILE_SIZE_MB}MB.`,
//         });
//       } else {
//         validFiles.push(file);
//       }
//     });

//     invalidFiles.forEach((file) =>
//       toast.error(`'${file.name}': ${file.reason}`)
//     );

//     if (validFiles.length === 0) {
//       return;
//     }

//     const newFileObjects = validFiles.map((file) => {
//       const url = URL.createObjectURL(file);
//       const finalDocumentType =
//         newDocumentType === "other" ? otherDocumentType : newDocumentType;
//       return {
//         id: Math.random().toString(36).substring(2, 9),
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         url,
//         documentType: finalDocumentType,
//         version: 1,
//         uploadedAt: new Date(),
//         uploadedBy: "Current User",
//       };
//     });

//     updateFormData({
//       documents: [...(formData.documents || []), ...newFileObjects],
//     });

//     toast.success(
//       `${newFileObjects.length} document${
//         newFileObjects.length === 1 ? "" : "s"
//       } uploaded successfully.`
//     );
//   };

//   const handleDeleteDocument = (id: string) => {
//     const docToDelete = (formData.documents || []).find(
//       (doc) => doc.id === id
//     );
//     if (docToDelete && docToDelete.url.startsWith("blob:")) {
//       URL.revokeObjectURL(docToDelete.url);
//     }

//     updateFormData({
//       documents: (formData.documents || []).filter((doc) => doc.id !== id),
//     });
//     toast.success("Document removed");
//   };

//   const getFileIcon = (type: string) => {
//     if (type.startsWith("image/")) {
//       return <ImageIcon className="h-6 w-6 text-blue-500" />;
//     } else if (type === "application/pdf") {
//       return <FileText className="h-6 w-6 text-red-500" />;
//     } else {
//       return <File className="h-6 w-6 text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Document Upload
//             </h2>
//           </div>
//           <Badge
//             variant="outline"
//             className="bg-blue-50 text-blue-700 border-blue-200"
//           >
//             Step 3 of 6
//           </Badge>
//         </div>
//         <p className="text-gray-600">
//           First, select a type for the document(s) you are about to upload.
//         </p>

//         <div className="space-y-3">
//           <Select
//             value={newDocumentType}
//             onValueChange={(
//               value: "drawing" | "reference" | "compliance" | "other"
//             ) => {
//               setNewDocumentType(value);
//               if (value !== "other") {
//                 setOtherDocumentType("");
//               }
//             }}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select a Document Type..." />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="drawing">Drawing</SelectItem>
//               <SelectItem value="reference">Reference</SelectItem>
//               <SelectItem value="compliance">Compliance</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>

//           {newDocumentType === "other" && (
//             <Input
//               type="text"
//               placeholder="Please specify type (e.g., Specification Sheet)"
//               value={otherDocumentType}
//               onChange={(e) => setOtherDocumentType(e.target.value)}
//               className="mt-2"
//             />
//           )}
//         </div>
//       </div>

//       {/* File Upload */}
//       <div className="space-y-6">
//         <div>
//           <div
//             className={`flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
//               dragActive && newDocumentType
//                 ? "border-blue-400 bg-blue-50"
//                 : "border-gray-300"
//             } ${
//               !newDocumentType
//                 ? "cursor-not-allowed bg-gray-100"
//                 : "cursor-pointer hover:bg-gray-50"
//             }`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//             onClick={() =>
//               !newDocumentType
//                 ? toast.error("Please select a document type first.")
//                 : fileInputRef.current?.click()
//             }
//           >
//             <Upload className="mb-2 h-6 w-6 text-blue-500" />
//             <p className="mb-1 text-sm font-medium text-gray-900">
//               {newDocumentType
//                 ? "Click to upload or drag and drop"
//                 : "Select a document type to enable upload"}
//             </p>
//             <p className="text-xs text-gray-500">
//               PDF, JPG, PNG (max {MAX_FILE_SIZE_MB}MB)
//             </p>
//             <input
//               ref={fileInputRef}
//               type="file"
//               className="hidden"
//               multiple
//               onChange={handleChange}
//               accept={ALLOWED_FILE_EXTENSIONS}
//               disabled={!newDocumentType}
//             />
//           </div>
//         </div>

//         {/* Uploaded Documents */}
//         {formData.documents && formData.documents.length > 0 && (
//           <div className="space-y-3">
//             <h3 className="font-medium text-gray-900">Uploaded Documents</h3>
//             <div className="divide-y rounded-md border">
//               {formData.documents.map((doc) => (
//                 <div
//                   key={doc.id}
//                   className="flex items-center justify-between p-4"
//                 >
//                   <div className="flex items-center space-x-3">
//                     {getFileIcon(doc.type)}
//                     <div>
//                       <p className="font-medium text-gray-900">{doc.name}</p>
//                       <div className="flex items-center space-x-2 text-xs text-gray-500">
//                         <span>{formatFileSize(doc.size)}</span>
//                         <span>•</span>
//                         <span className="capitalize">{doc.documentType}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <a
//                       href={doc.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="rounded-md p-1 text-gray-500"
//                     >
//                       <Eye className="h-4 w-4 text-blue-500" />
//                     </a>
//                     <button
//                       onClick={() => handleDeleteDocument(doc.id)}
//                       className="rounded-md p-1 text-gray-500"
//                     >
//                       <Trash className="h-4 w-4 text-red-500" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between items-center w-full pt-6">
//         <Button variant="outline" onClick={onPrevious}>
//           Previous
//         </Button>
//         <div className="flex items-center gap-x-3">
//           <Button
//             variant="outline"
//             className="font-medium"
//             onClick={handleSaveAsDraft}
//             disabled={!formData.title || isSaving}
//           >
//             {isSaving ? "Saving..." : "Save as Draft"}
//           </Button>
//           <Button
//             onClick={handleNext}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
//           >
//             Continue to Workflow
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentsStep;
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

import React, { useRef, useState } from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Label } from "@/components/ui/label";
>>>>>>> 9b0ce35 (Initial commit)
import { Input } from "@/components/ui/input";
import {
  File,
  Upload,
  FileText,
  Image as ImageIcon,
  Eye,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
<<<<<<< HEAD
import {
=======
import { 
=======
import { Input } from "@/components/ui/input";
import {
  File,
  Upload,
  FileText,
  Image as ImageIcon,
  Eye,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
=======
<<<<<<< HEAD
=======
import { Badge } from "@/components/ui/badge";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

interface DocumentsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

<<<<<<< HEAD
// --- Configuration Constants ---
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ALLOWED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

const DocumentsStep: React.FC<DocumentsStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { 
    formData, 
    updateFormData, 
    saveAsDraft, 
    isWorkflowLocked 
  } = useRequirement();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
=======
<<<<<<< HEAD
const DocumentsStep: React.FC<DocumentsStepProps> = ({ onNext, onPrevious }) => {
  const { formData, updateFormData } = useRequirement();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [newDocumentType, setNewDocumentType] = useState<"specification" | "drawing" | "reference" | "compliance" | "other">("specification");
=======
// --- Configuration Constants ---
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ALLOWED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

const DocumentsStep: React.FC<DocumentsStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { 
    formData, 
    updateFormData, 
    saveAsDraft, 
    isWorkflowLocked 
  } = useRequirement();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
>>>>>>> 9b0ce35 (Initial commit)
  const [newDocumentType, setNewDocumentType] = useState<
    "drawing" | "reference" | "compliance" | "other"
  >();
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [isSaving, setIsSaving] = useState(false);
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

  const handleNext = () => {
    onNext();
  };

<<<<<<< HEAD
  const handleSaveAsDraft = async () => {
    if (!formData.title || formData.title.trim() === "") {
      toast.error("A title is required to save a draft.");
      return;
    }

    setIsSaving(true);
    try {
      await saveAsDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWorkflowLocked || !newDocumentType) return;

=======
<<<<<<< HEAD
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
=======
  const handleSaveAsDraft = async () => {
    if (!formData.title || formData.title.trim() === "") {
      toast.error("A title is required to save a draft.");
      return;
    }

    setIsSaving(true);
    try {
      await saveAsDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWorkflowLocked || !newDocumentType) return;

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
<<<<<<< HEAD
=======
<<<<<<< HEAD
    
=======
>>>>>>> 9b0ce35 (Initial commit)

    if (isWorkflowLocked) {
      toast.error("Cannot upload documents after workflow is confirmed.");
      return;
    }

    if (!newDocumentType) {
      toast.error("Please select a document type before uploading.");
      return;
    }

<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
<<<<<<< HEAD
    if (!newDocumentType) {
      toast.error("Please select a document type first.");
      return;
    }

    if (newDocumentType === "other" && otherDocumentType.trim() === "") {
      toast.error("Please specify the document type for 'Other'.");
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: { name: string; reason: string }[] = [];

    Array.from(files).forEach((file) => {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        invalidFiles.push({
          name: file.name,
          reason: "Unsupported file type.",
        });
      } else if (file.size > MAX_FILE_SIZE_BYTES) {
        invalidFiles.push({
          name: file.name,
          reason: `File size exceeds ${MAX_FILE_SIZE_MB}MB.`,
        });
      } else {
        validFiles.push(file);
      }
    });

    invalidFiles.forEach((file) =>
      toast.error(`'${file.name}': ${file.reason}`)
    );

    if (validFiles.length === 0) {
      return;
    }

    const newFileObjects = validFiles.map((file) => {
      const url = URL.createObjectURL(file);
      const finalDocumentType =
        newDocumentType === "other" ? otherDocumentType : newDocumentType;
=======
<<<<<<< HEAD
    const newFiles = Array.from(files).map(file => {
      // In a real app, you would upload to server here and get URL back
      // For now we'll create object URLs for preview
      const url = URL.createObjectURL(file);
=======
    if (!newDocumentType) {
      toast.error("Please select a document type first.");
      return;
    }

    if (newDocumentType === "other" && otherDocumentType.trim() === "") {
      toast.error("Please specify the document type for 'Other'.");
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: { name: string; reason: string }[] = [];

    Array.from(files).forEach((file) => {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        invalidFiles.push({
          name: file.name,
          reason: "Unsupported file type.",
        });
      } else if (file.size > MAX_FILE_SIZE_BYTES) {
        invalidFiles.push({
          name: file.name,
          reason: `File size exceeds ${MAX_FILE_SIZE_MB}MB.`,
        });
      } else {
        validFiles.push(file);
      }
    });

    invalidFiles.forEach((file) =>
      toast.error(`'${file.name}': ${file.reason}`)
    );

    if (validFiles.length === 0) {
      return;
    }

    const newFileObjects = validFiles.map((file) => {
      const url = URL.createObjectURL(file);
      const finalDocumentType =
        newDocumentType === "other" ? otherDocumentType : newDocumentType;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url,
<<<<<<< HEAD
        documentType: finalDocumentType,
        version: 1,
        uploadedAt: new Date(),
        uploadedBy: "Current User",
=======
<<<<<<< HEAD
        documentType: newDocumentType,
        version: 1,
        uploadedAt: new Date(),
        uploadedBy: "Current User" // Would be replaced with actual user context
=======
        documentType: finalDocumentType,
        version: 1,
        uploadedAt: new Date(),
        uploadedBy: "Current User",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      };
    });

    updateFormData({
<<<<<<< HEAD
      documents: [...(formData.documents || []), ...newFileObjects],
=======
<<<<<<< HEAD
      documents: [...formData.documents, ...newFiles]
>>>>>>> 9b0ce35 (Initial commit)
    });

    toast.success(
      `${newFileObjects.length} document${
        newFileObjects.length === 1 ? "" : "s"
      } uploaded successfully.`
    );
  };

  const handleDeleteDocument = (id: string) => {
    if (isWorkflowLocked) {
      toast.error("Cannot delete documents after workflow is confirmed.");
      return;
    }

    const docToDelete = (formData.documents || []).find(
      (doc) => doc.id === id
    );
    if (docToDelete && docToDelete.url.startsWith("blob:")) {
      URL.revokeObjectURL(docToDelete.url);
    }

    updateFormData({
<<<<<<< HEAD
      documents: (formData.documents || []).filter((doc) => doc.id !== id),
=======
      documents: formData.documents.filter(doc => doc.id !== id)
=======
      documents: [...(formData.documents || []), ...newFileObjects],
    });

    toast.success(
      `${newFileObjects.length} document${
        newFileObjects.length === 1 ? "" : "s"
      } uploaded successfully.`
    );
  };

  const handleDeleteDocument = (id: string) => {
    if (isWorkflowLocked) {
      toast.error("Cannot delete documents after workflow is confirmed.");
      return;
    }

    const docToDelete = (formData.documents || []).find(
      (doc) => doc.id === id
    );
    if (docToDelete && docToDelete.url.startsWith("blob:")) {
      URL.revokeObjectURL(docToDelete.url);
    }

    updateFormData({
      documents: (formData.documents || []).filter((doc) => doc.id !== id),
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    });
    toast.success("Document removed");
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
<<<<<<< HEAD
    } else if (type === "application/pdf") {
      return <FileText className="h-6 w-6 text-red-500" />;
=======
<<<<<<< HEAD
    } else if (
      type === "application/pdf" ||
      type === "application/msword" ||
      type.includes("wordprocessingml")
    ) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (
      type.includes("spreadsheet") ||
      type.includes("excel")
    ) {
      return <FileText className="h-6 w-6 text-green-500" />;
    } else if (
      type.includes("zip") ||
      type.includes("rar") ||
      type.includes("tar") ||
      type.includes("7z")
    ) {
      return <FileArchive className="h-6 w-6 text-yellow-500" />;
=======
    } else if (type === "application/pdf") {
      return <FileText className="h-6 w-6 text-red-500" />;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
<<<<<<< HEAD
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
=======
<<<<<<< HEAD
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
=======
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  };

  return (
    <div className="space-y-8">
<<<<<<< HEAD
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Document Upload
            </h2>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                Documents are now read-only as the workflow has been confirmed.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 3 of 6
            </Badge>
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
          </div>
        </div>
=======
<<<<<<< HEAD
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Supporting Documents</h2>
>>>>>>> 9b0ce35 (Initial commit)
        <p className="text-gray-600">
          First, select a type for the document(s) you are about to upload.
        </p>

        <div className="space-y-3">
          <Select
            value={newDocumentType}
            onValueChange={(
              value: "drawing" | "reference" | "compliance" | "other"
            ) => {
              setNewDocumentType(value);
              if (value !== "other") {
                setOtherDocumentType("");
              }
            }}
            disabled={isWorkflowLocked}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Document Type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drawing">Drawing</SelectItem>
              <SelectItem value="reference">Reference</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {newDocumentType === "other" && (
            <Input
              type="text"
              placeholder="Please specify type (e.g., Specification Sheet)"
              value={otherDocumentType}
              onChange={(e) => setOtherDocumentType(e.target.value)}
              className="mt-2"
              disabled={isWorkflowLocked}
            />
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-6">
        <div>
          <div
            className={`flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              dragActive && newDocumentType && !isWorkflowLocked
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300"
            } ${
              !newDocumentType || isWorkflowLocked
                ? "cursor-not-allowed bg-gray-100 opacity-60"
                : "cursor-pointer hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => {
              if (isWorkflowLocked) return;
              !newDocumentType
                ? toast.error("Please select a document type first.")
                : fileInputRef.current?.click()
            }}
          >
            <Upload className="mb-2 h-6 w-6 text-blue-500" />
            <p className="mb-1 text-sm font-medium text-gray-900">
              {isWorkflowLocked
                ? "Document upload is locked"
                : newDocumentType
                ? "Click to upload or drag and drop"
                : "Select a document type to enable upload"}
            </p>
            <p className="text-xs text-gray-500">
              PDF, JPG, PNG (max {MAX_FILE_SIZE_MB}MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleChange}
              accept={ALLOWED_FILE_EXTENSIONS}
              disabled={!newDocumentType || isWorkflowLocked}
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Uploaded Documents */}
        {formData.documents && formData.documents.length > 0 && (
=======
        {formData.documents.length > 0 && (
=======
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Document Upload
            </h2>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                Documents are now read-only as the workflow has been confirmed.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 3 of 6
            </Badge>
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
          </div>
        </div>
        <p className="text-gray-600">
          First, select a type for the document(s) you are about to upload.
        </p>

        <div className="space-y-3">
          <Select
            value={newDocumentType}
            onValueChange={(
              value: "drawing" | "reference" | "compliance" | "other"
            ) => {
              setNewDocumentType(value);
              if (value !== "other") {
                setOtherDocumentType("");
              }
            }}
            disabled={isWorkflowLocked}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Document Type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drawing">Drawing</SelectItem>
              <SelectItem value="reference">Reference</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {newDocumentType === "other" && (
            <Input
              type="text"
              placeholder="Please specify type (e.g., Specification Sheet)"
              value={otherDocumentType}
              onChange={(e) => setOtherDocumentType(e.target.value)}
              className="mt-2"
              disabled={isWorkflowLocked}
            />
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-6">
        <div>
          <div
            className={`flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              dragActive && newDocumentType && !isWorkflowLocked
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300"
            } ${
              !newDocumentType || isWorkflowLocked
                ? "cursor-not-allowed bg-gray-100 opacity-60"
                : "cursor-pointer hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => {
              if (isWorkflowLocked) return;
              !newDocumentType
                ? toast.error("Please select a document type first.")
                : fileInputRef.current?.click()
            }}
          >
            <Upload className="mb-2 h-6 w-6 text-blue-500" />
            <p className="mb-1 text-sm font-medium text-gray-900">
              {isWorkflowLocked
                ? "Document upload is locked"
                : newDocumentType
                ? "Click to upload or drag and drop"
                : "Select a document type to enable upload"}
            </p>
            <p className="text-xs text-gray-500">
              PDF, JPG, PNG (max {MAX_FILE_SIZE_MB}MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleChange}
              accept={ALLOWED_FILE_EXTENSIONS}
              disabled={!newDocumentType || isWorkflowLocked}
            />
          </div>
        </div>

        {/* Uploaded Documents */}
        {formData.documents && formData.documents.length > 0 && (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Uploaded Documents</h3>
            <div className="divide-y rounded-md border">
              {formData.documents.map((doc) => (
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <div key={doc.id} className="flex items-center justify-between p-4">
=======
>>>>>>> 9b0ce35 (Initial commit)
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4"
                >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span className="capitalize">{doc.documentType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
<<<<<<< HEAD
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
=======
<<<<<<< HEAD
                      className="rounded-md px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
>>>>>>> 9b0ce35 (Initial commit)
                    >
                      <Eye className="h-4 w-4 text-blue-500" />
                    </a>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className={`rounded-md p-1 text-gray-500 hover:bg-gray-100 ${
                        isWorkflowLocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isWorkflowLocked}
                    >
<<<<<<< HEAD
                      <Trash className="h-4 w-4 text-red-500" />
=======
                      <X className="h-4 w-4" />
=======
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 text-blue-500" />
                    </a>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className={`rounded-md p-1 text-gray-500 hover:bg-gray-100 ${
                        isWorkflowLocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isWorkflowLocked}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center w-full pt-6">
=======
<<<<<<< HEAD
      <div className="flex justify-between pt-6">
>>>>>>> 9b0ce35 (Initial commit)
        <Button 
          variant="outline" 
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
<<<<<<< HEAD
=======
        <Button onClick={handleNext}>
          Next
        </Button>
=======
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center w-full pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
>>>>>>> 9b0ce35 (Initial commit)
        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            className="font-medium"
            onClick={handleSaveAsDraft}
            disabled={!formData.title || isSaving || isWorkflowLocked}
          >
            {isSaving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Continue to Workflow
          </Button>
        </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default DocumentsStep;
=======
<<<<<<< HEAD
export default DocumentsStep;
=======
export default DocumentsStep;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
