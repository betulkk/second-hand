import { useState } from 'react';
import { BiSort } from "react-icons/bi";


const SortButton = ({ onSort }: { onSort: (order: 'ascending' | 'descending') => void }) => {
    const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending');

    const handleSort = () => {
        const newSortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        setSortOrder(newSortOrder);
        onSort(newSortOrder);
    };

    return (
        <button onClick={handleSort} className="flex items-center justify-center gap-2 text-[#f6ae82] bg-white px-4 py-2 ">
            <BiSort />
            {sortOrder === 'ascending' ? 'Fiyata Göre Azalan' : 'Fiyata Göre Artan'}
        </button>
    );
};

export default SortButton;
