/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import ReactTable from 'react-table-6/react-table.min';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import { getPhotoFunc, getDaysLeft } from '../App';

// set width to table colums by .className size
function widthForTable(value) {
  return Math.round(window.innerWidth * (value / 100))
}

const TablePageShort = (props) => {
  const {pageNum } = useParams();
  const history = useHistory();

  // TODO Another CRAP => can't change page in path => get path from history and del number 
  const path = history.location.pathname.replace(/[0-9]/g, '');


  // some obj for table => don't repeat photo and name column 
  const leadObj = {
    Header: 'Дата первого контакта',
    accessor: 'rent',
    width: widthForTable(25),
    headerClassName: 'tableHeader',
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
    }
  }
  const employeeObj = {
    Header: 'Депозит',
    width: widthForTable(25),
    accessor: 'deposite',
    headerClassName: 'tableHeader'
  }
  const lostObj = {
    Header: 'Срок действия последнего абонемента',
    accessor: 'days',
    width: widthForTable(25),
    headerClassName: 'tableHeader',
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
    }
  }

  let tableRow = {};
  if (props.tableType === 'ЛИД') tableRow = leadObj;
  if (props.tableType === 'СОТРУДНИК') tableRow = employeeObj;
  if (props.tableType === 'НЕТ') tableRow = lostObj;


  return (
    <div className="table font_white_shadow">
      <ReactTable
        className="-striped -highlight"
        page={parseInt(pageNum,10)-1}
        onPageChange={(pageIndex) => {history.push(path + (pageIndex+ 1))}} 
        previousText="Назад"
        nextText="Вперед"
        loadingText="Загрузка"
        noDataText="Нет данных"
        pageText="Страница"
        ofText="из"
        rowsText="профилей"
        data={(JSON.parse(props.personData)).filter(obj => { return obj.contract === props.tableType })}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
        columns={[
          {
            Header: 'Фото',
            width: widthForTable(25),
            headerClassName: 'tableHeader',
            Cell: (value) => (
              <button type="button" onClick={() => history.push(`/profile/${  value.original.code}`)}><img id="tablePhoto" alt="tablePhoto" height={80} src={getPhotoFunc(value.original.photoId)} /></button>)
          },
          {
            Header: 'Имя',
            id: 'rowCode',
            width: widthForTable(50),
            style: { whiteSpace: 'unset' },
            headerClassName: 'tableHeader',
            filterMethod: (filter, row) => {
              const name = row._original.personName;
              const {code} = row._original;
              if (name.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
              if (code.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
              if (name.includes(" ")) { // sort by first name
                if (name.toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) return true;
              }
            },
            Cell: (value) => (<Link to={`/profile/${value.original.code}`}>{value.original.personName}</Link>)
          },
          tableRow
        ]}
        defaultSorted={[{ id: 'personName', desc: false }]}
        defaultPageSize={5}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(TablePageShort);