import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import axios from '../../../lib/axios';
import DateConvert from '../../../utils/DateConvert';

const PageSectionOrderHistory = (props) => {
  const { currentBranch } = props;
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

  const getOrderHistory = async () => {
    try {
      const url = `/customer/web/checkout-service/orders?MaxResultCount=5&SkipCount=${skipCount}&status=${status}&isIncludeFeedback=true&startDate=${fromDateString}&endDate=${toDateString}`;
      const response = await axios.get(url);
      setOrderHistoryData(response.data.result.items);
      setTotalCount(response.data.result.totalCount);
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

  return (
    <>
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
                  <p>Order : {data.orderType}</p>
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
                  {data.orderItems.map((items) => {
                    return (
                      <>
                        <span className="img-circle-60 mgr-15">
                          <img src={data.image} alt="" title="" />{' '}
                        </span>
                        <div className="author-info">
                          <h2 className="font-20 font-demi">
                            {items.mealName} - {items.mealPriceName}
                          </h2>
                          <div className="star-rate">
                            <a href="" title="" className="fa fa-star"></a>
                            <a href="" title="" className="fa fa-star"></a>
                            <a href="" title="" className="fa fa-star"></a>
                            <a href="" title="" className="fa fa-star"></a>
                            <a href="" title="" className="fa fa-star"></a>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                {data.status === 'Accepted' ? (
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
                      <button className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center submit-button">
                        SUBMIT
                      </button>
                      <input
                        type="text"
                        placeholder=""
                        className="input-radius h56"
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
    </>
  );
};

export default PageSectionOrderHistory;
