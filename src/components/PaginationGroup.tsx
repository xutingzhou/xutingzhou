import { getPageNumbers } from "@/lib/getPageNumbers"
import { Pagination, PaginationGap, PaginationList, PaginationNext, PaginationPage, PaginationPrevious } from "./ui/pagination"

export function PaginationGroup({ currentPage, totalPages }: {
    currentPage: number
    totalPages: number
}) {

    const pageNumbers = getPageNumbers(currentPage, totalPages)

    return (
        <Pagination className="mt-16 justify-center">
            <PaginationPrevious href={currentPage === 1 ? undefined : `?page=${currentPage - 1}`} />
            <PaginationList>
                {pageNumbers.map((pageNumber, index) => (
                    <div
                        key={`${pageNumber}-${index.toFixed()}`}
                        className="flex items-center"
                    >
                        {pageNumber === "..." ? (
                            <PaginationGap />
                        ) : (
                            <PaginationPage
                                current={pageNumber === currentPage}
                                href={`?page=${pageNumber}`}
                            >
                                <span className="sr-only">Go to page {pageNumber}</span>
                                {pageNumber}
                            </PaginationPage>
                        )}
                    </div>
                ))}

            </PaginationList>
            <PaginationNext href={currentPage === totalPages ? undefined : `?page=${currentPage + 1}`} />
        </Pagination>
    )
}