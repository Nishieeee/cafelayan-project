export interface Product {
  id: string
  name: string
  brand: string
  material: string
  category: string
  status: "Active" | "Draft" | "Inactive"
  registrationDate: string
  totalScans: number
  totalDonations: number
  conversionRate: number
  lastScan: string
  image: string
  recyclability: string
}

export interface Organization {
  name: string
  donations: number
  city: string
  partnership: "Official" | "Community"
}

export interface MonthlyData {
  month: string
  scans: number
  donations: number
}

export interface ProductType {
  name: string
  value: number
  color: string
}
export interface ProjectType {
  id: string
  title: string
  cover: string
  description: string
  dateStarted: string
}
export interface Achievement {
  name: string
  description: string
  icon: string
  earned: boolean
}

export interface SocialMedia {
  instagram: string
  twitter: string
  facebook: string
  shop: string
}

export interface Brand {
  id: string
  name: string
  username: string
  description: string
  avatar: string
  coverImage: string
  location: string
  website: string
  joinDate: string
  verified: boolean
  followers: number
  following: number
  totalProducts: number
  totalDonations: number
  totalScans: number
  partneredOrganizations: number
  activeCities: number
  sustainabilityScore: number
  co2Saved: string
  waterSaved: string
  itemsRecycled: number
  wasteReduced: string
  projects: ProjectType[] | null
  products: Product[]
  achievements: Achievement[]
  socialMedia: SocialMedia
}

export interface BrandDashboard {
  name: string
  logo: string
  totalProducts: number
  totalDonations: number
  totalScans: number
  partneredOrganizations: number
  activeCities: number
  monthlyData: MonthlyData[]
  topOrganizations: Organization[]
  productTypes: ProductType[]
}

export interface BrandProducts {
  name: string
  products: Product[]
}

export interface CityData {
  city: string
  scans: number
  donations: number
  percentage: number
}
