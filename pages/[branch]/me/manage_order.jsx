import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import _, { isNil } from 'lodash';
import useUserFetchCurrentUser from '../../../hooks/user/useUserFetchCurrentUser';
import DefaultLayout from '../../../layouts/DefaultLayout';
import TheHeader from '../../../components/header/TheHeader';
import TheFooter from '../../../components/footer/TheFooter';
import usePageOnLoad from '../../../hooks/page/usePageOnLoad';
import ManagementSide from '../../../components/pageSection/profile/ManagmentSide';
import DatePicker from 'react-datepicker';
import ReactPaginate from 'react-paginate';
import DateConvert from '../../../utils/DateConvert';
import axios from '../../../lib/axios';
import i18n from '../../../i18n/i18n';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const getSettings = async () => {
  try {
    const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getServerSideProps(context) {
  const branchId = context.params.branch;
  const settings = await getSettings();
  // get brach
  const { branches } = settings;
  const currentBranch = branches.filter(
    (branch) => branch.id.toString() === branchId,
  )[0];

  return {
    props: {
      settings,
      currentBranch,
    },
  };
}

export default function Index(props) {
  const { currentBranch } = props;
  useUserFetchCurrentUser();
  usePageOnLoad(props);

  const [dateValue, setDateValue] = useState('');
  const [totalPages, setTotalPage] = useState();
  const [selectedPage, setSelectedPage] = useState(0);
  const [skipCount, setSkipCount] = useState(0);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [fromDateString, setFromDateString] = useState('');
  const [toDateString, setToDateString] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState('All');
  const [noData, setNoData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [starValue, setStarValue] = useState({});
  const [comment, setComment] = useState({});
  const [idStarValueGroup, setIdStarValueGroup] = useState({});

  const getOrderHistory = async () => {
    try {
      const url = `/customer/web/checkout-service/orders?MaxResultCount=5&SkipCount=${skipCount}&status=${status}&isIncludeFeedback=true&startDate=${fromDateString}&endDate=${toDateString}`;
      const response = await axios.get(url);
      setOrderHistoryData(response.data.result.items);
      setTotalCount(response.data.result.totalCount);
      console.log(response.data.result, 'orderhistoryresult');
      let page = Math.ceil(response.data.result.totalCount / 5);
      setTotalPage(page);
      if (response.data.result.items) {
        setTimeout(
          function () {
            setNoData(true);
          },
          [3000],
        );
      }
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, [currentPage]);

  const hrefBuilder = (page) => {
    // const query = queryString.stringify({
    // 	initialCurrentPage: page
    // });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSkipCount(page * 5);
    getOrderHistory(page);
    // let searchString = `?initialCurrentPage=${page}`
    // window.history.replaceState(null, null, searchString);
  };

  const fromDateChange = (date) => {
    if (date == null) {
      setFromDateString('');
      setFromDate('');
      return;
    }
    let fromdate =
      date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
    setFromDateString(fromdate);
    setFromDate(date);
  };

  const toDateChange = (date) => {
    if (date == null) {
      setToDateString('');
      setToDate('');
      return;
    }
    let todate =
      date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
    setToDateString(todate);
    setToDate(date);
  };

  const searchWithDate = (e) => {
    e.preventDefault();
    getOrderHistory();
  };

  const getStatus = (e) => {
    setStatus(e.target.value);
  };

  const changeStarFeedback = (e, newValue) => {
    let parentName = e.target.parentElement.parentElement.parentElement.getAttribute(
      'name',
    );
    setStarValue((prevState) => ({
      ...prevState,
      [e.target.name]: newValue,
    }));
    if (idStarValueGroup[parentName]) {
      if (idStarValueGroup[parentName].indexOf(e.target.name) < 0)
        setIdStarValueGroup({
          ...idStarValueGroup,
          [parentName]: [...idStarValueGroup[parentName], e.target.name],
        });
    } else {
      setIdStarValueGroup({
        ...idStarValueGroup,
        [parentName]: [e.target.name],
      });
    }
  };

  const commentChange = (e) => {
    let name = e.target.name;
    setComment({
      ...comment,
      [name]: e.target.value,
    });
    console.log(comment);
  };

  const submitFeedback = async (e) => {
    debugger;
    let orderItem = e.target.name;
    let commentOfItem = comment[orderItem];
    let keys = idStarValueGroup[orderItem];
    let values = [];
    keys.map((key) => values.push(starValue[key]));
    var result = {};
    keys.forEach((key, i) => (result[key] = values[i]));
    let url = `customer/web/checkout-service/orders/${orderItem}/feedback`;
    try {
      let res = await axios.post(url, {
        Rating: result,
        Comment: commentOfItem,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DefaultLayout>
      <TheHeader />
      <ManagementSide currentBranch={currentBranch} pathurl={'manage_order'}>
        <section>
          <div className="order-right">
            <form
              className="search-order search-order-history"
              onSubmit={searchWithDate}
            >
              <div className="search-item">
                <label>Status</label>
                <div className="select-box relative">
                  <select className="baris-blank" onChange={getStatus}>
                    <option>All</option>
                    <option>Pending</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                  <span className="arrow-abs ti-angle-down"></span>
                </div>
              </div>
              <div className="search-item search-date">
                <label>From Date</label>
                <div className="input-group date">
                  <DatePicker
                    className="baris-blank"
                    placeholderText="MM/DD/YYYY"
                    selected={fromDate}
                    onChange={fromDateChange}
                  />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
              <div className="search-item search-date">
                <label>To Date</label>
                <div className="input-group date">
                  <DatePicker
                    className="baris-blank"
                    placeholderText="MM/DD/YYYY"
                    selected={toDate}
                    onChange={toDateChange}
                  />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
              <div className="search-item search-item-button ">
                <label> </label>
                <button className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center">
                  SEARCH
                </button>
              </div>
            </form>
            {/* {orderHistoryData.length == 0 && <div className="no-found">No transaction has been found !</div>} */}
          </div>
          {orderHistoryData.length === 0 ? (
            noData ? (
              <div
                className="order-right order-track"
                style={{ textAlign: 'center' }}
              >
                There is No Data!
              </div>
            ) : (
              <div className="order-right order-track">
                <div className="search-order flex-center-between">
                  <span className="ordertype-shine shine"></span>
                  <div className="search-item flex-center">
                    <div className="select-box relative mgr-15">
                      <div className="btn-h46-shine shine"></div>
                    </div>
                    <div className="select-box relative mgr-15">
                      <div className="btn-h46-shine shine"></div>
                    </div>
                    <div className="select-box relative">
                      <div className="btn-h46-shine shine"></div>
                    </div>
                  </div>
                </div>
                <div className="post-review">
                  <div className="review-author flex">
                    <span className="img-circle-shine mgr-15 shine">
                      <img alt="" title="" />{' '}
                    </span>
                    <div className="author-info">
                      <h2 className="star-rate-shine shine"></h2>
                      <br />
                      <div className="star-rate-shine shine"></div>
                    </div>
                  </div>
                  <div className="post-comment-shine flex-center mgb-30 shine"></div>
                </div>
              </div>
            )
          ) : (
            orderHistoryData.map((data) => (
              <div className="order-right order-track">
                <div className="search-order flex-center-between">
                  <span className="font-14 font-demi">
                    <p>Order : {data.id}</p>
                    {DateConvert(data.creationTime)}
                  </span>
                  <div className="search-item flex-center">
                    <div className="select-box relative mgr-15">
                      {data.isPaid ? (
                        <div className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center">
                          Paid
                        </div>
                      ) : (
                        <div className="btn btn-h46 btn-red font-demi font-12  inflex-center-center text-white">
                          Not Paid
                        </div>
                      )}
                    </div>
                    <div className="select-box relative mgr-15">
                      <div className="btn btn-h46 font-demi font-12  inflex-center-center">
                        {`${data.currency} ` + ` ${data.finalAmount}`}
                      </div>
                    </div>
                    <div className="select-box relative">
                      <div className="btn btn-h46 btn-blue font-demi font-12  inflex-center-center text-white">
                        {data.paymentType}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-review">
                  <div className="review-author flex">
                    {data.orderItems.map((item, index) => {
                      return (
                        <>
                          <span className="img-circle-60 mgr-15">
                            <img src={data.image} alt="" title="" />{' '}
                          </span>
                          <div className="author-info">
                            <h2 className="font-20 font-demi">
                              {item.mealName} - {item.mealPriceName}
                            </h2>
                            <div className="star-rate" name={data.id}>
                              {data.status === 'Completed' && (
                                <Box
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <Rating
                                    name={item.id}
                                    value={data.feedback? data.feedback.Rating[data.orderItems[index].id]: starValue[item.id]}
                                    onChange={changeStarFeedback}
                                  />
                                </Box>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  {data.status !== 'Completed' ? (
                    <div className="flex-center mgb-30">
                      <div className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center track-order-button">
                        TRACK ORDER
                      </div>
                    </div>
                  ) : (
                    <div className="post-comment flex-center mgb-30">
                      <span className="img-circle mgr-15">
                        <img src="/images/picture/user.png" alt="" title="" />{' '}
                      </span>
                      <div className="label-top relative">
                        <label>Comment</label>
                        <button
                          className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center submit-button"
                          name={data.id}
                          onClick={submitFeedback}
                        >
                          SUBMIT
                        </button>
                        <input
                          name={data.id}
                          className="input-radius h56"
                          value={data.feedback? data.feedback.Comment: comment[data.id]}
                          onChange={commentChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {totalCount > 5 && (
            <div className="order-right">
              <div style={{ height: '50px' }}></div>
              {totalPages > 0 && (
                <div className="pagi">
                  <ul className="flex-center-center">
                    <ReactPaginate
                      pageCount={totalPages}
                      pageRangeDisplayed={5}
                      // forcePage={selectedPage}
                      marginPagesDisplayed={1}
                      previousLabel={<i className="ti-angle-left" />}
                      nextLabel={<i className="ti-angle-right" />}
                      nextClassName="active"
                      previousClassName="active"
                      activeClassName="current"
                      containerClassName="d-flex pagenation"
                      onPageChange={(page) => onPageChange(page.selected)}
                      hrefBuilder={hrefBuilder}
                    />
                  </ul>
                </div>
              )}
              <footer style={{ height: '50px' }}></footer>
            </div>
          )}
        </section>
      </ManagementSide>
      <TheFooter />
    </DefaultLayout>
  );
}
