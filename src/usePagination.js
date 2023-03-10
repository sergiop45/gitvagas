export default function usePagination ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) {
    const paginationRange = useMemo(() => {

        const totalPageCount = Math.ceil(totalCount / pageSize);

        const range = (start, end) => {
            let length = end - start + 1;
            /*
                Cria um array de determinado tamanho e define os elementos dentro do valor de início (start) e de fim (end).
            */
            return Array.from({ length }, (_, idx) => idx + start);
          };

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}