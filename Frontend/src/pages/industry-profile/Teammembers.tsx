import React from "react";
import { useState, useEffect } from "react";

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
  Home,
  User
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";



const Teammembers = () =>
{
    const [teamMembers, setTeamMembers] = useState(() => {
  const saved = localStorage.getItem("teamMembers");
  return saved ? JSON.parse(saved) : [
    { id: 1, name: "John Doe", role: "CEO", email: "john@steelplant.com" },
    { id: 2, name: "Jane Smith", role: "CTO", email: "jane@steelplant.com" },
    { id: 3, name: "Robert Johnson", role: "Operations Manager", email: "robert@steelplant.com" }
  ];
});


// Load team from localStorage on mount
useEffect(() => {
  const savedMembers = localStorage.getItem("teamMembers");
  if (savedMembers) {
    setTeamMembers(JSON.parse(savedMembers));
  }
}, []);

// Save team to localStorage on every change
useEffect(() => {
  localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
}, [teamMembers]);




  const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "", email: "" });
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);

  const handleTeamMemberSubmit = (e) => {
    e.preventDefault();
    if (editingTeamMember) {
      // Update existing team member
      setTeamMembers(teamMembers.map(member => 
        member.id === editingTeamMember.id ? 
          { ...member, ...newTeamMember } : 
          member
      ));
      toast.success(`${newTeamMember.name}'s details updated successfully!`);
      setEditingTeamMember(null);
    } else {
  // Add new team member
        const newMember = {
          id: teamMembers.length ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1,
          ...newTeamMember
        };

        const updatedTeam = [...teamMembers, newMember];
        setTeamMembers(updatedTeam);

        toast.success(`${newMember.name} has been added successfully to the team.`);
        console.log("updated team", updatedTeam);
      }

    setNewTeamMember({ name: "", role: "", email: "" });
    setShowTeamMemberForm(false);
    
  };


  const deleteTeamMember = (id) => {
  const deletedMember = teamMembers.find(member => member.id === id);
  
  if (!deletedMember) return;

  const confirmDelete = window.confirm(`Are you sure you want to remove ${deletedMember.name} from the team?`);

  if (confirmDelete) {
    const updatedTeam = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedTeam);
    toast.success(`${deletedMember.name} has been removed from the team.`);
    }
    };

     const editTeamMember = (member) => {
  setNewTeamMember({ name: member.name, role: member.role, email: member.email });
  setEditingTeamMember(member);
  setShowTeamMemberForm(true);

  console.log("Editing team member:", member);
  
        };
   
    
    return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
              <Button onClick={() => {
                setNewTeamMember({ name: "", role: "", email: "" });
                setEditingTeamMember(null);
                setShowTeamMemberForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
            
            <hr className="mb-6" />
            
            {showTeamMemberForm && (
              <Card className="p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  {editingTeamMember ? "Edit Team Member" : "Add New Team Member"}
                </h3>
                <form onSubmit={handleTeamMemberSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        value={newTeamMember.name}
                        onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <Input
                        value={newTeamMember.role}
                        onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={newTeamMember.email}
                        onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowTeamMemberForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" >
                      {editingTeamMember ? "Update Member" : "Add Member"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right" style={{ paddingRight: '40px' }} >Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => editTeamMember(member)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteTeamMember(member.id)}>
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
}

export default Teammembers;