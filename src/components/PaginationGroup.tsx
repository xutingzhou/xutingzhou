import { getPageNumbers } from "@/lib/getPageNumbers"
import { Pagination, PaginationGap, PaginationList, PaginationNext, PaginationPage, PaginationPrevious } from "./ui/pagination"

export function PaginationGroup({ currentPage, totalPages, onPageChange }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}) {

    const pageNumbers = getPageNumbers(currentPage, totalPages)

    return (
        <Pagination className="mt-16 justify-center">
            <PaginationPrevious onClick={currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)} />
            <PaginationList>
                {pageNumbers.map((pageNumber, index) => (
                    <div
                        key={`${pageNumber}-${index.toFixed()}`}
                        className="flex items-center"
                    >
                        {typeof pageNumber === "string" ? (
                            <PaginationGap />
                        ) : (
                            <PaginationPage
                                current={pageNumber === currentPage}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                <span className="sr-only">Go to page {pageNumber}</span>
                                {pageNumber}
                            </PaginationPage>
                        )}
                    </div>
                ))}

            </PaginationList>
            <PaginationNext onClick={currentPage === totalPages ? undefined : () => onPageChange(currentPage + 1)} />
        </Pagination>
    )
}