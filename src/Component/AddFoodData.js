import React, { useState } from "react";
import "./AddFoodData.css";
// firebase imports
import { db, storage } from "../Firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "./Navbar";
// import Navbar from "./Navbar";
//
const AddFoodData = () => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [foodCategory, setFoodCategory] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [foodImageUrl, setFoodImageUrl] = useState("");

  //
  const [foodType, setFoodType] = useState("");
  const [mealType, setMealType] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restrauntAddressBuilding, setRestrauntAddressBuilding] = useState("");
  const [restrauntAddressStreet, setRestrauntAddressStreet] = useState("");
  const [restrauntAddressCity, setRestrauntAddressCity] = useState("");
  const [reatrauntAddressPincode, setRestrauntAddressPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foodImage == null) {
      // Kiểm tra xem người dùng đã chọn hình ảnh món ăn hay chưa
      alert("Please select an image");
      return;
    } else {
      // tạo một tham chiếu đến vị trí lưu trữ hình ảnh trên Firebase Storage
      const imageRef = ref(storage, `FoodImages/${foodImage.name}`);
      //  tải lên hình ảnh này lên đó
      uploadBytes(imageRef, foodImage)
        .then(() => {
          // lấy URL của hình ảnh từ vị trí lưu trữ Firebase Storage
          // và gán vào thuộc tính foodImageUrl
          getDownloadURL(imageRef).then((url) => {
            //tạo đối tượng foodData chứa thông tin về món ăn
            const foodData = {
              foodName,
              foodPrice,
              foodImageUrl: url,
              foodCategory,
              foodDescription,
              restaurantName,
              restaurantPhone,
              foodType,
              mealType,
              restaurantEmail,
              restrauntAddressBuilding,
              restrauntAddressStreet,
              restrauntAddressCity,
              reatrauntAddressPincode,
              id: new Date().getTime().toString(),
            };
            try {
              //sử dụng phương thức addDoc thêm dữ liệu vào Firestore
              const docRef = addDoc(collection(db, "FoodData"), foodData);
              alert("Data added successfully ", docRef.id);
            } catch (error) {
              alert("Error adding document: ", error);
            }
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  // lấy giá trị text
  function handleChange(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setFoodCategory(selectedOption.textContent);
    console.log("====================================");
    console.log(event.target.selectedIndex, foodCategory);
    console.log("====================================");
  }
  return (
    <div className="food-outermost">
      <Navbar />
      <div className="form-outer">
        <h1>Thêm món ăn</h1>
        <form className="form-inner">
          <label>Món ăn</label>
          <input
            type="text"
            name="food_name"
            onChange={(e) => {
              setFoodName(e.target.value);
            }}
          />
          <br />
          <label>Mô tả</label>
          <input
            type="text"
            name="food_description"
            onChange={(e) => {
              setFoodDescription(e.target.value);
            }}
          />
          <br />

          {/*                            */}
          {/*  */}
          {/*  */}

          <div className="form-row">
            <div className="form-col">
              <label>Giá</label>
              <input
                type="number"
                name="food_price"
                onChange={(e) => {
                  setFoodPrice(e.target.value);
                }}
              />
            </div>
            <div className="form-col">
              <label>Loại đồ ăn</label>

              <select
                name="food_type"
                onChange={(e) => {
                  setFoodType(e.target.value);
                }}
              >
                <option value="null">--Chọn--</option>
                <option value="veg">Món chay</option>
                <option value="non-veg">Món thường</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Danh mục</label>
              <select
                name="food_category"
                onChange={(e) => {
                  setFoodCategory(e.target.value);
                }}
              >
                <option value="null">--Chọn--</option>
                <option value="Món chay">Món chay</option>
                <option value="Món thường">Món thường</option>
              </select>
            </div>
            <div className="form-col">
              <label>Kiểu bữa ăn</label>

              <select
                name="meal_type"
                onChange={(e) => {
                  setMealType(e.target.value);
                }}
              >
                <option value="null">--Chọn--</option>
                <option value="dinner">Bữa tối</option>
                <option value="breakfast">Bữa sáng</option>
                <option value="liquid">Bữa trưa</option>
              </select>
            </div>
          </div>
          <br />
          {/* <div class="form-row">
            <div class="form-col">
              <label>Add On</label>
              <input
                type="text"
                name="food_addon"
                onChange={(e) => {
                  setFoodAddon(e.target.value);
                }}
              />
            </div>
            <div className="form-col">
              <label>Add On Price</label>
              <input
                type="text"
                name="food_addon_price"
                onChange={(e) => {
                  setFoodAddonPrice(e.target.value);
                }}
              />
            </div>
          </div> */}
          {/* <br /> */}
          {/*  */}
          {/*  */}
          {/*                                          */}
          <label>Ảnh</label>
          <input
            type="file"
            name="food_image"
            onChange={(e) => {
              setFoodImage(e.target.files[0]);
            }}
          />
          <br />
          <label>Tên cửa hàng</label>
          <input
            type="text"
            name="restaurant_name"
            value="Foodie"
            onChange={(e) => {
              setRestaurantName(e.target.value);
            }}
          />
          <br />
          <div class="form-row">
            <div class="form-col">
              <label>Số, Đường</label>
              <input
                type="text"
                name="restaurant_address_building"
                value="147, Trần Đại Nghĩa"
                onChange={(e) => {
                  setRestrauntAddressBuilding(e.target.value);
                }}
              />
            </div>
            <div class="form-col">
              <label>Quận / Huyện</label>
              <input
                type="text"
                name="restaurant_address_street"
                value="Q.Ngũ hành sơn"
                onChange={(e) => {
                  setRestrauntAddressStreet(e.target.value);
                }}
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-col">
              <label>Tỉnh / Thành phố</label>
              <input
                type="text"
                name="restaurant_address_city"
                value="Đà Nẵng"
                onChange={(e) => {
                  setRestrauntAddressCity(e.target.value);
                }}
              />
            </div>
            <div class="form-col">
              <label>Mã bưu điện</label>
              <input
                type="number"
                name="restaurant_address_pincode"
                value="45000"
                onChange={(e) => {
                  setRestrauntAddressPincode(e.target.value);
                }}
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-col">
              <label>Số điện thoại cửa hàng</label>
              <input
                type="number"
                name="restaurant_phone"
                value="0987654321"
                onChange={(e) => {
                  setRestaurantPhone(e.target.value);
                }}
              />
            </div>
            <div class="form-col">
              <label>Email</label>
              <input
                type="email"
                name="restaurant_email"
                value="email@gmail.com"
                onChange={(e) => {
                  setRestaurantEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <button onClick={handleSubmit}>Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodData;
