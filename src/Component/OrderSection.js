import React, { useEffect, useState } from "react";
import { db, storage } from "../Firebase/FirebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import "./OrderSection.css";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const OrderSection = () => {
  const [allorders, setAllOrders] = useState([]);
  const [allordersstatus, setAllOrdersStatus] = useState("");
  const [keyword, setKeyword] = useState("");

  const getallorder = async () => {
    setAllOrders([]);
    const querySnapshot = await getDocs(collection(db, "UserOrders"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setAllOrders((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getallorder();
  }, []);

  // console.log(allorders)

  const changeOrderStatus = (id, orderdata, status) => {
    const docRef = doc(db, "UserOrders", id);
    const data = {
      ...orderdata,
      orderstatus: status,
    };
    setDoc(docRef, data)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });

    getallorder();
  };

  const changeDeliveryboyName = (id, orderdata, boyname) => {
    console.log(id, orderdata, boyname);
    const docRef = doc(db, "UserOrders", id);
    const data = {
      ...orderdata,
      deliveryboy_name: boyname,
    };
    setDoc(docRef, data)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });

    getallorder();
  };

  const changeDeliveryboyPhone = (id, orderdata, boyphone) => {
    console.log(id, orderdata, boyphone);
    const docRef = doc(db, "UserOrders", id);
    const data = {
      ...orderdata,
      deliveryboy_phone: boyphone,
    };
    setDoc(docRef, data)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });

    getallorder();
  };
  // console.log(allordersstatus)

  return (
    <div className="order-section">
      <Navbar />
      <h1 className="order-head1">Đơn hàng</h1>

      <div className="order-s1">
        <input
          type="text"
          placeholder="Tìm theo mã đơn hàng hoặc trạng thái"
          onChange={(e) => setKeyword(e.target.value)}
          className="searchbar"
        />

        <div className="order-s1-in">
          <p>Sắp xếp theo trạng thái</p>
          <select
            className="ordertxt"
            onChange={(e) => setAllOrdersStatus(e.target.value)}
          >
            <option value="">---</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Đang được giao">Đang được giao</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
            <option value="Đơn bị huỷ">Đơn bị huỷ</option>
          </select>
        </div>
      </div>

      <div className="order__container">
        <div className="order-row_card1">
          <p className="ordertxt"> Mã đơn hàng</p>
          <p className="ordertxt">Thanh toán</p>
          <p className="ordertxt">Trạng thái</p>
          <p className="ordertxt">Người giao</p>
          <p className="ordertxt">SĐT</p>

          <p className="ordertxt">Tổng tiền</p>
          <p className="ordertxt"></p>
        </div>
        <div className="order__container">
          {allorders
            //sử dụng phương thức filter của JavaScript để lọc các phần tử của mảng allorders
            .filter((val) => {
              if (allordersstatus === "") {
                // nếu rỗng trả về toàn bộ danh sách đơn hàng
                return val;
              } else if (
                // nếu không sẽ trả về các đơn hàng có trạng thái
                //(orderstatus) chứa chuỗi allordersstatus.
                val.orderstatus
                  .toLowerCase()
                  .includes(allordersstatus.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((val) => {
              if (keyword === "") {
                //chuỗi rỗng thì sẽ trả về toàn bộ danh sách đơn hàng.
                return val;
              } else if (
                //trả về các đơn hàng có mã đơn hàng (orderid)
                //hoặc trạng thái đơn hàng (orderstatus) chứa chuỗi keyword
                val.orderid.toLowerCase().includes(keyword.toLowerCase()) ||
                val.orderstatus.toLowerCase().includes(keyword.toLowerCase())
              ) {
                return val;
              }
            })
            .map((order) => (
              <div className="order-row_card">
                <p className="ordertxt"> {order.orderid}</p>
                <p className="ordertxt"> {order.orderpayment}</p>
                {/* <p className='ordertxt'> {order.orderstatus}</p> */}
                <div className="order-card-in">
                  {order.orderstatus === "Chờ xác nhận" && (
                    <select
                      className="ordertxt1"
                      onChange={(e) =>
                        changeOrderStatus(order.orderid, order, e.target.value)
                      }
                    >
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đang được giao">Đang được giao</option>
                      <option value="Đã giao hàng">Đã giao hàng</option>
                      <option value="Đơn bị huỷ">Đơn bị huỷ</option>
                    </select>
                  )}
                  {order.orderstatus === "Đang được giao" && (
                    <select
                      className="ordertxt1"
                      onChange={(e) =>
                        changeOrderStatus(order.orderid, order, e.target.value)
                      }
                    >
                      <option value="Đang được giao">Đang được giao</option>
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã giao hàng">Đã giao hàng</option>
                      <option value="Đơn bị huỷ">Đơn bị huỷ</option>
                    </select>
                  )}

                  {order.orderstatus === "Đã giao hàng" && (
                    <p> {order.orderstatus}</p>
                  )}

                  {order.orderstatus === "Đơn bị huỷ" && (
                    <p> {order.orderstatus}</p>
                  )}
                </div>
                {order.deliveryboy_name ? (
                  <p className="ordertxt"> {order.deliveryboy_name}</p>
                ) : (
                  <input
                    type="text"
                    placeholder="Người giao"
                    className="orderinput"
                    onBlur={(e) =>
                      changeDeliveryboyName(
                        order.orderid,
                        order,
                        e.target.value
                      )
                    }
                  />
                )}
                {order.deliveryboy_phone ? (
                  <p className="ordertxt"> {order.deliveryboy_phone}</p>
                ) : (
                  <input
                    type="text"
                    placeholder="SĐT người giao"
                    onBlur={(e) =>
                      changeDeliveryboyPhone(
                        order.orderid,
                        order,
                        e.target.value
                      )
                    }
                    className="orderinput"
                  />
                )}
                <p className="ordertxt">{order.ordercost}</p>

                <Link to={`/orderdetails/${order.orderid}`}>
                  <button>Chi tiết</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
