export interface FilterOption {
  key: string;
  value: string;
  color?: string;
}

export interface ColumnConfig {
  name: string;
  label: string;
  action?: (row: any) => void;
  isSearchable?: boolean;
  isSortable?: boolean;
  isFilterable?: boolean;
  filterOptions?: FilterOption[];
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: string[];
}

export interface TableProps {
  columns: ColumnConfig[];
  data: any[];
  filterCallback?: (filters: FilterConfig) => void;
  searchCallback?: (searchTerm: string, selectedColumns: string[]) => void;
  onRowClick?: (row: any) => void;
  onExport?: {
    xlsx?: () => void;
    csv?: () => void;
  };
  onAdd?: () => void;
  loading?: boolean;
  pagination?: {
    enabled: boolean;
    pageSize?: number;
    currentPage?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };
  selectable?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  globalSearchPlaceholder?: string;
  className?: string;
}