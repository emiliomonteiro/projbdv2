// src/types/dashboard.ts
export interface KPI {
    totalRevenue: string;
    revenueChange: number;
    activeRentals: string;
    rentalsChange: number;
    newCustomers: string;
    customersChange: number;
    avgRentalDuration: string;
    durationChange: number;
  }
  
  export interface SalesTrendItem {
    month: string;
    revenue: number;
  }
  
  export interface TopProductItem {
    name: string;
    rentals: number;
    revenue: number;
  }
  
  export interface CustomerSegmentItem {
    name: string;
    percentage: number;
  }
  
  export interface RevenueByLocationItem {
    city: string;
    revenue: number;
  }
  
  export interface DashboardData {
    kpis: KPI;
    salesTrend: SalesTrendItem[];
    topProducts: TopProductItem[];
    customerSegments: CustomerSegmentItem[];
    revenueByLocation: RevenueByLocationItem[];
  }