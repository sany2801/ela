import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import Default_button from '../Default_button/Default_button';
import White_button from '../White_Button/White_Button';
import close_icon from '../../images/close-square.svg'
import arrow_icon from '../../images/arrow-square-down.svg'
import search_icon from '../../images/search_icon.svg'
import black_search_icon from '../../images/black_search_icon.png'
import '../FilterItem/FilterItem.css'
import '../FilterByCost/FilterByCost.css'
import './FilterByTrackingNumber.css'

type FilterByTrackingNumberProps = {
  title: string,
  setStatus: (status: boolean) => void,
  ref: React.Ref<any>
};

const FilterByTrackingNumber: React.FC<FilterByTrackingNumberProps> = React.forwardRef(({ title, setStatus }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const handleExtended = () => {
    setIsExtended(prev => !prev);
  };

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const handleClear = () => {
    setStatus(false)
    setInputValue('')
  }

  React.useImperativeHandle(ref, () => ({
    handleClear,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(true)
    const value = e.target.value
    setInputValue(value)
  }

  const handleSearch = () => {
    //Shoulb be implemented
  }

  const handleApply = () => {
    //Shoulb be implemented
  }

  const isChanged = inputValue !== '';

  useEffect(() => {
    if (isChanged) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [inputValue])

  return (
    <>
      {!isExtended && !isChanged && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || !isExtended && isChanged) && (
        <div className='extended_filter_item'>
          {isChanged && (
            <button onClick={handleClear} className='filter_clear_btn'>
              <img src={close_icon} alt='clear' />
            </button>
          )}

          <div className='filters_name' onClick={handleExtended}>
            {title}
            <div className='vertical_line'></div>
            {isChanged ? (
              <>
                <span>{inputValue}</span>
              </>
            ) : (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            )}
          </div>
          <div style={(!isExtended && isChanged) ? { display: 'none' } : {}} id='pop'>
            <p><b>Filter by {title}:</b></p>
            <div className='fields'>
              <div id='search_wrap'>
                <img
                  onClick={handleSearch}
                  onMouseOver={handleFocus}
                  onMouseLeave={handleBlur}
                  id='srch_img'
                  src={isFocused ? black_search_icon : search_icon}
                  alt="search"
                />
                <input
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={inputValue}
                  type='number'
                  placeholder='Search'
                  name='tracking_input'
                  id="tracking_input"
                />
              </div>
              <div id='buttons_wrap'>
                <Default_button disabled={!isChanged} setState={handleApply} button_text={'Apply'} width={'100%'} height={32} />
                <White_button setState={handleClear} button_text={'Clear'} width={'100%'} height={32} />
              </div>

            </div>
          </div>
        </div >
      )}
    </>
  );
});

export default FilterByTrackingNumber;