// src/data/mockMessages.ts

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isFromContact: boolean;
  isEdited?: boolean;
  replyTo?: number;
  reactions?: { [emoji: string]: number };
  read?: boolean;
  attachment?: {
    name: string;
    type: 'image' | 'pdf' | 'doc' | 'png';
    url: string;
  };
}

// --- CORRECTED INTERFACE ---
export interface ConversationThread {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  lastMessage: string;
  unread: boolean; // Changed from 'any' to 'boolean'
  unreadCount: number;
  archive: boolean;
  starred: boolean;
  avatar: string;
  email: string;
  timestamp: string;
  orderNumber?: string;
  projectId?: string;
}

// --- CORRECTED MOCK DATA ---
export const messageThreads: ConversationThread[] = [
  {
    id: 1,
    sender: "Steel Industries Ltd.",
    initials: "SI",
    subject: "Control System Upgrade Proposal",
    preview: "We've reviewed your control system upgrade requirement...",
    lastMessage: "We can schedule a site visit next week...",
    unread: true, // <-- CORRECTED
    unreadCount: 2,
    archive: true,
    starred: false,
    avatar: "bg-blue-100 text-blue-600",
    email: "steel.industries.ltd.@example.com",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), // Older than yesterday
  },
  {
    id: 2,
    sender: "Acme Construction",
    initials: "AC",
    subject: "Project #AC-2023-456 Status Update",
    preview: "The electrical installation is 80% complete...",
    lastMessage: "Please confirm the delivery date for transformers",
    unread: false, // <-- CORRECTED
    unreadCount: 0,
    starred: false,
    archive: true,
    avatar: "bg-green-100 text-green-600",
    projectId: "AC-2023-456",
    email: "acme.construction@example.com",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
  },
  {
    id: 3,
    sender: "Global Energy Solutions",
    initials: "GE",
    subject: "Quotation for Solar Panels",
    preview: "Attached is our quotation for the 500kW solar array...",
    lastMessage: "We can offer a 5% discount for bulk order",
    unread: true, // <-- CORRECTED
    unreadCount: 5,
    archive: true,
    starred: false,
    avatar: "bg-yellow-100 text-yellow-600",
    orderNumber: "QT-78945",
    email: "global.energy.solutions@example.com",
    timestamp: "2023-10-15T13:00:00Z", // dd/mm/yyyy format
  },
  {
    id: 4,
    sender: "City Municipal Office",
    initials: "CM",
    subject: "Permit Approval Notification",
    preview: "Your building permit application has been approved...",
    lastMessage: "Please collect the documents from our office",
    unread: false, // <-- CORRECTED
    unreadCount: 0,
    archive: true,
    starred: true,
    avatar: "bg-purple-100 text-purple-600",
    email: "city.municipal.office@example.com",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 4)).toISOString(), // Today
  },
  {
    id: 5,
    sender: "Precision Tools Inc.",
    initials: "PT",
    subject: "Order #PT-98765 Shipment Delay",
    preview: "We regret to inform you about a delay in your order...",
    lastMessage: "New expected delivery date is June 15",
    unread: true, // <-- CORRECTED
    unreadCount: 1,
    archive: false,
    starred: true,
    orderNumber: "PT-98765",
    avatar: "",
    email: "precision.tools.inc.@example.com",
    timestamp: new Date(new Date().setSeconds(new Date().getSeconds() - 30)).toISOString(), // Just now
  },
  {
    id: 6,
    sender: "Tech Support Team",
    initials: "TS",
    subject: "Your support ticket #TICKET-2023-789",
    preview: "We've identified the issue with your software...",
    lastMessage: "The patch has been deployed to your system",
    unread: false, // <-- CORRECTED
    unreadCount: 0,
    archive: false,
    starred: true,
    avatar: "bg-gray-100 text-gray-600",
    email: "tech.support.team@example.com",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(), // Today
  }
];

export const detailedMessages: { [key: number]: Message[] } = {
  1: [
    // ... existing messages for thread 1 ...
  ],
  2: [
    {
      id: 1,
      sender: "Acme Construction",
      content: "Hello, here's the weekly update for Project #AC-2023-456",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 2,
      sender: "Acme Construction",
      content: "Electrical installation is 80% complete. Mechanical is at 65%. We're on track for the August deadline.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
      reactions: { "👏": 1 }
    },
    {
      id: 3,
      sender: "You",
      content: "Thanks for the update. Any issues with the transformer delivery?",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: false,
      read: true,
    },
    {
      id: 4,
      sender: "Acme Construction",
      content: "Yes, actually. The supplier informed us of a 1-week delay. We may need to adjust the testing schedule.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 5,
      sender: "You",
      content: "Please confirm the new delivery date so we can update our plans.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: false,
      read: true,
    },
    {
      id: 6,
      sender: "Acme Construction",
      content: "Please confirm the delivery date for transformers. The supplier is asking for confirmation.",
      timestamp: "2025-07-23T10:15:00",
      isFromContact: true,
      read: true,
      attachment: {
        name: "delivery-schedule.pdf",
        type: "pdf",
        url: "#"
      }
    }
  ],
  3: [
  {
    id: 1,
    sender: "Global Energy Solutions",
    content: "Dear Client, Thank you for your inquiry about our solar panel solutions.",
    timestamp: "2023-06-12T10:15:00",
    isFromContact: true,
    read: true,
  },
  {
    id: 2,
    sender: "Global Energy Solutions",
    content: "Attached is our quotation for the 500kW solar array you requested.",
    timestamp: "2023-06-12T10:15:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "quotation-GES-2023.pdf",
      type: "pdf",
      url: "#"
    }
  },
  {
    id: 3,
    sender: "You",
    content: "Thank you for the quotation. The price seems higher than market average. Can you explain the cost breakdown?",
    timestamp: "2023-06-12T10:20:00",
    isFromContact: false,
    read: true,
  },
  {
    id: 4,
    sender: "Global Energy Solutions",
    content: "Our price includes premium Tier-1 panels with 25-year warranty, installation, and 5 years of maintenance. Here's the detailed breakdown:",
    timestamp: "2023-06-12T10:25:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "cost-breakdown.xlsx",
      type: "doc",
      url: "#"
    }
  },
  {
    id: 5,
    sender: "Global Energy Solutions",
    content: "We can offer a 5% discount for bulk order if you proceed within this month.",
    timestamp: "2023-06-12T10:30:00",
    isFromContact: true,
    read: false,
  },
  {
    id: 6,
    sender: "You",
    content: "Do you have a brochure or catalog with specifications for the Tier-1 panels you mentioned?",
    timestamp: "2023-06-12T10:45:00",
    isFromContact: false,
    read: true,
  },
  {
    id: 7,
    sender: "Global Energy Solutions",
    content: "Yes, please find our product catalog attached.",
    timestamp: "2023-06-12T11:00:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "solar-products-catalog.pdf",
      type: "pdf",
      url: "#"
    }
  },
  {
    id: 8,
    sender: "Global Energy Solutions",
    content: "You can also view product details on our website here: https://www.globalenergysolutions.com/products",
    timestamp: "2023-06-12T11:05:00",
    isFromContact: true,
    read: true,
  },
  {
    id: 9,
    sender: "Global Energy Solutions",
    content: "Here is a snapshot of a recent installation we completed at an industrial site.",
    timestamp: "2023-06-12T11:15:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "installation-site-01.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 10,
    sender: "Global Energy Solutions",
    content: "This PDF contains client testimonials and case studies for your reference.",
    timestamp: "2023-06-12T11:30:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "case-studies-and-testimonials.pdf",
      type: "pdf",
      url: "#"
    }
  },
  {
    id: 11,
    sender: "You",
    content: "Thanks, the case studies are helpful. Do you have a document outlining post-installation support?",
    timestamp: "2023-06-12T11:45:00",
    isFromContact: false,
    read: true,
  },
  {
    id: 12,
    sender: "Global Energy Solutions",
    content: "Yes, please find the post-installation support policy document attached.",
    timestamp: "2023-06-12T12:00:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "support-policy.docx",
      type: "doc",
      url: "#"
    }
  },
  {
    id: 13,
    sender: "Global Energy Solutions",
    content: "This is an image of our solar panel mounted on a commercial building.",
    timestamp: "2023-06-13T09:30:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "commercial-installation.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 14,
    sender: "Global Energy Solutions",
    content: "Residential rooftop panel setup image for reference.",
    timestamp: "2023-06-14T14:10:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "rooftop-panel.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 15,
    sender: "Global Energy Solutions",
    content: "Here's a night view image of our solar lights at work.",
    timestamp: "2023-06-15T18:45:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "solar-lights-night.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 16,
    sender: "Global Energy Solutions",
    content: "Please check the attached schematic diagram for panel connections.",
    timestamp: "2023-06-16T08:20:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "panel-schematic.png",
      type: "image",
      url: "#"
    }
  },
  {
    id: 17,
    sender: "Global Energy Solutions",
    content: "Recent workshop event: https://www.globalenergysolutions.com/events/workshop2023",
    timestamp: "2023-06-16T12:00:00",
    isFromContact: true,
    read: true
  },
  {
    id: 18,
    sender: "Global Energy Solutions",
    content: "Here is an image of a desert installation with high efficiency output.",
    timestamp: "2023-06-17T07:15:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "desert-setup.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 19,
    sender: "Global Energy Solutions",
    content: "Our partner certifications and global recognition: https://www.globalenergysolutions.com/about/certifications",
    timestamp: "2023-06-17T11:00:00",
    isFromContact: true,
    read: true
  },
  {
    id: 20,
    sender: "Global Energy Solutions",
    content: "Here’s a link to FAQs about our solar warranties: https://www.globalenergysolutions.com/support/warranty-faqs",
    timestamp: "2023-06-18T10:00:00",
    isFromContact: true,
    read: true
  },
  {
    id: 21,
    sender: "Global Energy Solutions",
    content: "Snapshot of a warehouse rooftop installation.",
    timestamp: "2023-06-19T13:35:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "warehouse-roof.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 22,
    sender: "Global Energy Solutions",
    content: "Useful article on solar ROI: https://www.renewablesite.com/articles/solar-panel-roi",
    timestamp: "2023-06-20T16:00:00",
    isFromContact: true,
    read: true
  },
  {
    id: 23,
    sender: "Global Energy Solutions",
    content: "Aerial view of our largest project to date.",
    timestamp: "2023-06-21T09:00:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "aerial-solar-field.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 24,
    sender: "Global Energy Solutions",
    content: "Step-by-step installation guide: https://www.globalenergysolutions.com/install/guide",
    timestamp: "2023-06-21T15:30:00",
    isFromContact: true,
    read: true
  },
  {
    id: 25,
    sender: "Global Energy Solutions",
    content: "Comparison chart of monocrystalline vs polycrystalline panels.",
    timestamp: "2023-06-22T08:10:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "mono-vs-poly.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 26,
    sender: "Global Energy Solutions",
    content: "Government incentives: https://www.govenergy.gov/solar-incentives-2023",
    timestamp: "2023-06-23T10:45:00",
    isFromContact: true,
    read: true
  },
  {
    id: 27,
    sender: "Global Energy Solutions",
    content: "Watch our installation video here: https://www.youtube.com/watch?v=solar123",
    timestamp: "2023-06-24T14:50:00",
    isFromContact: true,
    read: true
  },
  {
    id: 28,
    sender: "Global Energy Solutions",
    content: "Educational infographic on solar performance vs weather conditions.",
    timestamp: "2023-06-25T09:25:00",
    isFromContact: true,
    read: true,
    attachment: {
      name: "weather-impact-infographic.jpg",
      type: "image",
      url: "#"
    }
  },
  {
    id: 29,
    sender: "Global Energy Solutions",
    content: "Link to our latest sustainability report: https://www.globalenergysolutions.com/reports/sustainability-2023",
    timestamp: "2023-06-26T11:30:00",
    isFromContact: true,
    read: true
  },
  {
    id: 30,
    sender: "Global Energy Solutions",
    content: "Our partner portal login: https://partners.globalenergysolutions.com/login",
    timestamp: "2023-06-27T13:00:00",
    isFromContact: true,
    read: true
  }

],

  5: [
    {
      id: 1,
      sender: "Precision Tools Inc.",
      content: "URGENT: Regarding your order #PT-98765",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 2,
      sender: "Precision Tools Inc.",
      content: "We regret to inform you about a delay in your order due to unexpected customs clearance issues.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 3,
      sender: "You",
      content: "This is unacceptable! We have a critical project starting next week that depends on these tools.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: false,
      read: true,
    },
    {
      id: 4,
      sender: "Precision Tools Inc.",
      content: "We completely understand your frustration. We're working on expedited shipping alternatives.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 5,
      sender: "Precision Tools Inc.",
      content: "New expected delivery date is June 15. We'll waive 15% of the order value as compensation.",
      timestamp: "Just now",
      isFromContact: true,
      read: false,
    }
  ],
  6: [
    {
      id: 1,
      sender: "You",
      content: "I'm having issues with the control software crashing during peak load simulations.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: false,
      read: true,
    },
    {
      id: 2,
      sender: "Tech Support Team",
      content: "Thank you for reporting this. We've created ticket #TICKET-2023-789 for tracking.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 3,
      sender: "Tech Support Team",
      content: "Could you please share the error logs and system specs?",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 4,
      sender: "You",
      content: "Here are the files you requested.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: false,
      read: true,
      attachment: {
        name: "error-logs.zip",
        type: "doc",
        url: "#"
      }
    },
    {
      id: 5,
      sender: "Tech Support Team",
      content: "We've identified the issue with your software - it's a memory leak in the simulation module.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
    },
    {
      id: 6,
      sender: "Tech Support Team",
      content: "The patch has been deployed to your system. Please restart the service to apply the update.",
      timestamp: "2023-06-12T10:15:00",
      isFromContact: true,
      read: true,
      reactions: { "✅": 1 }
    }
  ]
};