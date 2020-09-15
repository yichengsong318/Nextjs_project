import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import axios from '../../../lib/axios';

const PageSectionOrderHistory = (props) => {
  const { currentBranch } = props
  const [dateValue, setDateValue] = useState("")
  const [totalPages, setTotalPage] = useState(5)
  const [selectedPage, setSelectedPage] = useState(0)
  const [skipCount, setSkipCount] = useState(0)
  const [orderHistoryData, setOrderHistoryData] = useState([])

  const [currentPage, setCurrentPage] = useState(0)

  const getOrderHistory = async () => {
    try {
      const url = `/customer/web/checkout-service/orders?MaxResultCount=5&SkipCount=${currentPage}&isIncludeFeedback=true`;
      const response = await axios.get(url);
      setOrderHistoryData(response.data.result)
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    setTotalPage(Math.ceil(orderHistoryData.length / 5))
    console.log(orderHistoryData, "orderhistory")
  }, [orderHistoryData])

  useEffect(() => {
    getOrderHistory()
  }, [currentPage])

  const hrefBuilder = (page) => {
    // const query = queryString.stringify({
    // 	initialCurrentPage: page
    // });
  }

  const onPageChange = (page) => {
    debugger
    setCurrentPage(page);
    // let searchString = `?initialCurrentPage=${page}`
    // window.history.replaceState(null, null, searchString);
  };

  const onDateHandle = (e) => {

  }
  return (
    <>
      <section>
        <div className="order-right">
          <form className="search-order search-order-history">
            <div className="search-item">
              <label>Status</label>
              <div className="select-box relative">
                <select className="baris-blank">
                  <option>All</option>
                  <option>All 1</option>
                  <option>All 2</option>
                </select>
                <span className="arrow-abs ti-angle-down"></span>
              </div>
            </div>
            <div className="search-item search-date">
              <label>From Date</label>
              <div className="input-group date">
                <input type="text" className="baris-blank" placeholder="dd/mm/yyyy" />
                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              </div>
            </div>
            <div className="search-item search-date">
              <label>To Date</label>
              <div className="input-group date">
                <input type="text" className="baris-blank" placeholder="dd/mm/yyyy" />
                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              </div>
            </div>
            <div className="search-item search-item-button ">
              <label> </label>
              <button className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center">SEARCH</button>
            </div>
          </form>
          {/* {orderHistoryData.length == 0 && <div className="no-found">No transaction has been found !</div>} */}
        </div>
        {orderHistoryData.length === 0 &&
          <div className="order-right order-track">
            <div className="search-order flex-center-between">
              <span className="ordertype-shine shine">
              </span>
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
                <span className="img-circle-shine mgr-15 shine"><img alt="" title="" /> </span>
                <div className="author-info">
                  <h2 className="star-rate-shine shine"></h2><br />
                  <div className="star-rate-shine shine">
                  </div>
                </div>
              </div>
              <div className="post-comment-shine flex-center mgb-30 shine">
              </div>
            </div>
          </div>
        }
        {orderHistoryData.map(data =>
          <div className="order-right order-track">
            <div className="search-order flex-center-between">
              <span className="font-14 font-demi">
                <p>Order : {data.orderType}</p>
                {data.creationTime}
              </span>
              <div className="search-item flex-center">
                <div className="select-box relative mgr-15">
                  {data.isPaid ? <div className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center">Paid</div> :
                    <div className="btn btn-h46 btn-red font-demi font-12  inflex-center-center">Not Paid</div>}
                </div>
                <div className="select-box relative mgr-15">
                  <div className="btn btn-h46 font-demi font-12  inflex-center-center">{`${data.currency} ` + ` ${data.finalAmount}`}</div>
                </div>
                <div className="select-box relative">
                  <div className="btn btn-h46 btn-blue font-demi font-12  inflex-center-center">{data.paymentType}</div>
                </div>
              </div>
            </div>
            <div className="post-review">
              <div className="review-author flex">
                <span className="img-circle-60 mgr-15"><img src={data.image} alt="" title="" /> </span>
                <div className="author-info">
                  <h2 className="font-20 font-demi">{data.name}</h2>
                  <div className="star-rate">
                    <a href="" title="" className="fa fa-star"></a>
                    <a href="" title="" className="fa fa-star"></a>
                    <a href="" title="" className="fa fa-star"></a>
                    <a href="" title="" className="fa fa-star"></a>
                    <a href="" title="" className="fa fa-star"></a>
                  </div>
                </div>
              </div>
              {data.status === "Accepted" ?
                <div className="flex-center mgb-30">
                  <div className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center track-order-button">TRACK ORDER</div>
                </div>
                :
                <div className="post-comment flex-center mgb-30">
                  <span className="img-circle mgr-15"><img src="/images/picture/user.png" alt="" title="" /> </span>
                  <div className="label-top relative">
                    <label>Comment</label>
                    <button className="btn btn-h50 btn-yellow font-demi font-16  inflex-center-center submit-button">SUBMIT</button>
                    <input type="text" placeholder="" className="input-radius h56" />
                  </div>
                </div>
              }
            </div>
          </div>
        )}
        <div className="order-right">
          <div style={{ height: "50px" }}></div>
          {
            totalPages > 0 &&
            <div className="pagi">
              <ul className="flex-center-center">
                <ReactPaginate
                  pageCount={5}
                  pageRangeDisplayed={10}
                  // forcePage={selectedPage}
                  marginPagesDisplayed={1}
                  previousLabel={
                    <i className="ti-angle-left" />
                  }
                  nextLabel={
                    <i className="ti-angle-right" />
                  }
                  nextClassName="active"
                  previousClassName="active"
                  activeClassName="current"
                  containerClassName="d-flex pagenation"
                  onPageChange={(page) =>
                    onPageChange(page.selected)
                  }
                  hrefBuilder={hrefBuilder}
                />
              </ul>
            </div>
          }
          <footer style={{ height: "50px" }}>
          </footer>
        </div>
      </section>
    </>
  )
}

export default PageSectionOrderHistory;