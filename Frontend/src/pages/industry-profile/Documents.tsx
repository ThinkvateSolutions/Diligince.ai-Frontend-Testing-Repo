import React, { useState, useRef } from "react";
import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  Upload,
  Plus,
  Trash,
  Mail,
  Phone,
  Globe,
  Calendar,
  Save,
  X,
  Eye,
  Home,
  User
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";


interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  expiry: string;
  status: string;
  url: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(() => {
    const savedDocs = localStorage.getItem("documents");
    if (savedDocs) return JSON.parse(savedDocs);
    return [
      {
        id: 1,
        name: "Company Registration",
        type: "PDF",
        uploadDate: "15 Mar 2023",
        expiry: "N/A",
        status: "Verified",
        url: "/sample-docs/company-registration.pdf"
      },
      {
        id: 2,
        name: "ISO 9001 Certificate",
        type: "PDF",
        uploadDate: "20 Jan 2023",
        expiry: "20 Jan 2026",
        status: "Verified",
        url: "/sample-docs/iso-certificate.pdf"
      },
      {
        id: 3,
        name: "GST Certificate",
        type: "PDF",
        uploadDate: "05 Apr 2023",
        expiry: "N/A",
        status: "Pending",
        url: "/sample-docs/gst-certificate.pdf"
      }
    ];
  });
 
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const deleteDocument = (id: number) => {
    const deletedDoc = documents.find(doc => doc.id === id);
    if (!deletedDoc) return;

    const confirmDelete = window.confirm(`Are you sure you want to remove "${deletedDoc.name}" from the list?`);
    if (confirmDelete) {
      const updatedDocs = documents.filter(doc => doc.id !== id);
      setDocuments(updatedDocs);
      toast.success(`${deletedDoc.name} has been removed from the list.`, { duration: 2000 });
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input to allow selecting same file again
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    // Check for duplicates
    const existingDoc = documents.find(doc => 
      doc.name.toLowerCase() === file.name.toLowerCase()
    );
    
    if (existingDoc) {
      toast.error(`"${file.name}" is already uploaded.`, { duration: 2000 });
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.", { duration: 2000 });
      return;
    }

    const fileType = file.name.split(".").pop()?.toUpperCase() || "FILE";
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newDocument: Document = {
      id: documents.length ? Math.max(...documents.map(doc => doc.id)) + 1 : 1,
      name: file.name,
      type: fileType,
      uploadDate: today,
      expiry: "N/A",
      status: "Pending",
      url: URL.createObjectURL(file)
    };

    const confirmUpload = window.confirm(`Upload "${file.name}"?`);
    
    if (confirmUpload) {
      setDocuments(prev => [...prev, newDocument]);
      toast.success(`${file.name} uploaded successfully.`, { duration: 2000 });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Documents & Certification</h2>
      </div>
      
      <hr className="mb-6" />
      
      <div
        className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center mb-6 cursor-pointer transition-colors duration-200 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Upload className="h-10 w-10 text-blue-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Drag & drop files or click to upload
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Supported formats: PDF, JPG, PNG (Max size: 5MB)
        </p>
        <Button type="button">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Documents</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center" style={{ paddingLeft: '120px' }}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>{doc.expiry}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doc.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {doc.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = doc.url;
                      link.download = doc.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(doc.url, "_blank", "noopener,noreferrer")}
                  >
                    <Eye className="w-4 h-4 text-blue-500" />

                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteDocument(doc.id)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Documents;