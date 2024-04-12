import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCityData } from "../store/cardSlice";

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { temp } = useSelector(selectCityData);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(temp.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        if (currentPage > 1) {
            setCurrentPage(Math.max(1, currentPage - 10));
        } 
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (currentPage === 1) {
            setCurrentPage(Math.min(totalPages, currentPage + 9));
        } else if (currentPage < totalPages) {
            setCurrentPage(Math.min(totalPages, currentPage + 10));
        }
    };

    const handlePreviousPageFavorites = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleFirstPageFavorites = () => {
        setCurrentPage(1);
    };
    
    const handleNextPageFavorites = (totalPage) => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const handleLastPageFavorites = (totalPage) => {
        setCurrentPage(Math.min(currentPage + 9, totalPage));
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newCurrentItems = temp.slice(startIndex, endIndex);
        setCurrentItems(newCurrentItems);
    }, [temp, currentPage]);


    return [handlePreviousPage, handleLastPage, handleNextPage, handleFirstPage, currentItems, temp, setCurrentPage, currentPage, totalPages, itemsPerPage, handlePreviousPageFavorites, handleFirstPageFavorites,handleNextPageFavorites, handleLastPageFavorites]
}