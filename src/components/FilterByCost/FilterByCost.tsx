import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import close_icon from '../../images/close-square.svg'
import arrow_icon from '../../images/arrow-square-down.svg'
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import Default_button from '../Default_button/Default_button';
import White_button from '../White_Button/White_Button';
import '../FilterItem/FilterItem.css'
import './FilterByCost.css'

type FilterByCostProps = {
  title: string,
  setStatus: (status: boolean) => void
  ref: React.Ref<any>
};

const FilterByCost: React.FC<FilterByCostProps> = React.forwardRef(({ title, setStatus }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [costRange, setCostRange] = React.useState<number[]>([0, 10000]);

  const handleChange = (e: Event, newCostRange: number | number[]) => {
    setCostRange(newCostRange as number[]);
  };

  const handleChangeFrom = () => {
    const inputFrom = document.querySelector('#value_from');
    const value = +(inputFrom as HTMLInputElement).value;
    if (value >= 0 && value <= 10000 && value < (costRange[1] ?? 10000)) {
      setCostRange((prev: number[]) => {
        return [value, prev[1]];
      });
    }
  };

  const handleChangeTo = () => {
    const inputFrom = document.querySelector('#value_to');
    const value = +(inputFrom as HTMLInputElement).value;
    if (value >= 0 && value <= 10000 && value > (costRange[0] ?? 0)) {
      setCostRange((prev: number[]) => {
        return [prev[0], value];
      });
    }
  };

  const handleExtended = () => {
    setIsExtended(prev => !prev);
  };

  const handleClear = () => {
    setCostRange([0, 10000])
  }

  React.useImperativeHandle(ref, () => ({
    handleClear,
  }));

  const handleApply = () => {
    // shoud be implemented
  }

  const notDefaultState: boolean = costRange[0] !== 0 || costRange[1] !== 10000;

  useEffect(() => {
    if (notDefaultState) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [costRange])


  return (
    <>
      {!isExtended && !notDefaultState && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || !isExtended && notDefaultState) && (
        <div className='extended_filter_item'>
          {notDefaultState && (
            <button onClick={handleClear} className='filter_clear_btn'>
              <img src={close_icon} alt='clear' />
            </button>
          )}

          <div className='filters_name' onClick={handleExtended}>
            {title}
            <div className='vertical_line'></div>
            {notDefaultState ? (
              <>
                <span>{`${costRange.at(0)}$ - ${costRange.at(1)}$`}</span>
              </>
            ) : (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            )}
          </div>
          <div style={(!isExtended && notDefaultState) ? { display: 'none' } : {}} className='filter_checkboxes_wrap'>
            <p><b>Filter by {title}:</b></p>
            <div className='fields'>
              <Box sx={{ width: 260, marginLeft: 'auto', marginRight: 'auto' }}>
                <Slider
                  getAriaLabel={() => 'Cost range'}
                  value={costRange}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000}
                  classes={{
                    root: 'my-slider',
                    rail: 'my-slider-rail',
                    track: 'my-slider-track',
                    thumb: 'my-slider-thumb',
                  }}
                />
              </Box>
              <div className='cost_inputs' id='inputs'>
                <div className='input_wrap'>
                  <span className='dollar'>$</span>
                  <input
                    className='cost_value'
                    value={costRange[0]}
                    onChange={handleChangeFrom}
                    type="number"
                    name='value_from'
                    id="value_from"
                  />
                  <span>Minimal cost</span>
                </div>
                <div id='defis'></div>
                <div className='input_wrap'>
                  <span className='dollar'>$</span>
                  <input
                    className='cost_value'
                    value={costRange[1]}
                    onChange={handleChangeTo}
                    type="number"
                    name='value_to'
                    id="value_to"
                  />
                  <span>Maximum cost</span>
                </div>
              </div>
              <div id='buttons_wrap'>
                <Default_button setState={handleApply} button_text={'Apply'} width={'100%'} height={32} />
                <White_button setState={handleClear} button_text={'Clear'} width={'100%'} height={32} />
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default FilterByCost;
