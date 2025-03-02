import React,{useEffect, useState} from 'react';
import PropTypes from "prop-types";
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css" //importing CSS file for input range styling
import InputRange from 'react-input-range';

const FilterModal = ({selectedFilters,onFilterChange, onClose}) => {
    const [priceRange, setPriceRange] = useState({
        min:selectedFilters.priceRange?.min ||600,
        max:selectedFilters.priceRange?.max ||30000,
    })

    const [propertyType , setPropertyType] = useState(selectedFilters.propertyType || "");
    const [roomType , setRoomType] = useState(selectedFilters.roomType || "");
    const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

    // useEffect hook to update states when selectFilters prop change
    useEffect(()=>{
        setPriceRange({
            min: selectedFilters.priceRange?.min || 600,
            max: selectedFilters.priceRange?.max || 30000,
        });

        setPropertyType(selectedFilters.propertyType || "");
        setRoomType(selectedFilters.roomType || "");
        setAmenities(selectedFilters.amenities || []);
    }, [selectedFilters]);

    // function to handle the price range
    const handelPriceRange=(value)=>{
        setPriceRange(value) // it will update the price range state
    }

    // function o handle minimum value
    const handleMinInputChange = (e)=>{
        const minValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({...prev, min: minValue}));
    }
    const handleMaxInputChange =(e)=>{
        const maxValue = parseInt(e.target.value ,10);
        setPriceRange((prev) => ({...prev, max: maxValue}));
    }

    // function to handle applying filter
    const handleFilterChange=()=>{
        onFilterChange("minPrice", priceRange.min);
        onFilterChange("maxPrice", priceRange.max);
        onFilterChange("propertyType", propertyType);
        onFilterChange("roomType", roomType);
        onFilterChange("amenities", amenities);
        onClose(); // close the modal
    };

    // option for Property types
    const propertyTypeOptions =[
        {
          value : "House",
          label : "House",
          icon : "home",
        },
        {
          value : "Flat",
          label : "Flat",
          icon : "apartment",
        },
        {
          value : "Guest House",
          label : "Guest House",
          icon : "hotel",
        },
        {
          value : "Hote;",
          label : "Hotel",
          icon : "meeting_room",
        },
      ];
  
      // option for room types
      const roomTypeOptions =[
        {
          value: "Entire Room",
          label:"Entire Room",
          icon: "hotel",
        },
        {
          value:'Room',
          label:"Room",
          icon:"meeting_room"
        },
        {
          value:"AnyType",
          label:"AnyType",
          icon:"apartment",
        },
      ];
      
      // option for aminities
      const amentiesOptions=[
        {
          value:"wifi",
          label:"WIFI",
          icon:"wifi",
        },
        {
          value:"Kitchen",
          label:"Kitchen",
          icon:"kitchen",
        },
        {
          value:"Ac",
          label:"AC",
          icon:"ac_unit",
        },
        {
          value:"Washing Machine",
          label:"Washing Machine",
          icon:"local_laundry_service",
        },
        {
          value:"Tv",
          label:"Tv",
          icon:"tv",
        },
        {
          value:"Pool",
          label:"Pool",
          icon:"pool",
        },
        {
          value:"Free Parking",
          label:"Free Parking",
          icon:"local_parking",
        },
      ];
  
      // function to handle clearing Filter
      const handleClearFilter=()=>{
        setPriceRange({min:600, max:30000}); // reset the price range
        setPropertyType("");
        setRoomType("");
        setAmenities([]);
      };

    //   function to changes the amineties
    const handleAminitiesChange=(selectedAminity)=>{
        setAmenities((prevAminities)=>prevAminities.includes(selectedAminity) ? prevAminities.filter((item)=>item!==selectedAminity) : [...prevAminities, selectedAminity]);
    };

    // function to handle changes in proparty type

    const handlePropertyTypeChange = (selectedType)=>{
        setPropertyType((prevType)=>prevType === selectedType ? "" :selectedType);
    };

    // function to handle changes in room type

    const handleRoomsTypeChange = (selectedType)=>{
      setRoomType((prevType)=>prevType === selectedType ? "" :selectedType);
    };

  return (
    <div className='modal-backdrop'>
        <div className="modal-content">
            <h4>
                Filters <hr />
            </h4>
            {/* close button */}
            <button className='close-button' onClick={onClose}>
                <span>&times;</span> 
            </button>

        {/* Filer Section */}
            <div className="modal-filters-container">
                <div className="filter-section">
                    <label>Price range:</label>  
                    <InputRange
                        minValue={600}
                        maxValue={30000}
                        value={priceRange}
                        onChange={handelPriceRange}
                    />
                    <div className="range-inputs">
                        <input type="number"
                        value={priceRange.min}
                        onChange={handleMinInputChange} />
                        <span>-</span>
                        <input type="number"
                        value={priceRange.max}
                        onChange={handleMaxInputChange} />
                        
                    </div>
                </div>   

                {/* Property Type filter  */}
                <div className='filter-section'>
                    <label>Property Type :</label>
                    <div className='icon-box'>
                        {propertyTypeOptions.map((options)=>(
                            <div key={options.value} className={`selectable-box ${propertyType === 
                                options.value ? "selected" : ""}`}
                            onClick={()=>handlePropertyTypeChange(options.value)}
                            >
                                <span className="material-icons">{options.icon}</span>
                                <span>{options.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Room type filter  */}
                <div className="filter-section">
                  <label>Room Type :</label>
                  <div className='icon-box'>
                        {roomTypeOptions.map((options)=>(
                          <div key={options.value} className={`selectable-box ${roomType === 
                                options.value ? "selected" : ""}`}
                            onClick={()=>handleRoomsTypeChange(options.value)}
                            >
                                <span className="material-icons">{options.icon}</span>
                                <span>{options.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Amenities filter  */}

                 <div className="filter-section">
                  <label>Amenities :</label>
                  <div className="amenities-checkboxes">
                    {amentiesOptions.map((option)=>(
                      <div key={option.value} className='amenity-checkbox' >
                        {console.log(amenities.includes(option.value))}

                        <input 
                        type="checkbox"
                        value={option.value}
                        checked={amenities.includes(option.value)}
                        onChange={()=> handleAminitiesChange(option.value)} />

                        <span className='material-icons amenitieslabel'>
                          {option.icon}
                        </span>
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                 </div>

                 {/* filter action for button  */}

                 <div className="filter-buttons">
                  <button className="clear-button " onClick={handleClearFilter}>CLEAR</button>
                  <button onClick={handleFilterChange}>Apply Filter</button>
                 </div>
                 

            </div>    
        </div>
      
    </div>
  );
};

FilterModal.propTypes =
{
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal
