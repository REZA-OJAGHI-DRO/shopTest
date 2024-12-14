

import img1 from "/img/head-1.webp";
import "@/App.css";
import "@/index.css";
const Table = React.lazy(() => import("./table"));
import {
  React,
  useCallback,
  useEffect,
  Suspense,
  useRef,
  useState,
  WithSupport2,
  Button,
  TextFull,
  File,
  SelectInput,
  SelectInputMultiStage,
  TextNumber,
  Price,
  CheckBoxAccordion2,
  ImageUpload,
  Load,
  CheckMessage,
  Loading,
  GetAllUnit,
  loadUserGetAllPosition,
  sendRegisterOfGoods,
  useSelector,
  GetProductClassification,
  GetAllBrand,
  PackageTypeGetAll,
  supplierNameGetAll,
  GetCookie
} from '@/component/management-panel/import-management.js'



function RegisterOfGoods() {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [modal1, setModal1] = useState(false);
  const [valueModal1, setValueModal1] = useState("");
  const [valuesArrayModal2, setValuesArrayModal2] = useState("");

  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  const [data1, setData1] = useState("");
  const [dataEdit, setDataEdit] = useState();
  const [checked1, setChecked1] = useState(false);
  const [load5, setLoad5] = useState(false);
  const [dataImages, setDataImages] = useState([]);
  const [dataFile, setDataFile] = useState(null);
  const [dataAll, setDataAll] = useState([]);
  const [name, setName] = useState("");
  const [countInBox, setCountInBox] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [price, setPrice] = useState("");
  const [inStockCount, setInStockCount] = useState("");
  const [inStock, setInStock] = useState(true);
  const [unitId, setUnitId] = useState("");
  const [packageTypeId, setPackageTypeId] = useState("");
  const [nameSupplier, setNameSupplier] = useState(null);
  const [updateTable, setUpdateTable] = useState(false);

  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  const [styleError3, setStyleError3] = useState(false);
  const [styleError4, setStyleError4] = useState(false);
  const [styleError5, setStyleError5] = useState(false);
  const [styleError6, setStyleError6] = useState(false);
  const [styleError7, setStyleError7] = useState(false);
  const [styleError8, setStyleError8] = useState(false);

  // ******loadMessage
  const [load2, setLoad2] = useState(false);
  const [load, setLoad] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
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
    check3: false,
    check4: false,
    check5: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
// ************nameLogin
const [nameLogin, setNameLogin] = useState("");
const UserGet33 = useCallback(() => {
  if(roleCookie == 'Supplier'){
    loadUserGetAllPosition(roleCookie, token, chabk, setNameSupplier, setNameLogin);
  }
}, [roleCookie, token, chabk, setNameSupplier, setNameLogin]);
useEffect(() => {
  UserGet33();
}, [UserGet33, nameSupplier]);
  // *****ProductClassification
  const [options1, setOptions1] = useState([{ key: "", value: "" }]);
  const [options6, setOptions6] = useState([{ key: "", value: "" }]);
  const [options7, setOptions7] = useState([{ key: "", value: "" }]);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [parentCategoryId2, setParentCategoryId2] = useState(null);

  const UserGet = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      1,
      null,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions1(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, []);
  const isFirstRender1 = useRef(true);

  useEffect(() => {
    if (isFirstRender1.current) {
      UserGet();
      isFirstRender1.current = false;
    }
  }, [UserGet]);

  const UserGet2 = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      2,
      parentCategoryId,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions6(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [parentCategoryId]);

  useEffect(() => {
      UserGet2();
  }, [UserGet2]);

  const UserGet3 = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      3 ,
      parentCategoryId2,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions7(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [parentCategoryId2]);

  useEffect(() => {
      UserGet3();
  }, [UserGet3]);

  // ********* fetchGetAllBrand
  const [options2, setOptions2] = useState([{ key: "", value: "" }]);

  const GetBrand = useCallback(() => {
    setIsLoading(true);
    GetAllBrand(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions2(data);
      setCheckDataAll((r) => ({ ...r, check2: true }));
    });
  }, [token, chabk]);
  const isFirstRender2 = useRef(true);
  useEffect(() => {
    if (isFirstRender2.current) {
      GetBrand();
      isFirstRender2.current = false;
    }
  }, [GetBrand]);

  // *************fetchUnitGetAll
  const [options3, setOptions3] = useState([{ key: "", value: "" }]);

  const GetUnit = useCallback(() => {
    setIsLoading(true);
    GetAllUnit(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions3(data);
      setCheckDataAll((r) => ({ ...r, check3: true }));
    });
  }, [token, chabk]);
  const isFirstRender3 = useRef(true);
  useEffect(() => {
    if (isFirstRender3.current) {
      GetUnit();
      isFirstRender3.current = false;
    }
  }, [GetUnit]);

  // ********fetchPackageTypeGetAll
  const [options4, setOptions4] = useState([{ key: "", value: "" }]);

  const PackageTypeGet = useCallback(() => {
    setIsLoading(true);
    PackageTypeGetAll(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions4(data);
      setCheckDataAll((r) => ({ ...r, check4: true }));
    });
  }, [token, chabk]);
  const isFirstRender4 = useRef(true);
  useEffect(() => {
    if (isFirstRender4.current) {
      PackageTypeGet();
      isFirstRender4.current = false;
    }
  }, [PackageTypeGet]);

  // *******
  const [options5, setOptions5] = useState([{ key: "", value: "" }]);

  const GetSupplier = useCallback(() => {
    const keyword = "";
    supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions5(data);
        setCheckDataAll((r) => ({ ...r, check5: true }));
      }
    );
  }, [token, chabk]);
  const isFirstRender5 = useRef(true);
  useEffect(() => {
    if (isFirstRender5.current) {
      GetSupplier();
      isFirstRender5.current = false;
    }
  }, [GetSupplier]);

  // **********

  const handleCheck1 = (index) => {
    if (index !== activeCheckbox1) {
      setActiveCheckbox1(index);
      setChecked1(true);
      setData1(index === 0 ? 1 : 2);
    }
    if (activeCheckbox1 == 0) {
      setInStock(false);
    } else if (activeCheckbox1 == 1) {
      setInStock(true);
    }
  };

  const handleChangeModal1 = (e) => {
    const inputValue = e.target.value;
    setValueModal1(inputValue);
  };
  function sendFormModal1() {
    modal1 == true ? setModal1(false) : setModal1(true);
  }
  useEffect(() => {
    setDataAll((prev) => ({
      ...prev,
      supplierId: nameSupplier,
      name: name,
      countInBox: Number(countInBox),
      description: valueModal1,
      supplierCode: valuesArrayModal2,
      subCategoryId: subCategoryId,
      brandId: brandId,
      packageTypeId: packageTypeId,
      unitId: unitId,
      price: price,
      inStock: inStock,
      inStockCount: Number(inStockCount),
      images: dataImages,
    }));
  }, [
    nameSupplier,
    name,
    countInBox,
    valueModal1,
    valuesArrayModal2,
    subCategoryId,
    brandId,
    packageTypeId,
    unitId,
    price,
    inStock,
    inStockCount,
    dataImages,
  ]);

  const sendForm = async () => {
    if (!name) {
      setStyleError1(true);
    } else {
      setStyleError1(false);
    }
    if (!subCategoryId) {
      setStyleError2(true);
    } else {
      setStyleError2(false);
    }
    if (!valuesArrayModal2) {
      setStyleError3(true);
    } else {
      setStyleError3(false);
    }
    if (!packageTypeId) {
      setStyleError4(true);
    } else {
      setStyleError4(false);
    }
    if (!countInBox) {
      setStyleError5(true);
    } else {
      setStyleError5(false);
    }
    if (!unitId) {
      setStyleError6(true);
    } else {
      setStyleError6(false);
    }
    if (!price) {
      setStyleError7(true);
    } else {
      setStyleError7(false);
    }
    if (!nameSupplier) {
      setStyleError8(true);
    } else {
      setStyleError8(false);
    }
    if (
      name &&
      subCategoryId &&
      valuesArrayModal2 &&
      packageTypeId &&
      countInBox &&
      unitId &&
      price &&
      nameSupplier
    ) {
      setLoad2(true);
      try {
        const result = await sendRegisterOfGoods(
          dataAll,
          token,
          chabk,
          setMessage
        );
        setUpdateTable(!updateTable);
        setName("");
        if (result.isSuccess == true) {
          setMessage(result.message);
          setTimeout(() => {
            setCheck((r) => ({ ...r, check1: true }));
            setLoad2(false);
            setBrandId(null);
            setNameSupplier(0);
            setName("");
            setCountInBox("");
            setValueModal1("");
            setValuesArrayModal2("");
            setSubCategoryId(null);
            setParentCategoryId(null)
            setParentCategoryId2(null)
            setPackageTypeId(null);
            setUnitId("");
            setPrice("");
            setInStock(true);
            setInStockCount("");
            setDataImages([]);
            setImage([])
            setLoad2(false);
            setTimeout(() => {
              setUpdateTable(!updateTable);
              setCheck((r) => ({ ...r, check1: false }));
              setMessage("");
            }, 5000);
          }, 2000);
        } else if (result.isSuccess == false) {
          setMessage(result.message);
          setTimeout(() => {
            setLoad2(false);
            setCheck((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setCheck((r) => ({ ...r, check4: false }));
              setMessage("");
            }, 5000);
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {
          setLoad2(false);
          setCheck((r) => ({ ...r, check4: true }));
          setTimeout(() => {
            setCheck((r) => ({ ...r, check4: false }));
            setMessage("");
          }, 5000);
        }, 2000);
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

  // *********
  const [image, setImage] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = () => {
    setShowDeleteModal(false);
  };
  
  const [dataDelete, setDataDelete] = useState("");
  const deleteData = (e) => {
    e.preventDefault(); 
    const indexToDelete = parseInt(dataDelete, 10); 
    const updatedImages = image.filter((_, index) => index !== indexToDelete);
    const updatedDataImages  = dataImages.filter((_, index) => index !== indexToDelete);
    setDataImages(updatedDataImages ); 
    setImage(updatedImages); 
    setDataDelete("");
    setShowDeleteModal(false);
  };

// console.log(dataImages);
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
        <div className="w-full min-h-[100vh] flex justify-center">
          <div className="w-full  flex 2xl:container justify-center  flex-wrap content-between">
            <section className="w-[81%]  pt-10">
              <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
                <img src={img1} alt="" className="w-full h-full rounded-2xl" />
              </div>
              <div className="w-full py-5">
                <div dir="ltr" className="w-full">
                  <div dir="rtl" className="w-full h-full">
                    <section className="w-full h-full flex flex-wrap px-4 pb-2 gap-4">
                      <h3 className="w-full flex justify-center text-[1.3rem] ">
                        ثبت کالا
                      </h3>
                      <article className="w-full flex justify-between pb-4">
                        <div className="w-[50%] h-[70px] flex gap-3 content-center">
                          <h4 className="flex items-center text-[1.2rem]">
                            نام تامین کننده :
                          </h4>
                          <div className="w-[48%] flex-wrap flex justify-start content-center">
                            {roleCookie == 'Admin' ? 
                            <SelectInput
                            options={options5}
                            data={nameSupplier}
                            setData={setNameSupplier}
                            hasError={styleError8}
                            />
                          : nameLogin }
                          </div>
                        </div>
                        <div className="w-[50%] h-[70px] flex items-center justify-end">
                          <File
                            width={"w-[40%] h-[60px]"}
                            label={"بارگذاری فایل اکسل :"}
                            setDataFile={setDataFile}
                            style2={"h-[40px]"}
                            styleLabel={"text-black"}
                            type={""}
                          />
                          <div className="w-[80px] h-[70px] flex flex-wrap justify-center">
                            <h4>نمونه اکسل</h4>
                            <button className="bg-custom-green shadow-custom-6 w-[50px] h-[40px] py-2 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.3rem] md:text-[2rem] flex justify-center items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2rem"
                                height="1.2rem"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="currentColor"
                                  d="M15.534 1.36L14.309 0H4.662c-.696 0-.965.516-.965.919v3.63H5.05V1.653c0-.154.13-.284.28-.284h6.903c.152 0 .228.027.228.152v4.82h4.913c.193 0 .268.1.268.246v11.77c0 .246-.1.283-.25.283H5.33a.287.287 0 0 1-.28-.284V17.28H3.706v1.695c-.018.6.302 1.025.956 1.025H18.06c.7 0 .939-.507.939-.969V5.187l-.35-.38zm-1.698.16l.387.434l2.596 2.853l.143.173h-2.653q-.3 0-.38-.1q-.08-.098-.093-.313zm-1.09 9.147h4.577v1.334h-4.578zm0-2.666h4.577v1.333h-4.578zm0 5.333h4.577v1.334h-4.578zM1 5.626v10.667h10.465V5.626zm5.233 6.204l-.64.978h.64V14H3.016l2.334-3.51l-2.068-3.156H5.01L6.234 9.17l1.223-1.836h1.727L7.112 10.49L9.449 14H7.656z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </article>
                      <article className="w-[100%] px-4 py-2 rounded-2xl shadow-custom-6 justify-around boxFilter">
                        <div className="w-[100%] flex flex-wrap gap-2">
                        <div className="w-[100%] xl:w-[75%] justify-between px-4 flex flex-wrap gap-4 ">  
                        <TextFull
                          pattern={/^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/}
                          placeholder={"لطفا نام کالا را وارد کنید..."}
                          label={"* نام کالا :"}
                          svg={false}
                          width={"w-[100%] lg:w-[45%] xl:w-[30%] mt-1"}
                          data={name}
                          setData={setName}
                          styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                          styleInput={
                            "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                          }
                          styleError={styleError1}
                          styleBox={"bg-[#ffffff]"}
                        />
                        <TextNumber
                          width={"w-[100%] lg:w-[45%] xl:w-[30%] mt-1 "}
                          label={"* شناسه کد کالا تامین کننده :"}
                          styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                          styleError={styleError3}
                          styleBox={
                            "bg-[#ffffff]"
                          }
                          placeholder={"لطفا شناسه کد کالا را وارد کنید ..."}
                          svg={false}
                          max={""}
                          data={valuesArrayModal2}
                          setData={setValuesArrayModal2}
                          styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                        />
                        <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full"> برند کالا :</p>
                          <SelectInput
                            options={options2}
                            data={brandId}
                            setData={setBrandId}
                            hasError={false}
                          />
                        </div>
                        <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full">
                            <span className="text-red-500">*</span> نوع بسته
                            بندی کالا :
                          </p>
                          <SelectInput
                            options={options4}
                            data={packageTypeId}
                            setData={setPackageTypeId}
                            hasError={styleError4}
                          />
                        </div>
                        <TextNumber
                          placeholder={"* لطفا تعداد را وارد کنید ..."}
                          label={"* تعداد در کارتن یا عدل :"}
                          svg={false}
                          width={"w-[100%] lg:w-[45%] xl:w-[30%] mt-1"}
                          max={""}
                          data={countInBox}
                          setData={setCountInBox}
                          styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                          styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                          styleError={styleError5}
                          styleBox={"bg-[#ffffff]"}
                        />
                        <div className="w-[100%] lg:w-[45%] xl:w-[30%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full">
                            <span className="text-red-500">*</span> واحد کالا :
                          </p>
                          <SelectInput
                            options={options3}
                            data={unitId}
                            setData={setUnitId}
                            hasError={styleError6}
                          />
                        </div>
                     
                        </div>
                        <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex justify-center items-start">
                        <div className="w-[90%] flex-wrap flex justify-center content-center gap-2 mt-2">
                          <p className="w-full">
                            <span className="text-red-500">*</span> نوع دسته
                            بندی کالا :
                          </p>
                          <SelectInputMultiStage
                            options1={options1}
                            options2={options6}
                            options3={options7}
                            setData={setSubCategoryId}
                            setParentCategoryId={setParentCategoryId}
                            setParentCategoryId2={setParentCategoryId2}
                            hasError={styleError2}
                            data={subCategoryId}
                            parentCategoryId={parentCategoryId}
                            parentCategoryId2={parentCategoryId2}                          
                          />
                        </div> 
                         </div>
                        </div>
                         <div className="w-[100%] flex flex-wrap gap-4 justify-between px-4 py-4">
                        <Price
                          placeholder={"لطفا مبلغ را وارد کنید ..."}
                          label={"* قیمت اصلی بدون تخفیف :"}
                          svg={false}
                          width={"w-[100%] lg:w-[45%] xl:w-[23%]"}
                          max={""}
                          data={price}
                          setData={setPrice}
                          styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                          styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                          styleError={styleError7}
                          styleBox={"bg-[#ffffff]"}
                        />
                        <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex justify-around flex-wrap gap-1">
                          <p className="w-[100%] flex justify-start px-3 text-black text-[1rem] lg:text-[1rem] mb-2">
                            * موجودی کالا :
                          </p>
                          <div className="w-[40%]">
                            <CheckBoxAccordion2
                              label={"موجود"}
                              isChecked={activeCheckbox1 === 0}
                              onCheck={() => handleCheck1(0)}
                            />
                          </div>
                          <div className="w-[40%]">
                            <CheckBoxAccordion2
                              label={"ناموجود"}
                              isChecked={activeCheckbox1 === 1}
                              onCheck={() => handleCheck1(1)}
                            />
                          </div>
                        </div>
                        <TextNumber
                          placeholder={"لطفا تعداد موجودی را وارد کنید ..."}
                          label={"تعداد موجودی :"}
                          svg={false}
                          width={"w-[100%] lg:w-[45%] xl:w-[23%]"}
                          max={""}
                          data={inStockCount}
                          setData={setInStockCount}
                          styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                          styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                          styleError={""}
                          styleBox={"bg-[#ffffff]"}
                        />
                        <div className="w-[100%] lg:w-[45%] xl:w-[23%] flex justify-around flex-wrap gap-1">
                          <p className="w-[100%] flex justify-start px-3 text-black text-[1rem] lg:text-[1rem] mb-1">
                            توضیحات :
                          </p>
                          <div
                            onClick={() =>
                              modal1 == false
                                ? setModal1(true)
                                : setModal1(false)
                            }
                            className="w-full cursor-pointer hover:scale-95 transition-all duration-300 h-[40px] flex justify-between items-center text-zinc-600 shadow-custom-6 bg-[#ffffff] rounded-2xl px-3"
                          >
                            <p>توضیحات خود را وارد کنید</p>
                            <i className="bi bi-chevron-left"></i>
                          </div>
                        </div>
                        <ImageUpload
                          width={"w-[100%] lg:w-[60%] mt-2"}
                          label={"تصاویر کالا :"}
                          setData={setDataImages}
                          data={dataImages}
                          styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                          styleBox={" boxFilter"}
                          disabled={false}
                          type={3}
                          setLoad={setLoad}
                          fileType={"image"}
                          setCheck={setCheck}
                          setMessage={setMessage}
                          setShowDeleteModal={setShowDeleteModal}
                          setDataDelete={setDataDelete}
                          setImage={setImage}
                          image={image}
                        />
                        </div>
                      </article>

                      <article className="w-full h-[70px] flex justify-center items-center">
                        <div className="w-[30%]">
                          <Button
                            value={"ثبت"}
                            click={() => sendForm(event)}
                            styleButton={8}
                          />
                        </div>
                      </article>
                      <article className="w-full flex justify-center items-center pb-4">
                      <Suspense fallback={<div>Loading ViewShopper...</div>}>
                        <Table
                          type={1}
                          token={token}
                          updateTable={updateTable}
                          setUpdateTable={setUpdateTable}
                          id={nameSupplier}
                          setLoad5={setLoad5}
                          dataEdit={dataEdit}
                          setDataEdit={setDataEdit}
                        />
                      </Suspense>
                      </article>
                    </section>
                  </div>
                </div>
              </div>
            </section>
            <div className="w-full h-[50px] flex justify-center items-center">
              <WithSupport2 />
            </div>
          </div>
          <Load
            load={load}
            text={"در حال آپلود تصاویر لطفا منتظر بمانید ..."}
          />
          <Load load={load2} text={"در حال ثبت کالا لطفا منتظر بمانید ..."} />
          <Load load={load5} text={"در حال حذف کالا لطفا منتظر بمانید ..."} />
        </div>
      )}
      {/* modal */}
      <div
        style={{ display: modal1 == true ? "flex " : "none" }}
        className="w-full h-full  fixed top-0 right-0   z-50 bg-[rgb(72,72,72,.37)] boxFilter3  justify-center items-center"
      >
        <div className="w-[45%] h-[350px] bg-[rgba(255,255,255,.5)] boxFilter3 rounded-3xl">
          <div className="w-full h-[17%] flex justify-between px-5 items-center border-b border-white">
            <p>توضیحات</p>
            <i
              onClick={() => setModal1((prev) => !prev)}
              className="bi bi-x-lg text-zinc-600 cursor-pointer"
            ></i>
          </div>
          <div className="w-full h-[66%] flex justify-between px-5 py-5 border-b border-white">
            <textarea
              name=""
              id=""
              value={valueModal1}
              onChange={() => handleChangeModal1(event)}
              className="w-full h-full bg-transparent resize-none p-3 focus:border-none placeholder:text-zinc-500"
              placeholder="توضیحات خود را وارد کنید ..."
            ></textarea>
          </div>
          <div className="w-full h-[17%] flex justify-between items-center px-5 ">
            <Button
              value={"ثبت"}
              click={() => sendFormModal1(event)}
              styleButton={7}
            />
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این عکس را حذف کنید؟
            </p>
            <div className="w-[100%] flex justify-center">
              <Button
                value={"حذف"}
                click={() => deleteData(event)}
                styleButton={13}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default RegisterOfGoods;


const Modal = ({ onClose, title, children, style }) => {
  return (
    <>
      <style>
        {`
      .boxFilter11{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      .boxFilter12{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <div className="fixed w-[100vw] inset-0 bg-opacity-50 flex items-center justify-center boxFilter11">
        <div
          className={` ${style} w-[90vw] xl:w-[70vw]  py-4 bg-[rgba(251,242,252,0.9)] shadow-custom-8 border-2 border-[#d892f8] boxFilter12 rounded-2xl overflow-hidden`}
        >
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-red-500 text-[2rem]">
              &times;
            </button>
          </div>
          <div className="w-full h-[85%] px-4 mt-4 myElement overflow-y-auto py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};