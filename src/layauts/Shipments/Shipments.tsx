import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Default_button from '../../components/Default_button/Default_button';
import ListOfOrders from '../../components/ListOfOrders/ListOfOrders';
import './Shipments.css'

type TabPanelProps = {
  children?: React.ReactNode,
  index: number,
  value: number,
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box >
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type ShipmentsProps = {};

const Shipments: React.FC<ShipmentsProps> = ({ }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNewOrder = () => {

  }

  return (
    <div className='page_wrap'>
      <div id='shipments_header'>
        <h2>Shipments</h2>
        <Default_button setState={handleNewOrder} button_text={'New order'} width={140} height={32} />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#CFCFCF' }}>
          <Tabs id='tabs_wrap' value={value} onChange={handleChange} aria-label="tabs">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Active" {...a11yProps(1)} />
            <Tab label="Drafts" {...a11yProps(2)} />
            <Tab label="Archive" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ListOfOrders />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Active
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Drafts
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Archive
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Shipments;