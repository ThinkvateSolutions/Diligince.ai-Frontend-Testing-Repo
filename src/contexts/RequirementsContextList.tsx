import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// The unified data structure for an item in the main requirements list
export interface Requirement {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: 'Active' | 'Draft' | 'Completed' | 'Pending';
  budget: number;
  deadline: string;
  description: string;
  createdDate: string;
}

const initialRequirements: Requirement[] = [
  {
    id: 'REQ-2024-001',
    title: 'Industrial Equipment Procurement for Unit #7',
    category: 'Equipment',
    priority: 'High',
    status: 'Active',
    budget: 150000,
    createdDate: '2025-07-15',
    deadline: '2025-09-01',
    description: 'Procurement of industrial valves and pressure control systems.',
  },
   {
    id: 'REQ-2024-002',
    title: 'Pipeline Inspection Services',
    category: 'Services',
    priority: 'Medium',
    status: 'Pending',
    budget: 75000,
    createdDate: '2025-07-20',
    deadline: '2025-08-28',
    description: 'Comprehensive pipeline inspection and maintenance services.',
  },
];

interface RequirementsListContextType {
  requirements: Requirement[];
  addRequirement: (req: Requirement) => void;
  updateRequirementById: (id: string, updatedReq: Partial<Requirement>) => void;
  deleteRequirementById: (id: string) => void;
}

const RequirementsListContext = createContext<RequirementsListContextType | undefined>(undefined);

export const RequirementsListProvider = ({ children }: { children: ReactNode }) => {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);

  const addRequirement = useCallback((req: Requirement) => {
    setRequirements(prev => {
        const exists = prev.some(r => r.id === req.id);
        if (exists) {
            return prev.map(r => r.id === req.id ? { ...r, ...req } : r);
        }
        return [req, ...prev];
    });
  }, []);

  const updateRequirementById = useCallback((id: string, updatedData: Partial<Requirement>) => {
    setRequirements(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updatedData } : r))
    );
  }, []);

  const deleteRequirementById = useCallback((id: string) => {
    setRequirements(prev => prev.filter(r => r.id !== id));
    localStorage.removeItem(id); // Also remove from local storage if it's a draft
  }, []);

  return (
    <RequirementsListContext.Provider value={{ requirements, addRequirement, updateRequirementById, deleteRequirementById }}>
      {children}
    </RequirementsListContext.Provider>
  );
};

export const useRequirementsList = () => {
  const context = useContext(RequirementsListContext);
  if (!context) {
    throw new Error('useRequirementsList must be used within a RequirementsListProvider');
  }
  return context;
};