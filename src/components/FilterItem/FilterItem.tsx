import React, { useEffect, useState } from 'react';
import close_icon from '../../images/close-square.svg'
import arrow_icon from '../../images/arrow-square-down.svg'
import Default_button from '../Default_button/Default_button';
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import './FilterItem.css';

type FiltersProps = {
  title: string,
  listOfFilterFields: string[],
  setStatus: React.Dispatch<React.SetStateAction<boolean>>,
  ref: React.Ref<any>
};

const FilterItem: React.FC<FiltersProps> = React.forwardRef(({ title, listOfFilterFields, setStatus }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [listOfSelected, setListOfSelected] = useState<string[]>([]);
  const [isFullForm, setIsFullForm] = useState<boolean>(false);

  const handleExtended = () => {
    setIsExtended(prev => !prev);
  };

  const handleChoose = (field: string) => {
    const updatedList = [...listOfSelected];

    if (updatedList.includes(field)) {
      updatedList.splice(updatedList.indexOf(field), 1);
    } else {
      updatedList.push(field);
    }
    setListOfSelected(updatedList);
    setIsFullForm(updatedList.length === listOfFilterFields.length);
  };

  const handleApply = () => {
    // listOfSelected contains list of selected filters
  };

  React.useImperativeHandle(ref, () => ({
    clearAll,
  }));

  const clearAll = () => {
    setListOfSelected([]);
    setIsFullForm(false);
  };

  const chooseAll = () => {
    if (isFullForm) {
      setListOfSelected([]);
    } else {
      setListOfSelected([...listOfFilterFields]);
    }
    setIsFullForm(!isFullForm);
  };

  const isChanged: boolean = !isExtended && listOfSelected.length > 0

  useEffect(() => {
    if (listOfSelected.length > 0) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [listOfSelected])


  return (
    <>
      {!isExtended && listOfSelected.length === 0 && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || isChanged) && (
        <div className='extended_filter_item'>
          {listOfSelected.length > 0 && (
            <button onClick={clearAll} className='filter_clear_btn'>
              <img src={close_icon} alt='clear' />
            </button>
          )}
          <div className='filters_name' onClick={handleExtended}>
            {title}
            <div className='vertical_line'></div>
            {listOfSelected.length === 0 ? (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            ) : (
              <>
                <span>{listOfSelected[0]}</span>
                {isFullForm ? '(All)' : listOfSelected.length > 1 && <div className='overcount'>{`+${listOfSelected.length - 1}`}</div>}
              </>
            )}
          </div>
          <div style={(!isExtended && isChanged) ? { display: 'none' } : {}} className='filter_checkboxes_wrap'>
            <p><b>Filter by {title}:</b></p>
            <div className='fields'>
              <label>
                <input
                  checked={isFullForm}
                  onChange={chooseAll}
                  type="checkbox"
                  name='All'
                  id='All'
                />
                <CustomCheckbox checked={isFullForm} />
                <span className={isFullForm ? 'checked' : ''} >All</span>
              </label>
              <div className='horizont_line'></div>
              {listOfFilterFields.map((filterField: string, i: number) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    onChange={() => handleChoose(filterField)}
                    name={filterField}
                    id={filterField}
                    checked={listOfSelected.includes(filterField)}
                  />
                  <CustomCheckbox checked={listOfSelected.includes(filterField)} />
                  <span className={listOfSelected.includes(filterField) ? 'checked' : ''} >{filterField}</span>
                </label>
              ))}
            </div>
            <Default_button
              disabled={listOfSelected.length === 0}
              setState={handleApply}
              button_text={`Apply ${isFullForm ? '(All)' : `${listOfSelected.length > 0 ? `(${listOfSelected.length})` : ''}`} `}
              width={'100%'}
              height={32}
            />
          </div>
        </div>
      )}
    </>
  );
});

export default FilterItem;
