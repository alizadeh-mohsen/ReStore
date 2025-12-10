import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/PaginatedResponose";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}


export default function PaginationComponent({ metaData, onPageChange }: Props) {
    const { currentPage, totalCount, totalPages, pageSize } = metaData
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent='space-between'>
            <Typography>
                Dispaly {(currentPage - 1) * pageSize + 1}
                -
                {currentPage * pageSize > totalCount
                    ? totalCount : currentPage * pageSize
                } of {totalCount} items
            </Typography>
            <Pagination
                count={totalPages}
                size='large'
                color="secondary"
                page={currentPage}
                onChange={(e, page) => {
                    onPageChange(page);
                }}
            />
        </Box>
    )
}
