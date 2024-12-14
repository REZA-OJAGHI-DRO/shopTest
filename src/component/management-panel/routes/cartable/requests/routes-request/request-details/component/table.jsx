import Description from "./description.jsx";
import {
  React,
  useEffect,
  useState,
  Button,
  TextFull,
  Modal,
  TextNumber,
} from '@/component/management-panel/import-management.js'

function Table() {
  const [data, setData] = useState([
    {
      id: "1",
      code: "1245",
      name: "فرز",
      countInBox: 10,
      number: 2,
      unite: "جعبه",
      originalPrice: "1000",
      discount: 10,
      finalPrice: "1500",
    },
    {
      id: "1",
      code: "1245",
      name: "فرز",
      countInBox: 10,
      number: 2,
      unite: "جعبه",
      originalPrice: "1000",
      discount: 10,
      finalPrice: "1500",
    },
    {
      id: "1",
      code: "1245",
      name: "فرز",
      countInBox: 10,
      number: 2,
      unite: "جعبه",
      originalPrice: "1000",
      discount: 10,
      finalPrice: "1500",
    },
  ]);
  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();

  const [mappedData, setMappedData] = useState({
    countInBoxValue: [],
    number: [],
    discount: [],
    originalPrice: [],
    finalPrice: [],
  });

  useEffect(() => {
    setMappedData({
      countInBoxValue: data.map((item) => item.countInBox),
      number: data.map((item) => item.number),
      discount: data.map((item) => item.discount),
      originalPrice: data.map((item) => item.originalPrice),
      finalPrice: data.map((item) => item.finalPrice),
    });
  }, [data]);

  const handleChange = (e, index, x) => {
    const value = Math.max(0, e.target.value);
    const keyToUpdate =
      x === 1 ? "countInBoxValue" : x === 2 ? "number" : "discount";
    setMappedData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[keyToUpdate] = [...prevData[keyToUpdate]];
      updatedData[keyToUpdate][index] = value;
      return updatedData;
    });
  };


  function closeModal() {
    setShowDescription(false);
  }

  function sendForm1() {}
  function sendForm2() {}
  function sendForm3() {}
  function sendForm4() {}

  return (
    <>
      <div className="w-full flex flex-wrap justify-center items-center px-4">
        <div className="w-full flex flex-wrap justify-center items-center border-t-2 border-b-2 border-custom-green">
          <div className="w-full flex justify-around h-[50px] items-center border-b border-zinc-500">
            <p className="text-[1.2rem] font-semibold">درخواست دهنده</p>
            <p className="text-[1.2rem] font-semibold">نوع خرید</p>
            <p className="text-[1.2rem] font-semibold">تاریخ و ساعت</p>
          </div>
          <div className="w-full flex justify-around items-center">
            <table className="w-full table-auto border-collapse  overflow-hidden">
              <thead className="h-[50px]">
                <tr className="border-b border-zinc-500 h-[50px] *:text-zinc-600">
                  <th className="w-fit text-center">ردیف</th>
                  <th className="w-fit text-center">کد کالا</th>
                  <th className="w-fit text-center">نام کالا</th>
                  <th className="w-fit text-center">تعداد کارتن</th>
                  <th className="w-fit text-center">تعداد</th>
                  <th className="w-fit text-center">واحد</th>
                  <th className="w-fit text-center">قیمت اصلی</th>
                  <th className="w-fit text-center">تخفیف</th>
                  <th className="w-fit text-center">قیمت نهایی</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((val, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-500 h-[50px] *:text-zinc-600"
                    >
                      <td className="w-fit text-center">{i + 1}</td>
                      <td className="w-fit text-center">{val.code}</td>
                      <td className="w-fit text-center">{val.name}</td>
                      <td className="w-fit text-center">
                        <input
                          dir="ltr"
                          type="number"
                          onChange={(e) => handleChange(e, i, 1)}
                          value={mappedData.countInBoxValue[i] || 0}
                          className="w-[50px] border-2 h-[35px] text-center rounded-lg shadow-inner-custom-3 bg-[rgb(243,243,243)]"
                        />
                      </td>
                      <td className="w-fit text-center">
                        <input
                          dir="ltr"
                          type="number"
                          onChange={(e) => handleChange(e, i, 2)}
                          value={mappedData.number[i] || 0}
                          className="w-[50px] border-2 h-[35px] text-center rounded-lg shadow-inner-custom-3 bg-[rgb(243,243,243)]"
                        />
                      </td>
                      <td className="w-fit text-center">{val.unite}</td>
                      <td className="w-fit text-center">{val.originalPrice}</td>
                      <td className="w-fit text-center">
                        %{" "}
                        <input
                          dir="ltr"
                          type="number"
                          onChange={(e) => handleChange(e, i, 3)}
                          value={mappedData.discount[i] || 0}
                          className="w-[50px] border-2 h-[35px] text-center rounded-lg shadow-inner-custom-3 bg-[rgb(243,243,243)]"
                        />
                      </td>
                      <td className="w-fit text-center">{val.finalPrice}</td>
                    </tr>
                  ))}

                <tr className="h-[50px] *:text-zinc-600">
                  <th className="w-fit text-center">جمع</th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {mappedData.countInBoxValue.reduce(
                      (total, item) => total + Number(item),
                      0
                    )}
                  </th>
                  <th className="w-fit text-center">
                    {mappedData.number.reduce(
                      (total, item) => total + Number(item),
                      0
                    )}
                  </th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {mappedData.originalPrice.reduce(
                      (total, item) => total + Number(item),
                      0
                    )}
                  </th>
                  <th className="w-fit text-center"></th>
                  <th className="w-fit text-center">
                    {mappedData.finalPrice.reduce(
                      (total, item) => total + Number(item),
                      0
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full py-5">
          <Description setShowDescription={setShowDescription} />
        </div>
        <div className="w-full border-y border-zinc-500 *:text-zinc-600 h-[50px] flex gap-10 justify-end px-10 items-center">
          <p>مبلغ کامل با تخفیف</p>
          <p>123124</p>
        </div>
        <div className="w-full text-[1.2rem] *:text-red-500 font-semibold h-[50px] flex gap-2 justify-center items-center">
          <p>123124</p>
          <p>تومان تخفیف داده شد</p>
        </div>
        <div className="w-full h-[50px] flex gap-2 justify-center items-center">
          <div className="w-[250px]">
            <Button
              value={"ارسال پیش فاکتور به خریدار"}
              click={sendForm1}
              styleButton={22}
            />
          </div>
          <div className="w-[150px]">
            <Button value={"رد سفارش"} click={sendForm2} styleButton={17} />
          </div>
        </div>
        <div className="w-full h-[70px] flex gap-5 justify-center items-center">
          <p>چت با خریدار</p>
          <button className="w-[40px] h-[40px] shadow-custom-6 rounded-xl flex justify-center items-center hover:scale-95 transition-all duration-300">
            <Svg />
          </button>
        </div>
      </div>

      {showDescription && (
        <Modal onClose={closeModal} title="" style={"w-[90vw] xl:w-[600px]"}>
          <div className="w-full flex flex-wrap justify-center gap-5">
            <div className="w-[48%] px-10 flex flex-wrap justify-center content-center gap-5">
              <Button
                value={"اضافه کردن تخفیف"}
                click={sendForm3}
                styleButton={18}
              />
              <Button
                value={"اضافه کردن اضافات"}
                click={sendForm4}
                styleButton={18}
              />
            </div>
            <div className="w-[48%] flex justify-between">
              <TextFull
                pattern={/^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/}
                placeholder={"عنوان"}
                label={""}
                svg={false}
                width={"w-[45%] h-[40px] mt-1"}
                data={title}
                setData={setTitle}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black hidden"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                styleError={''}
                styleBox={"bg-[#ffffff]"}
              />
              <TextNumber
                width={"w-[45%] mt-1"}
                label={""}
                styleLabel={"text-[1.2rem] xl:text-[1rem] text-black hidden"}
                styleError={''}
                styleBox={
                  "bg-[#ffffff] h-[35px] xl:h-[40px] text-[1rem] xl:text-[1rem]"
                }
                placeholder={"مبلغ"}
                svg={false}
                max={""}
                data={price}
                setData={setPrice}
                styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
              />
            </div>
            <div className="w-full px-10 pt-4 flex">
              <div className="w-[15%]">
                <Button value={"تایید"} click={sendForm4} styleButton={22} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Table;

function Svg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="20"
        viewBox="0 0 25 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.12179 0.199326C10.8792 -0.08392 14.6532 -0.0652646 18.4075 0.255113L20.6706 0.447578C21.5008 0.518637 22.283 0.866968 22.8915 1.4366C23.5001 2.00623 23.8997 2.76408 24.026 3.58839L24.1682 4.52142C24.6517 7.68442 24.6065 10.9059 24.0344 14.054C23.8981 14.807 23.5018 15.4882 22.9147 15.9784C22.3276 16.4686 21.587 16.7368 20.8224 16.736H8.31461C8.02616 16.736 7.74328 16.8071 7.48967 16.9438L2.03979 19.8754C1.88054 19.9611 1.7018 20.0039 1.52106 19.9997C1.34032 19.9956 1.16375 19.9445 1.0086 19.8517C0.853448 19.7588 0.725026 19.6272 0.635882 19.4698C0.546738 19.3123 0.499919 19.1345 0.5 18.9535V7.07507C0.500359 5.34133 1.15512 3.67172 2.33315 2.4006C3.51118 1.12949 5.12551 0.350717 6.85285 0.220246L7.12179 0.199326ZM7.11901 7.09878C6.65704 7.09878 6.214 7.28246 5.88734 7.6094C5.56068 7.93634 5.37716 8.37976 5.37716 8.84213C5.37716 9.30449 5.56068 9.74792 5.88734 10.0749C6.214 10.4018 6.65704 10.5855 7.11901 10.5855C7.58097 10.5855 8.02402 10.4018 8.35068 10.0749C8.67734 9.74792 8.86085 9.30449 8.86085 8.84213C8.86085 8.37976 8.67734 7.93634 8.35068 7.6094C8.02402 7.28246 7.58097 7.09878 7.11901 7.09878ZM12.6929 7.09878C12.2309 7.09878 11.7879 7.28246 11.4612 7.6094C11.1346 7.93634 10.9511 8.37976 10.9511 8.84213C10.9511 9.30449 11.1346 9.74792 11.4612 10.0749C11.7879 10.4018 12.2309 10.5855 12.6929 10.5855C13.1549 10.5855 13.5979 10.4018 13.9246 10.0749C14.2512 9.74792 14.4348 9.30449 14.4348 8.84213C14.4348 8.37976 14.2512 7.93634 13.9246 7.6094C13.5979 7.28246 13.1549 7.09878 12.6929 7.09878ZM16.525 8.84213C16.525 8.37976 16.7085 7.93634 17.0351 7.6094C17.3618 7.28246 17.8048 7.09878 18.2668 7.09878C18.7288 7.09878 19.1718 7.28246 19.4985 7.6094C19.8251 7.93634 20.0087 8.37976 20.0087 8.84213C20.0087 9.30449 19.8251 9.74792 19.4985 10.0749C19.1718 10.4018 18.7288 10.5855 18.2668 10.5855C17.8048 10.5855 17.3618 10.4018 17.0351 10.0749C16.7085 9.74792 16.525 9.30449 16.525 8.84213Z"
          fill="#83C100"
        />
      </svg>
    </>
  );
}
