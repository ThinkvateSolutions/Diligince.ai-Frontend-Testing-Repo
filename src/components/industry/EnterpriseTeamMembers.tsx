// Part 1: Imports & Types
import React, { useState, useEffect } from "react";
import {
  Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Badge, Avatar, AvatarFallback, Card, CardContent, CardHeader, CardTitle,
  RadioGroup, RadioGroupItem, Label
} from "@/components/ui";
import {
  Users, Plus, Trash2, Shield, Star, UserCheck, Search, Crown, Eye, Info, Pencil,
  Edit,
  Trash,
  User
} from "lucide-react";
import { toast } from "sonner";

type Role = "Admin" | "Manager" | "Approver 1" | "Approver 2" | "Member" | "Viewer";
type Status = "Provisional" | "Active" | "Rejected";
type UserMode = "single" | "multiple";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: Role;
  department: string;
  status: Status;
  designation: string;
  joinDate: string;
  document?: string;
  phone?: string;
  isAdmin: boolean;
};

const LOCAL_STORAGE_KEYS = {
  single: "enterprise_team_members_single",
  multiple: "enterprise_team_members_multiple",
};

const designationRank: Record<string, number> = {
  "CEO": 5, "Director": 4, "General Manager": 3,
  "Manager": 2, "Engineer": 1, "Intern": 0,
};

// Part 2: Component Start
const EnterpriseTeamMembers = () => {
  const [userMode, setUserMode] = useState<UserMode>("single");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Viewer" as Role,
    department: "",
    designation: "",
    phone: "",
    document: null as File | null,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [adminTransferCandidate, setAdminTransferCandidate] = useState<TeamMember | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const currentUser = teamMembers.find((m) => m.isAdmin);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS[userMode]);
    if (saved) setTeamMembers(JSON.parse(saved));
    else setTeamMembers([]);
  }, [userMode]);

  const saveTeam = (data: TeamMember[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS[userMode], JSON.stringify(data));
    setTeamMembers(data);
  };

  const validateForm = () => {
    const { firstName, lastName, email, role, department, designation, phone, document } = form;

    // Name validations
    if (!firstName.trim() || /\d/.test(firstName)) return toast.error("Enter valid first name (no numbers)");
    if (!lastName.trim() || /\d/.test(lastName)) return toast.error("Enter valid last name (no numbers)");

    // Email format
    if (!email.includes("@") || !email.includes(".")) return toast.error("Invalid email format");

    // Required dropdowns
    if (!role || !department || !designation) return toast.error("Please fill all required fields");

    // Phone validation (10 digits, starts with 6–9)
    if (!/^[6-9]\d{9}$/.test(phone || "")) return toast.error("Enter a valid 10-digit phone starting with 6–9");

    // Document check (safe)
    if (!document) return toast.error("Upload letter pad document");
    if (document && document.size > 5 * 1024 * 1024) return toast.error("Document must be under 5MB");
    if (document && !["application/pdf", "image/png", "image/jpeg"].includes(document.type)) {
      return toast.error("Only PDF, PNG, or JPG files are allowed");
    }

    // Email domain check: strict match with first member
    if (teamMembers.length > 0) {
      const firstDomain = teamMembers[0].email.split("@")[1]?.toLowerCase();
      const newDomain = email.split("@")[1]?.toLowerCase();
      if (firstDomain !== newDomain) {
        return toast.error(`All emails must use @${firstDomain}`);
      }
    }

    // Admin Role Limit Logic
    const existingAdmins = teamMembers.filter(m => m.role === "Admin");
    if (userMode === "single" && role === "Admin" && existingAdmins.length >= 1) {
      return toast.error("Only one Admin allowed in Single User Mode");
    }
    if (userMode === "multiple" && role === "Admin" && existingAdmins.length >= 2) {
      toast.warning("Max 2 Admins allowed. Role downgraded to Manager.");
      setForm(prev => ({ ...prev, role: "Manager" }));
    }

    return true;
  };

  const isFormValid = () => {
    const { firstName, lastName, email, role, department, designation, phone, document } = form;

    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      !/\d/.test(firstName) &&
      !/\d/.test(lastName) &&
      email.includes("@") &&
      email.includes(".") &&
      !!role &&
      !!department &&
      !!designation &&
      /^[6-9]\d{9}$/.test(phone || "") &&
      document !== null &&
      document.size <= 5 * 1024 * 1024 &&
      ["application/pdf", "image/png", "image/jpeg"].includes(document.type) &&
      (
        teamMembers.length === 0 ||
        email.split("@")[1]?.toLowerCase() === teamMembers[0].email.split("@")[1]?.toLowerCase()
      ) &&
      !(
        userMode === "single" && role === "Admin" && teamMembers.filter(m => m.role === "Admin").length >= 1
      ) &&
      !(
        userMode === "multiple" && role === "Admin" && teamMembers.filter(m => m.role === "Admin").length >= 2
      )
    );
  };

  const handleAddMember = () => {
    if (!validateForm()) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const docBase64 = reader.result?.toString() || "";
      const id = Date.now();
      const name = `${form.firstName.trim()} ${form.lastName.trim()}`;
      const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();

      let assignedRole: Role = form.role;
      const existingAdmins = teamMembers.filter(m => m.role === "Admin");

      // ✅ Enforce Admin limit logic
      if (form.role === "Admin") {
        if (userMode === "single" && existingAdmins.length >= 1) {
          assignedRole = "Manager";
          toast.warning("Only one Admin allowed in Single User Mode. Role downgraded to Manager.");
        } else if (userMode === "multiple" && existingAdmins.length >= 2) {
          assignedRole = "Manager";
          toast.warning("Max 2 Admins allowed in Multiple Users Mode. Role downgraded to Manager.");
        }
      }

      const isAdmin = assignedRole === "Admin";
      const now = new Date();
      const joinDate = `${now.getDate().toString().padStart(2, "0")}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getFullYear()}`;

      const newMember: TeamMember = {
        id,
        name,
        email: form.email.trim(),
        initials,
        role: assignedRole,
        department: form.department,
        designation: form.designation,
        status: "Provisional",
        joinDate,
        document: docBase64,
        isAdmin,
        phone: form.phone,
      };

      saveTeam([...teamMembers, newMember]);

      // ✅ Clear form fields after adding
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "Viewer",
        department: "",
        designation: "",
        document: null,
      });

      setShowAddModal(false);
      toast.success(`Team member added as ${assignedRole}`);
    };

    if (form.document) {
      reader.readAsDataURL(form.document);
    }
  };

  const handleSort = (field: keyof TeamMember) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };


  const handleAdminTransfer = (id: number) => {
    const newAdmin = teamMembers.find((m) => m.id === id);
    const currentAdmin = teamMembers.find((m) => m.isAdmin);

    if (!newAdmin || !currentAdmin) return toast.error("User not found");

    // ❌ Only verified users can become admin
    if (newAdmin.status !== "Active") {
      return toast.warning("Only verified users can become admin");
    }

    // ❌ Enforce hierarchy
    const newRank = designationRank[newAdmin.designation] ?? 0;
    const currentRank = designationRank[currentAdmin.designation] ?? 0;
    if (newRank < currentRank) {
      return toast.error("Cannot transfer admin to a lower designation");
    }

    const confirm = window.confirm(`Transfer admin rights to ${newAdmin.name}?`);
    if (!confirm) return;

    const updated = teamMembers.map((m) => {
      if (m.id === id) {
        return { ...m, isAdmin: true, role: "Admin" as Role };
      } else if (m.isAdmin) {
        return {
          ...m,
          isAdmin: false,
          role: m.role === "Admin" ? "Manager" as Role : m.role as Role,
        };
      }
      return m;
    });

    saveTeam(updated); // ✅ Now matches expected TeamMember[]

    toast.success(`Admin rights transferred to ${newAdmin.name}`);
  };

  const handleDelete = (id: number) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    saveTeam(updated);
    toast.success("Team member deleted");
  };

  const handleEditMember = (member: TeamMember) => {
    if (!teamMembers.find(m => m.isAdmin)) {
      return toast.error("Only Admins can edit members");
    }

    const [firstName, lastName] = member.name.split(" ");
    setForm({
      firstName: firstName || "",
      lastName: lastName || "",
      email: member.email,
      role: member.role,
      department: member.department,
      designation: member.designation,
      phone: member.phone || "",
      document: null, // new file only if user changes
    });

    setEditId(member.id);
    setShowAddModal(true);
  };

  const handleSaveEdit = () => {
    if (!validateForm()) return;

    const updated = teamMembers.map((m) => {
      if (m.id !== editId) return m;

      const name = `${form.firstName.trim()} ${form.lastName.trim()}`;
      const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();

      return {
        ...m,
        name,
        initials,
        email: form.email.trim(),
        role: form.role,
        department: form.department,
        designation: form.designation,
        phone: form.phone,
      };
    });

    saveTeam(updated);
    setEditId(null);
    setShowAddModal(false);
    toast.success("Member updated successfully");
  };


  const getRoleColor = (role: string) =>
  ({
    Admin: "bg-purple-100 text-purple-800",
    Manager: "bg-blue-100 text-blue-800",
    Member: "bg-green-100 text-green-800",
    Viewer: "bg-amber-100 text-amber-800",
  }[role] || "");

  const getStatusColor = (status: string) =>
  ({
    Active: "bg-green-100 text-green-800",
    Provisional: "bg-blue-100 text-blue-800",
    Rejected: "bg-red-100 text-red-800",
  }[status] || "");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [sortBy, setSortBy] = useState<keyof TeamMember | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const filteredMembers = teamMembers.filter(m => {
    if (filterRole !== "all" && m.role !== filterRole) return false;
    if (filterDepartment !== "all" && m.department !== filterDepartment) return false;
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    if (
      searchTerm &&
      !m.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !m.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedMembers = [...filteredMembers];
  if (sortBy) {
    sortedMembers.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);
  const paginatedMembers = sortedMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );




  return (
    <Card className="p-4 bg-white m-6 h-full text-primary-500">
      <div className="space-y-6 max-w-7xl mx-auto px-4">
        {/* Header + Action Bar */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left: Title & Description */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-500 mr-2">Team Members</h1>
              <button
                type="button"
                onClick={() => setShowDescription((prev) => !prev)}
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>

            {/* Fixed space for description */}
            <div className="min-h-[30px]">
              {showDescription && (
                <p className="text-sm text-gray-500 mt-1">
                  Manage your organization's team members and their permissions
                </p>
              )}
            </div>
          </div>

          {/* Right: Mode + Add Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            {/* User Type Toggle */}
            <div className="flex items-center space-x-4">
              <RadioGroup
                value={userMode}
                onValueChange={(val) => setUserMode(val as UserMode)}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label className="text-primary-500" htmlFor="single" className="text-sm text-primary-500">Single User</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <Label htmlFor="multiple" className="text-primary-500 text-sm text-primary-500">Multiple Users</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Add Member Button */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800 text-white font-medium shadow-sm mt-[10px] p-3 ">
                  {editId ? "Update" : "Add"}
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900">
                    {editId ? "Edit" : "Add Member"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-primary-500" htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="e.g Venkat"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary-500" htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        placeholder=""
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-primary-500" htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g example@example.com"
                      required
                    />
                  </div>

                  {/* Role & Department */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-primary-500" htmlFor="role">Role</Label>
                      <Select value={form.role} onValueChange={(val) => setForm({ ...form, role: val as Role })}>
                        <SelectTrigger id="role"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary-500" htmlFor="department">Department</Label>
                      <Select value={form.department} onValueChange={(val) => setForm({ ...form, department: val })}>
                        <SelectTrigger id="department"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Procurement">Procurement</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Designation & Phone */}
                  <div className="space-y-2">
                    <Label className="text-primary-500" htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      placeholder="e.g Consultant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-primary-500" htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      maxLength={10}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g 9876543210"
                    />
                  </div>

                  {/* Document */}
                  <div className="space-y-2">
                    <Label className="text-primary-500" htmlFor="document">Letter Pad Document (PDF, PNG, JPG)</Label>
                    <div className="relative">
                      <Input
                        id="document"
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => setForm({ ...form, document: e.target.files?.[0] || null })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center border rounded-md overflow-hidden bg-gray-50 hover:bg-gray-100">
                        <div className="px-4 py-2 bg-gray-200 text-gray-700 font-medium">
                          Choose File
                        </div>
                        <div className="px-4 py-2 text-gray-500 flex-1 truncate">
                          {form.document ? form.document.name : "No file chosen"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      onClick={editId ? handleSaveEdit : handleAddMember}
                      disabled={!isFormValid()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {editId ? "Save" : "Add"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditId(null);
                        setShowAddModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>


        {/* 📊 Stats Cards */}

        {/* 👥 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase mb-1">Total Members</p>
                  <p className="text-3xl font-bold">{teamMembers.length}</p>
                </div>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase mb-1">Active</p>
                  <p className="text-3xl font-bold">{teamMembers.filter(m => m.status === "Active").length}</p>
                </div>
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase mb-1">Admins</p>
                  <p className="text-3xl font-bold">{teamMembers.filter(m => m.role === "Admin").length}</p>
                </div>
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase mb-1">Departments</p>
                  <p className="text-3xl font-bold">{new Set(teamMembers.map(m => m.department)).size}</p>
                </div>
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>



        {/* 📋 Team Members Table */}
        <Card className="bg-white border shadow-sm">
          <CardHeader className="border-b flex flex-row items-center justify-between p-2">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Users className="w-5 h-5 mr-2" />
              Team Members
            </CardTitle>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white font-medium shadow-sm p-2 m-0">
              {editId ? "Update" : "Add"}
              <Plus className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          {/* 🔍 Filters */}
          <Card className="bg-white border-0">
            <CardContent className="p-1 flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name/email..."
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole} className="bg-white">
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDepartment} onValueChange={setFilterDepartment} className="bg-white">
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Procurement">Procurement</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus} className="bg-white">
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Provisional">Provisional</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <CardContent className="p-0">
            <Table className="min-w-[900px] w-full scrollable">
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort("name")}
                    className="cursor-pointer select-none px-16 py-3"
                  >
                    Member {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>

                  <TableHead
                    onClick={() => handleSort("role")}
                    className="cursor-pointer select-none px-7 py-3"
                  >
                    Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>

                  <TableHead
                    onClick={() => handleSort("department")}
                    className="cursor-pointer select-none px-4 py-3"
                  >
                    Department {sortBy === "department" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>

                  <TableHead
                    onClick={() => handleSort("status")}
                    className="cursor-pointer select-none px-6 py-3"
                  >
                    Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>

                  <TableHead
                    onClick={() => handleSort("joinDate")}
                    className="cursor-pointer select-none px-6 py-3"
                  >
                    Joined {sortBy === "joinDate" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>

                  <TableHead className="text-center px-6 py-3">Actions</TableHead>

                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedMembers.map((member) => (
                  <TableRow
                    key={member.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      if (currentUser?.isAdmin) {
                        setSelectedMemberId(member.id);
                      }
                    }}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarFallback>{member.initials}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    </TableCell>

                    <TableCell className="py-4">{member.department}</TableCell>

                    <TableCell className="py-4">
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    </TableCell>

                    <TableCell className="py-4">{member.joinDate}</TableCell>

                    <TableCell className="py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (currentUser?.isAdmin) {
                              setEditId(member.id);
                              setForm({
                                firstName: member.name.split(" ")[0] || "",
                                lastName: member.name.split(" ")[1] || "",
                                email: member.email,
                                role: member.role,
                                department: member.department,
                                designation: member.designation,
                                phone: member.phone || "",
                                document: null,
                              });
                              setShowAddModal(true);
                            } else {
                              toast.error("Only admins can edit team members.");
                            }
                          }}
                          title="Edit"
                        >
                          <Edit className={`w-4 h-4 ${currentUser?.isAdmin ? "text-grey-600" : "text-gray-300"}`} />
                        </Button>

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (currentUser?.isAdmin) {
                              handleDelete(member.id);
                            } else {
                              toast.error("Only admins can delete team members.");
                            }
                          }}
                          title="Remove"
                        >
                          <Trash className={`w-4 h-4 ${currentUser?.isAdmin ? "text-red-600" : "text-gray-300"}`} />
                        </Button>

                        {/* Admin/Member Indicator */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-default" // Remove pointer cursor since this is just an indicator
                          title={member.isAdmin ? "Admin" : "Member"}
                        >
                          {member.isAdmin ? (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <User className="w-4 h-4 text-blue-400" />
                          )}
                        </Button>

                        {/* View Document */}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            if (!member.document) {
                              // if missing, allow admin to edit and re-upload document
                              if (currentUser?.isAdmin) {
                                setEditId(member.id);
                                setForm({
                                  firstName: member.name.split(" ")[0] || "",
                                  lastName: member.name.split(" ")[1] || "",
                                  email: member.email,
                                  role: member.role,
                                  department: member.department,
                                  designation: member.designation,
                                  phone: member.phone || "",
                                  document: null,
                                });
                                setShowAddModal(true);
                                toast.warning("No document uploaded. You can now add one.");
                              } else {
                                toast.error("No document uploaded.");
                              }
                              return;
                            }
                            const base64 = member.document;
                            const fullDataUrl = base64.startsWith("data:")
                              ? base64
                              : `data:application/pdf;base64,${base64}`;
                            const newTab = window.open();
                            if (newTab) {
                              newTab.document.write(
                                `<iframe src="${fullDataUrl}" width="100%" height="100%" style="border:none;"></iframe>`
                              );
                              newTab.document.title = "Document Preview";
                            } else {
                              toast.error("Unable to open new tab. Please allow popups.");
                            }
                          }}
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-blue-600 hover:text-blue-600 transition-colors" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-center items-center py-4">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            )}


          </CardContent>
        </Card>

      </div>
    </Card>
  );
};

export default EnterpriseTeamMembers;
