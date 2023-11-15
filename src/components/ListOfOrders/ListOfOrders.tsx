import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import diagonal_cross_icon from '../../images/diagonal_cross_icon.svg'
import FilterItem from '../FilterItem/FilterItem';
import FilterByCost from '../FilterByCost/FilterByCost';
import FilterByDate from '../FilterByDate/FilterByDate';
import FilterByTrackingNumber from '../FilterByTrackingNumber/FilterByTrackingNumber';
import './ListOfOrders.css'

type OrderType = {
  role: string;
  type: string;
  tracking_number: number;
  from: string;
  to: string;
  order_date: string;
  cost: number;
  status: string;
};

const roleFields = ['Sender', 'Recipient', 'Payer']
const typeFields = ['Parcel', 'Moving']
const statusFields = ['New', 'In progress', 'Awaiting payment', 'Paid', 'Accepted', 'In transit', 'Complete', 'Failed']

const mockData: OrderType[] = [
  {
    role: 'Sender',
    type: 'Parcel',
    tracking_number: 99283749843,
    from: 'Toronto',
    to: 'Ontario',
    order_date: '15/08/2023',
    cost: 20,
    status: 'Paid',
  },
  {
    role: 'Reciever',
    type: 'Parcel',
    tracking_number: 34598679348,
    from: 'Washington',
    to: 'Chicago',
    order_date: '20/08/2023',
    cost: 250,
    status: 'Failed',
  },
  {
    role: 'Payer',
    type: 'Moving',
    tracking_number: 9874057983,
    from: 'Ohyio',
    to: 'London',
    order_date: '10/09/2023',
    cost: 100,
    status: 'New',
  },
  {
    role: 'Payer',
    type: 'Parcel',
    tracking_number: 14346457568,
    from: 'Brussel',
    to: 'Milan',
    order_date: '05/12/2023',
    cost: 50,
    status: 'Complete',
  },
];

type ListOfOrdersProps = {};

const ListOfOrders: React.FC<ListOfOrdersProps> = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderType>('role');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isRoleChanged, setIsRoleChanged] = useState<boolean>(false)
  const [isTypeChanged, setIsTypeChanged] = useState<boolean>(false)
  const [isDateChanged, setIsDateChanged] = useState<boolean>(false)
  const [isCostChanged, setIsCostChanged] = useState<boolean>(false)
  const [isStatusChanged, setIsStatusChanged] = useState<boolean>(false)
  const [isTrackingChanged, setIsTrackingChanged] = useState<boolean>(false)
  const filterRoleRef = React.useRef<{ clearAll: () => void } | null>(null);
  const filterTypeRef = React.useRef<{ clearAll: () => void } | null>(null);
  const filterStatusRef = React.useRef<{ clearAll: () => void } | null>(null);
  const filterCostRef = React.useRef<{ handleClear: () => void } | null>(null);
  const filterDateRef = React.useRef<{ handleClear: () => void } | null>(null);
  const filterTrackingRef = React.useRef<{ handleClear: () => void } | null>(null);

  const handleRequestSort = (property: keyof OrderType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClearAll = () => {
    if (filterRoleRef.current) {
      filterRoleRef.current.clearAll();
    }
    if (filterTypeRef.current) {
      filterTypeRef.current.clearAll();
    }
    if (filterStatusRef.current) {
      filterStatusRef.current.clearAll();
    }
    if (filterCostRef.current) {
      filterCostRef.current.handleClear();
    }
    if (filterDateRef.current) {
      filterDateRef.current.handleClear();
    }
    if (filterTrackingRef.current) {
      filterTrackingRef.current.handleClear();
    }
  }

  function getStatusClassName(status: string) {
    switch (status) {
      case 'New':
        return 'status_new';
      case 'In progress':
        return 'statu_in_progress';
      case 'Awaiting payment':
        return 'status_awaiting_payment';
      case 'Paid':
        return 'status_paid';
      case 'Accepted':
        return 'status_accepted';
      case 'In transit':
        return 'status_in_transit';
      case 'Complete':
        return 'status_complete';
      case 'Failed':
        return 'status_failed';
      default:
        return '';
    }
  }

  const sortedData = stableSort(mockData, getComparator(order, orderBy));
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const isSomethingChanged = isRoleChanged || isTypeChanged || isDateChanged || isCostChanged || isStatusChanged || isTrackingChanged

  return (
    <>
      <div id='filters_wrap'>
        <FilterItem ref={filterRoleRef} setStatus={setIsRoleChanged} listOfFilterFields={roleFields} title={'Role'} />
        <FilterItem ref={filterTypeRef} setStatus={setIsTypeChanged} listOfFilterFields={typeFields} title={'Type'} />
        <FilterByDate ref={filterDateRef} setStatus={setIsDateChanged} title={'Date'} />
        <FilterByCost ref={filterCostRef} setStatus={setIsCostChanged} title={'Cost'} />
        <FilterItem ref={filterStatusRef} setStatus={setIsStatusChanged} listOfFilterFields={statusFields} title={'Status'} />
        <FilterByTrackingNumber ref={filterTrackingRef} setStatus={setIsTrackingChanged} title={'Tracking Number'} />
        {isSomethingChanged && (
          <div onClick={handleClearAll} id='clear_btn'>
            <img src={diagonal_cross_icon} alt="clear" />
            <span>Clear filters</span>
          </div>
        )}
      </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'role'}
                    direction={orderBy === 'role' ? order : 'asc'}
                    onClick={() => handleRequestSort('role')}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={() => handleRequestSort('type')}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'tracking_number'}
                    direction={orderBy === 'tracking_number' ? order : 'asc'}
                    onClick={() => handleRequestSort('tracking_number')}
                  >
                    Tracking number
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'from'}
                    direction={orderBy === 'from' ? order : 'asc'}
                    onClick={() => handleRequestSort('from')}
                  >
                    From
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'to'}
                    direction={orderBy === 'to' ? order : 'asc'}
                    onClick={() => handleRequestSort('to')}
                  >
                    To
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'order_date'}
                    direction={orderBy === 'order_date' ? order : 'asc'}
                    onClick={() => handleRequestSort('order_date')}
                  >
                    Order date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'cost'}
                    direction={orderBy === 'cost' ? order : 'asc'}
                    onClick={() => handleRequestSort('cost')}
                  >
                    Cost
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.tracking_number}>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.tracking_number}</TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.to}</TableCell>
                  <TableCell>{row.order_date}</TableCell>
                  <TableCell>{row.cost}&nbsp;$</TableCell>
                  <TableCell><div className={getStatusClassName(row.status)}>{row.status}</div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={mockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return (a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  };
}

export default ListOfOrders;
