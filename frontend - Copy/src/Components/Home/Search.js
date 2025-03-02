import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import {useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Search = () => {
    const {RangePicker} = DatePicker;
    const [Keyword, setKeyword] = useState({});

    // storing the date range value
    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    function searchHandler(e) {
      e.preventDefault();
      dispatch(propertyAction.updateSearchParams(Keyword));
      dispatch(getAllProperties());
      setKeyword({
        city: "",
        guests:"",
        dateIn:"",
        dateOut:"",
      });
      setValue([])
    }

    function returnDates(date, dateString){
        setValue([date[0], date[1]])
        
        updateKeyword("dateIn" ,dateString[0]);
        updateKeyword("dateOut" ,dateString[1]);
    };

    const updateKeyword = (field,value)=>{
        setKeyword((prevKeyword)=>({
            ...prevKeyword,
            [field] : value,
            
        }));
    // console.log(value)
    };
    
    
  return (
    <>
      <div className='searchbar'>
        <input type="text" className="search" id='search_destination' placeholder='Search destinations'
        value={Keyword.city}
        onChange={(e)=>updateKeyword("city",e.target.value)}
        />

        {/* Date Picker */}

        <Space direction='vertical' size={12} className='search'>
            <RangePicker
             value={value}
             format="YYYY-MM-DD"
             picker='date'
             className='date_picker'
             disabledDate = {(current)=>{
             return current && current.isBefore(Date.now(), "day");}}
             onChange={returnDates}
            />
            
        </Space>

        {/* input field for adding guests */}

        <input 
        type="number"
        className='search'
        id='addguest'
        placeholder='Add guest'
        value={Keyword.guests}
        onChange={(e)=>updateKeyword("guests", e.target.value)}
        />

        {/* search Icon */}
        <span 
        class="material-symbols-outlined searchicon"
        onClick={searchHandler}
        >
        search
        </span>
      </div>
    </>
  )
}

export default Search
