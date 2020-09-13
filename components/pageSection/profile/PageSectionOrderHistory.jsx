import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const data = [
  {
    "id": 1, "branchName": "", "dateTime": "", "orderItems": [
      { "mealName": "" }, { "mealName": "" }], "total": "CHF 23",
    "isFeedbackProvided": true, "status": "Delivered", "paymentMethod": "PayPal"
  },
  {
    "id": 2, "branchName": "", "dateTime": "", "orderItems": [
      { "mealName": "" }, { "mealName": "" }
    ], "total": "CHF 23", "isFeedbackProvided": true, "status": "Delivered", "paymentMethod": "Cash"
  },
  {
    "id": 3, "branchName": "", "dateTime": "", "orderItems": [
      { "mealName": "" }, { "mealName": "" }
    ], "total": "CHF 23", "isFeedbackProvided": true, "status": "Delivered", "paymentMethod": "Cash"
  },
  {
    "id": 4, "branchName": "", "dateTime": "", "orderItems": [
      { "mealName": "" }, { "mealName": "" }
    ], "total": "CHF 23", "isFeedbackProvided": true, "status": "Delivered", "paymentMethod": "Cash"
  },
  {
    "id": 5, "branchName": "", "dateTime": "", "orderItems": [
      { "mealName": "" }, { "mealName": "" }
    ], "total": "CHF 23", "isFeedbackProvided": true, "status": "Delivered", "paymentMethod": "Cash"
  },
]

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
      const url = `/customer/web/profile-service/order-history?branchId=${currentBranch}&count=5&page=${selectedPage + 1}&skipCount=${skipCount}&isActive=true`;
      const response = await axios.get(url);
      // setOrderHistoryData(response.data.result)
      setOrderHistoryData(data)
      return response.data.result;
    } catch (error) {
      console.error(error);
      // setOrderHistoryData([])
      setOrderHistoryData(data)
      return [];
    }
  }

  useEffect(() => {
    setTotalPage(Math.ceil(orderHistoryData.length / 5))
  }, [orderHistoryData])

  useEffect(() => {
    getOrderHistory()
  }, [selectedPage])

  const hrefBuilder = (page) => {
    // const query = queryString.stringify({
    // 	initialCurrentPage: page
    // });
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
    // let searchString = `?initialCurrentPage=${page}`
    // window.history.replaceState(null, null, searchString);
  };

  const onDateHandle = (e) => {

  }
  return (
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
        <div className="order-table order-table-center table-responsive-md">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Branch</th>
                <th scope="col">Total</th>
                <th scope="col">FeedBack</th>
                <th scope="col">Payment</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                orderHistoryData.map((data, key) => {
                  return <tr>
                    <th>{data.id}</th>
                    <th>{data.branchName}</th>
                    <th>{data.total}</th>
                    <th>{data.isFeedbackProvided}</th>
                    <th>{data.paymentMethod}</th>
                    <th>{data.dateTime}</th>
                    <th>{data.status}</th>
                  </tr>
                })
              }
            </tbody>
          </table>
          {orderHistoryData.length == 0 && <div className="no-found">No transaction has been found !</div>}
          <div style={{ height: "50px" }}></div>
          {
            totalPages > 0 && 
            <div className="pagi">
              <ul className="flex-center-center">
                <ReactPaginate
                  pageCount={totalPages}
                  pageRangeDisplayed={2}
                  forcePage={selectedPage}
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
        </div>
        <footer style={{ height: "50px" }}>

        </footer>
      </div>
    </section>
  )
}

export default PageSectionOrderHistory;