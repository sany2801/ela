import React, { ChangeEvent, useEffect, useState } from 'react';
import close_icon from '../../images/close-square.svg'
import arrow_icon from '../../images/arrow-square-down.svg'
import Default_button from '../Default_button/Default_button';
import White_button from '../White_Button/White_Button';
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import '../FilterItem/FilterItem.css'
import '../FilterByCost/FilterByCost.css'
import './FilterByDate.css'

type FilterByDateProps = {
  title: string,
  setStatus: (status: boolean) => void,
  ref: React.Ref<any>
};

const FilterByDate: React.FC<FilterByDateProps> = React.forwardRef(({ title, setStatus }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  const handleExtended = () => {
    setIsExtended(prev => !prev);
  };

  const handleClear = () => {
    setDateFrom('')
    setDateTo('')
  }

  React.useImperativeHandle(ref, () => ({
    handleClear,
  }));

  const handleApply = (): void => {
    if (isValidChanged) {
      // apply filter
    }
  }

  const handleChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFrom(value)
  }

  const handleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTo(value)
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isValidChanged = regex.test(dateFrom) && regex.test(dateTo) && dateFrom < dateTo
  const targetedDateFrom = dateFrom.split('-').reverse().join('.');
  const targetedDateTo = dateTo.split('-').reverse().join('.');

  useEffect(() => {
    if (isValidChanged) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [dateFrom, dateTo])

  return (
    <>
      {!isExtended && !isValidChanged && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || !isExtended && isValidChanged) && (
        <div className='extended_filter_item'>
          {isValidChanged && (
            <button onClick={handleClear} className='filter_clear_btn'>
              <img src={close_icon} alt='clear' />
            </button>
          )}

          <div className='filters_name' onClick={handleExtended}>
            {title}
            <div className='vertical_line'></div>
            {isValidChanged ? (
              <>
                <span>{`${targetedDateFrom} - ${targetedDateTo}`}</span>
              </>
            ) : (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            )}
          </div>
          <div style={(!isExtended && isValidChanged) ? { display: 'none' } : {}} className='filter_checkboxes_wrap'>
            <p><b>Filter by {title}:</b></p>
            <div className='fields date_field'>
              <div className='date_wrap' id='inputs'>
                <div className='input_wrap'>
                  <input
                    className='date_input'
                    onChange={handleChangeFrom}
                    value={dateFrom}
                    type='date'
                    name='date_from'
                    id="date_from"
                  />
                </div>
                <div id='defis'></div>
                <div className='input_wrap'>
                  <input
                    className='date_input'
                    onChange={handleChangeTo}
                    value={dateTo}
                    type='date'
                    name='date_to'
                    id="date_to"
                  />
                </div>
              </div>
              <div id='buttons_wrap'>
                <Default_button disabled={!isValidChanged} setState={handleApply} button_text={'Apply'} width={'100%'} height={32} />
                <White_button setState={handleClear} button_text={'Clear'} width={'100%'} height={32} />
              </div>

            </div>
          </div>
        </div >
      )}
    </>
  );
});

export default FilterByDate;