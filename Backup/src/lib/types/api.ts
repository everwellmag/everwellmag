export interface GetArticlesParams {
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
    populate?: string; // Thêm populate
    'filters[categories][slug][$eq]'?: string;
}

export interface GetProductsParams {
    'pagination[page]'?: number;
    'pagination[pageSize]'?: number;
    sort?: string;
    populate?: string; // Thêm populate
    'filters[categories][slug][$eq]'?: string;
}