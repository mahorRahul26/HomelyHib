import React, { useEffect, useState } from 'react'
import FilterModal from './FilterModal';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Filter = () => {
    // state for controllig modal visability
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for storing selected filter
    const [selectedFilter, setSelectedFilter] = useState({});
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(propertyAction.updateSearchParams(selectedFilter));
        dispatch(getAllProperties());
    },[selectedFilter,dispatch])

    // Function to handle opening the modal/popup window

    const handleOpenModal =()=>{
        setIsModalOpen(true); // sets isModalOpen to true
    };
    // Function to handle closing the modal/popup window
    const handleCloseModal =()=>{
        setIsModalOpen(false); 
    };

    // Function to handle changes if filter
    const handleFilterChange = (FilterName,value)=>{
        setSelectedFilter((prevFilters)=>({
            ...prevFilters,
            [FilterName]: value,
        }));
    };

  return (
    <>
        <span class="material-symbols-outlined filter" onClick={handleOpenModal}>tune</span> 
        {isModalOpen && (
            <FilterModal
            selectedFilters={selectedFilter}
            onFilterChange={handleFilterChange}
            onClose={handleCloseModal}
            />
            
        )}
    </>
  )
}

export default Filter
