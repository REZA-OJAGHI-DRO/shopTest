
import Table from "./table.jsx";
import {
  React,
  useCallback,
  useEffect,
  useRef,
  useState,
  WithSupport2,
  Button,
  SelectInput,
  SelectAllInput,
  TextNumber,
  TextArea,
  TextPercentage,
  TextPercentage2,
  CheckBoxAccordion2,
  Load,
  CheckMessage,
  Loading,
  loadUserGetAllPosition,
  useSelector,
  supplierNameGetAll,
  GetCookie,
  GoodGetAll,
  sendGoodDiscount
} from '@/component/management-panel/import-management.js'
function SalesDiscounts() {
  const [legalButton1, setLegalButton1] = useState(11);
  const [trueButton2, setTrueButton2] = useState(12);
  const [updateTable, setUpdateTable] = useState(false);

  const [options1, setOptions1] = useState([{ key: "", value: "" }]);
  const [options2, setOptions2] = useState([{ key: "", value: "" }]);
  const [options3, setOptions3] = useState([
    { key: "0", value: "کارتونی" },
    { key: "1", value: "زیر کارتونی" },
    { key: "2", value: "هر دو" },
  ]);
  const [options4, setOptions4] = useState([
    { key: "0", value: "نقدی" },
    { key: "1", value: "مدت دار" },
  ]);
  const [options5, setOptions5] = useState([{ key: "", value: "" }]);

  const [d1, setD1] = useState(false);
  const [d2, setD2] = useState(true);
  const [d3, setD3] = useState(true);
  const [styleError1, setStyleError1] = useState();
  const [styleError2, setStyleError2] = useState();
  const [styleError3, setStyleError3] = useState();
  const [styleError4, setStyleError4] = useState();
  const [styleError5, setStyleError5] = useState();
  const [styleError6, setStyleError6] = useState();
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [load, setLoad] = useState(false);

  const [data1, setData1] = useState("");

  const [nameSupplier, setNameSupplier] = useState();
  const [dataName, setDataName] = useState("");
  const [conditionDescription, setConditionDescription] = useState("");
  const [goodIds, setGoodIds] = useState([]);
  const [saleType, setSaleType] = useState();
  const [paymentType, setPaymentType] = useState();
  const [paymentDurationDays, setPaymentDurationDays] = useState();
  const [amountMaxLimit, setAmountMaxLimit] = useState();
  const [amountMinLimit, setAmountMinLimit] = useState();
  const [costMinLimit, setCostMinLimit] = useState();
  const [shopperRankLimit, setShopperRankLimit] = useState();
  const [invoiceDiscountPercent, setInvoiceDiscountPercent] = useState("");
  const [goodDiscountPercent, setGoodDiscountPercent] = useState("");
  const [giftItem, setGiftItem] = useState("");

  const [checkData, setCheckData] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
    check2: false,
 
  });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(
          !Object.values(checkDataAll).every(value => value === true)
      );
  }, [checkDataAll]);
  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
// *********loadUserGetAllPosition

const [nameLogin, setNameLogin] = useState("");
const [id, setId] = useState("");
const UserGet = useCallback(() => {
  loadUserGetAllPosition(roleCookie, token, chabk, setId, setNameLogin);
}, [roleCookie, token, chabk, setId, setNameLogin]);
useEffect(() => {
  UserGet();
}, [UserGet, id]);

  // ********GoodGetAll
  const GoodGet = useCallback(() => {
    setIsLoading(true);
    GoodGetAll(
    token,
    chabk,
    setMessageData,
    setCheckData,
    (data) => {
      setOptions2(data);
      setCheckDataAll((r) => ({ ...r, check2: true }));
    }
  );
}, [token, chabk]);
const isFirstRender2 = useRef(true);
useEffect(() => {
  if (isFirstRender2.current) {
    GoodGet();
    isFirstRender2.current = false;
  }
}, [GoodGet]);

// *********

  const [activeCheckbox1, setActiveCheckbox1] = useState(0);



  // ********supplier
  const GetSupplier = useCallback(() => {
    setIsLoading(true);
      const keyword = "";
      supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions1(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [token, chabk]);
  const isFirstRender1 = useRef(true);
  useEffect(() => {
    if (isFirstRender1.current) {
      GetSupplier();
      isFirstRender1.current = false;
    }
  }, [GetSupplier]);
  
  // ********
  const clickLegal = (e) => {
    setLegalButton1(11);
    setTrueButton2(12);
  };
  const clickTrue = (e) => {
    setLegalButton1(12);
    setTrueButton2(11);
  };
  
  
  const handleCheck1 = (index) => {
    if (index !== activeCheckbox1) {
      setActiveCheckbox1(index);
      setChecked1(true);
      setStyleError1(false);
      setData1(index === 0 ? 1 : 2);
    }
    if (index == 0) {
      setD1(false);
      setD2(true);
      setD3(true);
      setGiftItem("");
      setGoodDiscountPercent("");
    } else if (index == 1) {
      setD1(true);
      setD2(false);
      setD3(true);
      setGiftItem("");
      setInvoiceDiscountPercent("");
    } else {
      setD1(true);
      setD2(true);
      setD3(false);
      setGoodDiscountPercent("");
      setInvoiceDiscountPercent("");
    }
  };

  const [invoice, setInvoice] = useState();
  const [good, setGood] = useState();

  useEffect(() => {
    if (invoiceDiscountPercent && typeof invoiceDiscountPercent === "string") {
      const invoiceDiscount = parseFloat(
        invoiceDiscountPercent.replace("%", "") || 0
      );
      setInvoice(invoiceDiscount);
    }

    if (goodDiscountPercent && typeof goodDiscountPercent === "string") {
      const goodDiscount =
        parseFloat(goodDiscountPercent.replace("%", "")) || 0;
      setGood(goodDiscount);
    }
  }, [invoiceDiscountPercent, goodDiscountPercent]);

  const [dataAll, setDataAll] = useState({
    supplierId: "",
    name: "",
    conditionDescription: "",
    goodIds: [],
    saleType: "",
    paymentType: "",
    paymentDurationDays: 0,
    amountMaxLimit: 0,
    amountMinLimit: 0,
    costMinLimit: 0,
    shopperRankLimit: 0,
    invoiceDiscountPercent: 0,
    goodDiscountPercent: 0,
    giftItem: "",
  });

  useEffect(() => {
    setDataAll({
      supplierId: nameSupplier,
      name: dataName,
      conditionDescription: conditionDescription,
      goodIds: goodIds,
      saleType: saleType,
      paymentType: paymentType,
      paymentDurationDays: paymentDurationDays,
      amountMaxLimit: amountMaxLimit,
      amountMinLimit: amountMinLimit,
      costMinLimit: costMinLimit,
      shopperRankLimit: shopperRankLimit,
      invoiceDiscountPercent: invoice,
      goodDiscountPercent: good,
      giftItem: giftItem,
    });
  }, [
    nameSupplier,
    dataName,
    conditionDescription,
    goodIds,
    saleType,
    paymentType,
    paymentDurationDays,
    amountMaxLimit,
    amountMinLimit,
    costMinLimit,
    shopperRankLimit,
    invoice,
    good,
    giftItem,
  ]);

  const sendForm = async () => {
    if (!nameSupplier) {
      setStyleError6(true);
    } else {
      setStyleError6(false);
    }
    if (!dataName) {
      setStyleError1(true);
    } else {
      setStyleError1(false);
    }
    if (goodIds.length == 0) {
      setStyleError2(true);
    } else {
      setStyleError2(false);
    }
    if (activeCheckbox1 == 0) {
      if (!invoice) {
        setStyleError3(true);
      } else {
        setStyleError3(false);
      }
    } else {
      setStyleError3(false);
    }
    if (activeCheckbox1 == 1) {
      if (!good) {
        setStyleError4(true);
      } else {
        setStyleError4(false);
      }
    } else {
      setStyleError4(false);
    }
    if (activeCheckbox1 == 2) {
      if (!giftItem) {
        setStyleError5(true);
      } else {
        setStyleError5(false);
      }
    } else {
      setStyleError5(false);
    }
    if (
      nameSupplier && dataName && goodIds && activeCheckbox1 == 0
        ? invoiceDiscountPercent
        : activeCheckbox1 == 1
        ? goodDiscountPercent
        : activeCheckbox1 == 2 && giftItem
    ) {
      setLoad(true);
      try {
        const result = await sendGoodDiscount(dataAll, token, chabk);
        if (result.isSuccess == true) {
          setMessage(result.message);
          if (result) {
            setTimeout(() => {
              setNameSupplier(null)
              setLoad(false);
              setDataName("");
              setConditionDescription("");
              setGoodIds([]);
              setSaleType(null);
              setPaymentType(null);
              setPaymentDurationDays(null);
              setAmountMaxLimit(null);
              setAmountMinLimit(null);
              setCostMinLimit(null);
              setShopperRankLimit(null);
              setInvoiceDiscountPercent("");
              setGoodDiscountPercent("");
              setGiftItem("");
              setUpdateTable(!updateTable);
              setCheck((r) => ({ ...r, check1: true }));
              setTimeout(() => {
                setCheck((r) => ({ ...r, check1: false }));
                setMessage("");
              }, 5000);
            }, 2000);
          }
        } else if (result.isSuccess == false) {
          setMessage(result.message);
          setTimeout(() => {
            setLoad(false);
            setCheck((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setMessage("");
              setCheck((r) => ({ ...r, check4: false }));
            }, 5000);
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {}, 2000);
      }
    } else {
      setMessage("لطفا مقادیر الزامی را انتخاب کنید");
      setCheck((r) => ({ ...r, check3: true }));
      setTimeout(() => {
        setCheck((r) => ({ ...r, check3: false }));
        setMessage("");
      }, 5000);
    }
  };


  return (
    <>
      <style>
        {`
      .boxFilter{
      background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      .boxFilter4{
    //   background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      
      <CheckMessage message={message} check={check} />
      {isLoading == true ? (
        checkData == false ? (
          <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
            <Loading />
            <p className="w-full flex justify-center items-center text-[1.2rem]">
              لطفاً منتظر بمانید، داده‌ها در حال بارگذاری هستند ...
            </p>
          </div>
        ) : (
          <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
            <p className="w-full flex justify-center items-center text-[1.5rem]">
              خطاهای پردازش
            </p>
            {messageData &&
              messageData.map((val, i) => {
                return (
                  <p
                    key={i}
                    className="w-full flex justify-center items-center text-[1.2rem]"
                  >
                    {i + 1} - {val}
                  </p>
                );
              })}
          </div>
        )
      ) : (
      <div className="w-full min-h-[100vh] flex justify-center flex-wrap content-between">
        <div className="w-[81%] flex justify-center flex-wrap">
          <div className=" w-full h-[32vh]">
            <div className="w-full flex justify-end pt-2">
              <div className="flex gap-2">
                <div className="bg-[#B886FF] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                  <Svg1 />
                </div>
                <div className="bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                  <Svg2 />
                </div>
                <p className=" h-[30px] text-[1.2rem] flex items-center justify-center">
                  {name}
                </p>
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <h4 className="w-full text-center text-[2rem] text-zinc-800">
                تخفیفات فروش
              </h4>
              <div className="w-full flex justify-center">
                <div className="w-[65%] bg-[#E6E6E6] rounded-2xl h-[60px] shadow-inner-custom-2 flex justify-center items-center">
                  <div className="w-[97%] h-[90%] flex gap-1 justify-center items-center">
                    <Button
                      value={"تخفیفات فروش به ازای کالا"}
                      click={() => clickLegal(event)}
                      styleButton={legalButton1}
                    />
                    <Button
                      value={"تخفیفات فروش به ازای کل سفارش"}
                      click={() => clickTrue(event)}
                      styleButton={trueButton2}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%] px-5 h-[70px] flex gap-3 content-center justify-center">
                          <h4 className="flex items-center text-[1.2rem]">
                            نام تامین کننده
                          </h4>
                          <div className="w-[250px] flex-wrap flex justify-center content-center">
                             <SelectInput options={options1} data={nameSupplier} setData={setNameSupplier} hasError={styleError6}/>
                          </div>
                        </div>
            </div>
          </div>
          <div className="w-full ">
            <div
              dir="ltr"
              className="w-full  "
            >
              <div dir="rtl" className="w-full">
                <section className="w-full flex flex-wrap px-4 pb-2 gap-7 py-2">
                  <article className="w-full px-4 py-2 flex rounded-2xl shadow-custom-6 justify-around flex-wrap boxFilter gap-3">
                    <TextPercentage2
                      placeholder={"نام قانون فروش را وارد کنید"}
                      label={"نام قانون فروش :"}
                      svg={false}
                      width={"w-[23%]"}
                      data={dataName}
                      setData={setDataName}
                      styleLabel={"text-[1rem] xl:text-[1.1rem] text-black"}
                      styleInput={
                        "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                      }
                      styleError={styleError1}
                      styleBox={"bg-[#ffffff]"}
                    />
                    <TextNumber
                      placeholder={""}
                      label={"رتبه اعتباری خریدار :"}
                      svg={false}
                      width={"w-[16%] h-[40px]"}
                      max={""}
                      data={shopperRankLimit}
                      setData={setShopperRankLimit}
                      styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                      styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                      styleError={""}
                      styleBox={"bg-[#ffffff]"}
                      styleBox2={"bg-white"}
                    />
                    <div className="w-[23%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full"> نوع فروش :</p>
                             <SelectInput options={options3} data={saleType} setData={setSaleType} hasError={false}/>
                          </div>
                    <div className="w-[30%] flex justify-between">
                           <div className="w-[48%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full"> نوع پرداخت :</p>
                             <SelectInput options={options4} data={paymentType} setData={setPaymentType} hasError={false}/>
                          </div>
                      <div className="w-[48%] h-[100%] flex justify-between items-end ">
                        <TextNumber
                          placeholder={""}
                          label={""}
                          svg={false}
                          width={"w-[100%] h-[40px] px-0"}
                          max={""}
                          data={paymentDurationDays}
                          setData={setPaymentDurationDays}
                          styleLabel={
                            "text-[1rem] xl:text-[1rem] text-black hidden "
                          }
                          styleInput={"text-[1rem] xl:text-[1rem] h-[35px]"}
                          styleError={""}
                          styleBox={"bg-[#ffffff]"}
                          disabled={paymentType == 1 ? false : true}
                        />

                        <p className="w-[45%] h-[35px] text-end text-[1.1rem]">
                          روز
                        </p>
                      </div>
                    </div>
                    <div className="w-full  flex justify-between">
                      <div className="w-[50%] px-2 flex flex-wrap ">
                        <div className="w-full bg-[rgba(255,255,255,0.5)] rounded-2xl flex justify-between">
                          <div className="w-[48%] flex flex-wrap">
                            <p className="w-full text-[1.1rem]">
                              محدودیت مقداری :
                            </p>
                            <div className="w-full flex">
                              <div className="w-[80%] flex flex-wrap gap-1">
                                <p className="w-[48%] rounded-full bg-[#ffffff] shadow-custom-6 flex gap-2 justify-center items-center">
                                  بزرگتر از
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                  >
                                    <rect
                                      x="0.0361328"
                                      y="0.785645"
                                      width="14.9642"
                                      height="15"
                                      rx="7.4821"
                                      fill="#969696"
                                    />
                                    <g clipPath="url(#clip0_2001_489)">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.13702 10.8727L4.11371 7.72989L4.86941 6.94434L7.51487 9.69434L10.1603 6.94434L10.916 7.72989L7.89271 10.8727C7.79249 10.9768 7.65658 11.0353 7.51487 11.0353C7.37315 11.0353 7.23724 10.9768 7.13702 10.8727Z"
                                        fill="#E4E4E4"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2001_489">
                                        <rect
                                          width="6.66667"
                                          height="12.8265"
                                          fill="white"
                                          transform="translate(13.9307 5.22998) rotate(90)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </p>
                                <TextNumber
                                  placeholder={""}
                                  label={""}
                                  svg={false}
                                  width={"w-[48%] h-[40px] "}
                                  max={""}
                                  data={amountMinLimit}
                                  setData={setAmountMinLimit}
                                  styleLabel={
                                    "text-[1rem] xl:text-[1rem] text-black hidden"
                                  }
                                  styleInput={
                                    "text-[1rem] xl:text-[1rem] h-[30px] "
                                  }
                                  styleError={""}
                                  styleBox={"bg-[#ffffff] rounded-full"}
                                  styleBox2={"bg-white "}
                                />
                                <p className="w-[48%] rounded-full bg-[#ffffff] shadow-custom-6 flex gap-2 justify-center items-center">
                                  کوچکتر از
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                  >
                                    <rect
                                      x="0.0361328"
                                      y="0.785645"
                                      width="14.9642"
                                      height="15"
                                      rx="7.4821"
                                      fill="#969696"
                                    />
                                    <g clipPath="url(#clip0_2001_489)">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.13702 10.8727L4.11371 7.72989L4.86941 6.94434L7.51487 9.69434L10.1603 6.94434L10.916 7.72989L7.89271 10.8727C7.79249 10.9768 7.65658 11.0353 7.51487 11.0353C7.37315 11.0353 7.23724 10.9768 7.13702 10.8727Z"
                                        fill="#E4E4E4"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2001_489">
                                        <rect
                                          width="6.66667"
                                          height="12.8265"
                                          fill="white"
                                          transform="translate(13.9307 5.22998) rotate(90)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </p>
                                <TextNumber
                                  placeholder={""}
                                  label={""}
                                  svg={false}
                                  width={"w-[48%] h-[40px]"}
                                  max={""}
                                  data={amountMaxLimit}
                                  setData={setAmountMaxLimit}
                                  styleLabel={
                                    "text-[1rem] xl:text-[1rem] text-black hidden"
                                  }
                                  styleInput={
                                    "text-[1rem] xl:text-[1rem] h-[30px]"
                                  }
                                  styleError={""}
                                  styleBox={"bg-[#ffffff] rounded-full"}
                                  styleBox2={"bg-white"}
                                />
                              </div>
                              <div className="w-[20%]">
                                <svg
                                  className="cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 33 33"
                                  fill="none"
                                >
                                  <path
                                    d="M4 16.7178C4 9.81421 9.59644 4.21777 16.5 4.21777C23.4036 4.21777 29 9.81421 29 16.7178C29 23.6213 23.4036 29.2178 16.5 29.2178C9.59644 29.2178 4 23.6213 4 16.7178Z"
                                    fill="#969696"
                                  />
                                  <path d="M16 17.2178H11H16Z" fill="white" />
                                  <path
                                    d="M16 12.2178V17.2178M16 17.2178V22.2178M16 17.2178H21M16 17.2178H11"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="w-[48%] flex flex-wrap">
                            <p className="w-full text-[1.1rem]">
                              محدودیت ریالی :
                            </p>
                            <div className="w-full flex gap-1">
                              <p className="w-[48%] h-[40px] rounded-full bg-[#ffffff] shadow-custom-6 flex gap-2 justify-center items-center">
                                بزرگتر از
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="16"
                                  viewBox="0 0 15 16"
                                  fill="none"
                                >
                                  <rect
                                    x="0.0361328"
                                    y="0.785645"
                                    width="14.9642"
                                    height="15"
                                    rx="7.4821"
                                    fill="#969696"
                                  />
                                  <g clipPath="url(#clip0_2001_489)">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M7.13702 10.8727L4.11371 7.72989L4.86941 6.94434L7.51487 9.69434L10.1603 6.94434L10.916 7.72989L7.89271 10.8727C7.79249 10.9768 7.65658 11.0353 7.51487 11.0353C7.37315 11.0353 7.23724 10.9768 7.13702 10.8727Z"
                                      fill="#E4E4E4"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2001_489">
                                      <rect
                                        width="6.66667"
                                        height="12.8265"
                                        fill="white"
                                        transform="translate(13.9307 5.22998) rotate(90)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </p>
                              <TextNumber
                                placeholder={""}
                                label={""}
                                svg={false}
                                width={"w-[48%] h-[40px] "}
                                max={""}
                                data={costMinLimit}
                                setData={setCostMinLimit}
                                styleLabel={
                                  "text-[1rem] xl:text-[1rem] text-black hidden"
                                }
                                styleInput={
                                  "text-[1rem] xl:text-[1rem] h-[30px] "
                                }
                                styleError={""}
                                styleBox={"bg-[#ffffff] rounded-full"}
                                styleBox2={"bg-white "}
                              />
                              <div className="w-[20%] h-[40px]">
                                <svg
                                  className="cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 33 33"
                                  fill="none"
                                >
                                  <path
                                    d="M4 16.7178C4 9.81421 9.59644 4.21777 16.5 4.21777C23.4036 4.21777 29 9.81421 29 16.7178C29 23.6213 23.4036 29.2178 16.5 29.2178C9.59644 29.2178 4 23.6213 4 16.7178Z"
                                    fill="#969696"
                                  />
                                  <path d="M16 17.2178H11H16Z" fill="white" />
                                  <path
                                    d="M16 12.2178V17.2178M16 17.2178V22.2178M16 17.2178H21M16 17.2178H11"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <TextArea
                          label={"توضیح شرط :"}
                          width={"w-[100%] h-[100px]"}
                          placeholder={"توضیحات خورد را وارد کنید"}
                          checked={checked2}
                          data={conditionDescription}
                          setData={setConditionDescription}
                          styleTextarea={"bg-white"}
                          styleLabel={"black"}
                        />
                      </div>
                      <div className="w-[50%] px-2 flex flex-wrap justify-between">
                      <div className="w-[48%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full"> نام خریداران :</p>
                             <SelectAllInput options={options5}  setData={''} hasError={false}/>
                          </div>
                      <div className="w-[48%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full"> لیست کالای شروط :</p>
                             <SelectAllInput options={options2} data={goodIds}  setData={setGoodIds} hasError={styleError2}/>
                          </div>
                        {/* <SelectAll
                          label={"نام خریداران :"}
                          svg={true}
                          width={"w-[48%] h-[200px]"}
                          height={
                            "h-[100px] bg-[rgba(255,255,255,0.5)] shadow-none"
                          }
                          height2={"h-[35px] "}
                          checked={checked1}
                          options={options5}
                          setIdMainCategory={""}
                          idMainCategory={""}
                          head={"نام خریدار"}
                          styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
                          styleInput={"text-[1rem] xl:text-[1rem]"}
                          styleError={""}
                          styleBox={"h-[40px]"}
                          styleBox2={""}
                        /> */}
                        {/* <SelectAll
                          label={"لیست کالای شروط :"}
                          svg={true}
                          width={"w-[48%] h-[200px]"}
                          height={
                            "h-[100px] bg-[rgba(255,255,255,0.5)] shadow-none"
                          }
                          height2={"h-[35px] "}
                          options={options2}
                          checked={checked2}
                          idMainCategory={goodIds}
                          setIdMainCategory={setGoodIds}
                          head={"کالای شروط"}
                          styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
                          styleInput={"text-[1rem] xl:text-[1rem]"}
                          styleError={styleError2}
                          styleBox={"h-[40px]"}
                          styleBox2={""}
                        /> */}
                      </div>
                    </div>
                    <p className="w-full">
                      نتیجه{" "}
                      <span className="text-red-600 ">
                        *در این بخش فقط می توان یکی را انتخاب کرد*
                      </span>
                    </p>
                    <div className="w-full flex">
                      <div className="w-[75%] bg-[rgba(255,255,255,0.5)] rounded-2xl flex justify-around pb-3">
                        <div className="w-[30%] flex justify-between items-end">
                          <div className="h-[40px]">
                            <CheckBoxAccordion2
                              label={""}
                              isChecked={activeCheckbox1 === 0}
                              onCheck={() => handleCheck1(0)}
                            />
                          </div>
                          <TextPercentage
                            placeholder={""}
                            label={"درصد کسر زیر فاکتور :"}
                            svg={false}
                            width={"w-[80%]"}
                            data={invoiceDiscountPercent}
                            setData={setInvoiceDiscountPercent}
                            styleLabel={
                              "text-[1rem] xl:text-[1.1rem] text-black"
                            }
                            styleInput={`text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] ${
                              d1 == true ? "placeholder:text-white" : ""
                            }`}
                            styleError={styleError3}
                            disabled={d1}
                            styleBox={`${
                              d1 == true
                                ? "bg-[rgb(150,150,150)]"
                                : "bg-[#ffffff]"
                            }`}
                          />
                        </div>
                        <div className="w-[30%] flex justify-between items-end">
                          <div className="h-[40px]">
                            <CheckBoxAccordion2
                              label={""}
                              isChecked={activeCheckbox1 === 1}
                              onCheck={() => handleCheck1(1)}
                            />
                          </div>
                          <TextPercentage
                            placeholder={""}
                            label={"درصد تخفیف کالایی :"}
                            svg={true}
                            width={"w-[80%]"}
                            data={goodDiscountPercent}
                            setData={setGoodDiscountPercent}
                            styleLabel={
                              "text-[1rem] xl:text-[1.1rem] text-black"
                            }
                            styleInput={`text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] ${
                              d2 == true ? "placeholder:text-white" : ""
                            }`}
                            styleError={styleError4}
                            disabled={d2}
                            styleBox={`${
                              d2 == true
                                ? "bg-[rgb(150,150,150)]"
                                : "bg-[#ffffff]"
                            }`}
                          />
                        </div>
                        <div className="w-[30%] flex justify-between items-end">
                          <div className="h-[40px]">
                            <CheckBoxAccordion2
                              label={""}
                              isChecked={activeCheckbox1 === 2}
                              onCheck={() => handleCheck1(2)}
                            />
                          </div>
                          <TextPercentage2
                            placeholder={"نام کالا"}
                            label={"کالای هدیه :"}
                            svg={true}
                            width={"w-[80%]"}
                            data={giftItem}
                            setData={setGiftItem}
                            styleLabel={
                              "text-[1rem] xl:text-[1.1rem] text-black"
                            }
                            styleInput={`text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] ${
                              d3 == true ? "placeholder:text-white" : ""
                            }`}
                            styleError={styleError5}
                            disabled={d3}
                            styleBox={`${
                              d3 == true
                                ? "bg-[rgb(150,150,150)]"
                                : "bg-[#ffffff]"
                            }`}
                          />
                        </div>
                      </div>

                      <div></div>
                    </div>
                  </article>
                  <article className="w-full flex justify-center items-center">
                    <div className="w-[40%]">
                      <Button
                        value={"ثبت"}
                        click={() => sendForm(event)}
                        styleButton={8}
                      />
                    </div>
                  </article>
                  <article className="w-full flex justify-center items-center pb-4">
                    <Table
                      token={token}
                      updateTable={updateTable}
                      setUpdateTable={setUpdateTable}
                    />
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
          <div className="w-full h-[50px] flex justify-center items-center pt-1">
            <WithSupport2 />
          </div>
      </div>
       )}
      <Load load={load} text={"در حال ثبت تخفیفات لطفا منتظر بمانید ..."} />
    </>
  );
}

export default SalesDiscounts;
function Svg1() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
      >
        <path
          d="M19.7746 13.8772L17.6923 11.8237V9.10331C17.6899 7.22335 16.9808 5.41104 15.702 4.01682C14.4233 2.6226 12.6657 1.74551 10.7692 1.55515V0H9.23077V1.55515C7.33429 1.74551 5.57674 2.6226 4.29798 4.01682C3.01921 5.41104 2.31008 7.22335 2.30769 9.10331V11.8237L0.225385 13.8772C0.0811159 14.0195 4.35672e-05 14.2124 0 14.4136V16.6894C0 16.8906 0.0810437 17.0836 0.225302 17.2258C0.369561 17.3681 0.565218 17.448 0.769231 17.448H6.15385V18.0375C6.13677 18.9999 6.48062 19.9348 7.11943 20.6626C7.75825 21.3905 8.64706 21.8601 9.61539 21.9815C10.1501 22.0338 10.6901 21.9751 11.2005 21.8093C11.7108 21.6434 12.1804 21.3741 12.5789 21.0185C12.9774 20.663 13.296 20.2291 13.5142 19.7448C13.7325 19.2605 13.8456 18.7366 13.8462 18.2066V17.448H19.2308C19.4348 17.448 19.6304 17.3681 19.7747 17.2258C19.919 17.0836 20 16.8906 20 16.6894V14.4136C20 14.2124 19.9189 14.0195 19.7746 13.8772ZM12.3077 18.2066C12.3077 18.8102 12.0646 19.3891 11.6318 19.8159C11.199 20.2427 10.612 20.4825 10 20.4825C9.38796 20.4825 8.80099 20.2427 8.36821 19.8159C7.93544 19.3891 7.69231 18.8102 7.69231 18.2066V17.448H12.3077V18.2066ZM18.4615 15.9308H1.53846V14.7276L3.62077 12.6741C3.76504 12.5319 3.84611 12.3389 3.84615 12.1377V9.10331C3.84615 7.49375 4.4945 5.9501 5.64857 4.81197C6.80264 3.67383 8.3679 3.03444 10 3.03444C11.6321 3.03444 13.1974 3.67383 14.3514 4.81197C15.5055 5.9501 16.1538 7.49375 16.1538 9.10331V12.1377C16.1539 12.3389 16.235 12.5319 16.3792 12.6741L18.4615 14.7276V15.9308Z"
          fill="white"
        />
      </svg>
    </>
  );
}

function Svg2() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M19 9.52527C19.0028 11.2182 18.4714 12.8732 17.474 14.2778C16.6514 15.4404 15.5391 16.393 14.2356 17.0513C12.932 17.7097 11.4772 18.0536 10 18.0525C8.52277 18.0536 7.06804 17.7097 5.76444 17.0513C4.46085 16.393 3.34858 15.4404 2.526 14.2778C1.74273 13.1715 1.2439 11.9068 1.06951 10.585C0.895109 9.26313 1.05 7.92097 1.52175 6.66607C1.9935 5.41117 2.769 4.27845 3.78607 3.3587C4.80314 2.43896 6.0335 1.75777 7.37851 1.36975C8.72352 0.981736 10.1458 0.897681 11.5312 1.12433C12.9167 1.35097 14.2269 1.88201 15.3567 2.67488C16.4865 3.46774 17.4046 4.50038 18.0373 5.69C18.67 6.87963 18.9997 8.19315 19 9.52527Z"
          stroke="#424242"
          strokeWidth="2"
        />
        <path
          d="M10.9998 6.68275C10.9998 6.93403 10.8944 7.17503 10.7069 7.35271C10.5193 7.5304 10.265 7.63022 9.99976 7.63022V9.52517C10.7954 9.52517 11.5585 9.2257 12.1211 8.69264C12.6837 8.15958 12.9998 7.4366 12.9998 6.68275H10.9998ZM9.99976 7.63022C9.73454 7.63022 9.48019 7.5304 9.29265 7.35271C9.10511 7.17503 8.99976 6.93403 8.99976 6.68275H6.99976C6.99976 7.4366 7.31583 8.15958 7.87844 8.69264C8.44105 9.2257 9.20411 9.52517 9.99976 9.52517V7.63022ZM8.99976 6.68275C8.99976 6.43146 9.10511 6.19047 9.29265 6.01278C9.48019 5.8351 9.73454 5.73528 9.99976 5.73528V3.84033C9.20411 3.84033 8.44105 4.1398 7.87844 4.67286C7.31583 5.20591 6.99976 5.92889 6.99976 6.68275H8.99976ZM9.99976 5.73528C10.265 5.73528 10.5193 5.8351 10.7069 6.01278C10.8944 6.19047 10.9998 6.43146 10.9998 6.68275H12.9998C12.9998 5.92889 12.6837 5.20591 12.1211 4.67286C11.5585 4.1398 10.7954 3.84033 9.99976 3.84033V5.73528ZM3.16576 15.0736L2.20676 14.8035L2.05176 15.2991L2.40676 15.6904L3.16576 15.0736ZM16.8338 15.0736L17.5938 15.6904L17.9478 15.2991L17.7928 14.8035L16.8338 15.0736ZM6.99976 13.3151H12.9998V11.4201H6.99976V13.3151ZM6.99976 11.4201C5.92281 11.4198 4.87454 11.7489 4.01093 12.3586C3.14733 12.9682 2.51455 13.8257 2.20676 14.8035L4.12376 15.3436C4.30873 14.7572 4.68855 14.243 5.20673 13.8775C5.72491 13.512 6.35376 13.3147 6.99976 13.3151V11.4201ZM9.99976 17.1049C8.84525 17.1062 7.7042 16.87 6.65537 16.4128C5.60654 15.9556 4.6749 15.2883 3.92476 14.4568L2.40676 15.6904C3.34464 16.7293 4.50914 17.5632 5.81999 18.1345C7.13084 18.7059 8.55686 19.0011 9.99976 18.9999V17.1049ZM12.9998 13.3151C14.3568 13.3151 15.5058 14.1697 15.8758 15.3445L17.7928 14.8035C17.485 13.8259 16.8514 12.9685 15.988 12.3588C15.1246 11.7492 14.0765 11.42 12.9998 11.4201V13.3151ZM16.0748 14.4568C15.3246 15.2883 14.393 15.9556 13.3441 16.4128C12.2953 16.87 11.1543 17.1062 9.99976 17.1049V18.9999C11.4427 19.0011 12.8687 18.7059 14.1795 18.1345C15.4904 17.5632 16.6559 16.7293 17.5938 15.6904L16.0748 14.4568Z"
          fill="#424242"
        />
      </svg>
    </>
  );
}
