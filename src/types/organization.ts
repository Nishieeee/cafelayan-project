export interface Program {
  id: string
  name: string
  description: string
  category: "Education" | "Collection" | "Processing" | "Community"
  status: "Active" | "Planned" | "Completed"
  startDate: string
  participants: number
  impact: string
}

export interface Volunteer {
  id: string
  name: string
  role: string
  joinDate: string
  hoursContributed: number
  avatar: string
}

export interface DonationStats {
  month: string
  received: number
  processed: number
  recycled: number
}

export interface ImpactMetric {
  label: string
  value: string
  unit: string
  trend: number
  icon: string
}

export interface Partnership {
  id: string
  brandName: string
  brandLogo: string
  type: "Official" | "Community" | "Sponsor"
  since: string
  totalDonations: number
}
export interface Tutorial {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  steps: number
  rating: number
  organization: string
  materials: string[]
  image: string
  url: string
}

export interface Organization {
  id: string
  name: string
  type: "NGO" | "Government" | "Community" | "Corporate"
  description: string
  mission: string
  avatar: string
  coverImage: string
  location: string
  city: string
  website: string
  email: string
  phone: string
  establishedDate: string
  verified: boolean
  followers: number
  volunteers: number
  totalDonationsReceived: number
  totalItemsProcessed: number
  totalPartnerships: number
  activeProgramsCount: number
  impactMetrics: ImpactMetric[]
  programs: Program[]
  tutorials: Tutorial[]
  topVolunteers: Volunteer[]
  partnerships: Partnership[]
  donationStats: DonationStats[]
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}
