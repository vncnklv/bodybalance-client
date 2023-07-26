/* eslint-disable react/prop-types */
export default function Pager({ page, nextPage, goToPage }) {
    const goToNextPage = () => {
        goToPage(page + 1);
    }

    const goToPrevPage = () => {
        goToPage(page - 1);
    }

    return (
        <div className="flex items-center justify-center py-4">
            {page > 1 && <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={goToPrevPage}>Previous</span>}
            <span className="text-xl px-2">{page}</span>
            {nextPage && <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={goToNextPage}>Next</span>}
        </div>
    );
}