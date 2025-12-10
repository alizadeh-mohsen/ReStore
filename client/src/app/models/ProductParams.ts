export interface ProdcutsParams {
    searchTerm?: string;
    orderBy: string;
    types?: string[];
    brands?: string[];
    pageNumber: number;
    pageSize: number;
}