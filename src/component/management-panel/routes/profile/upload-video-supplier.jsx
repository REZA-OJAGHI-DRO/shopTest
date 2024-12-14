




import {
  React,
  useCallback,
  useEffect,
  useState,
  WithSupport2,
  Button,
  File,
  SelectInput,
  Load,
  CheckMessage,
  Loading,
  loadUserGetAllPosition,
  useSelector,
  SupplierGetAll,
  SupplierGetFiles,
  addFile,
  SupplierUpdateMainFile,
  SupplierRemoveFile,
  GetCookie
} from '@/component/management-panel/import-management.js'

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
      <div className="fixed z-50 inset-0 bg-opacity-50 flex items-center justify-center boxFilter11">
        <div
          className={` ${style}  py-4 bg-[#f5f2fdda] shadow-custom-8 border-2 border-[#d892f8] boxFilter12 rounded-2xl overflow-hidden w-1/2`}
        >
          <div className="flex justify-between items-center overflow-y-scroll myElement px-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-red-500 text-[2rem]">
              &times;
            </button>
          </div>
          <div className="mt-4 flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

function UploadVideoSupplier() {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showViewModal2, setShowViewModal2] = useState(false);

  const [load, setLoad] = useState(false);
  const [checkAll, setCheckAll] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [checkData, setCheckData] = useState(false);
  const [messageData, setMessageData] = useState([]);

  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
    // check2: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const [play, setPlay] = useState("");
  const [dataVideo, setDataVideo] = useState();
  const [dataImage, setDataImage] = useState();
  const [check, setCheck] = useState(true);
  const [mainChoice, setMainChoice] = useState();
  const [styleError6, setStyleError6] = useState();
  const [loading, setLoading] = useState();
  const [id, setId] = useState(null);
  const [options1, setOptions1] = useState([{ key: "", value: "" }]);
  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  const [updateImage, setUpdateImage] = useState(false);

  const GetFiles = useCallback(() => {
    if (!id) return;
    setIsLoading(true);
    SupplierGetFiles(
      id,
      token,
      chabk,
      setMessageData,
      setCheckData,
      setData,
      setPlay,
      setCheckDataAll
    );
  }, [id, token, chabk ]);
  useEffect(() => {
    GetFiles();
  }, [GetFiles , updateImage]);
  

  const loadMainCategory5 = useCallback(async () => {
    if (roleCookie == "Admin") {
      setLoading(true);
      try {
        const keyword = "";
        const response = await SupplierGetAll(keyword, token, chabk);

        if (response?.isSuccess && Array.isArray(response.data)) {
          setOptions1(response.data);
          setLoading(false);
        } else {
          console.error("Invalid data format:", response);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    loadMainCategory5();
  }, [loadMainCategory5]);
// *********loadUserGetAllPosition

const [nameLogin, setNameLogin] = useState("");
const UserGet = useCallback(() => {
  loadUserGetAllPosition(roleCookie, token, chabk, setId, setNameLogin);
}, [roleCookie, token, chabk, setId, setNameLogin]);
useEffect(() => {
  UserGet();
}, [UserGet, id]);

  async function sendForm1() {
    // setMainChoice(play);
    setLoad(true);
    try {
      const result = await SupplierUpdateMainFile(
        id,
        play?.fileId,
        play?.fileType === 8 ? 10 : play?.fileType == 7 && 9,
        token,
        chabk
      );
      if (result.isSuccess == true) {
        setTimeout(() => {
          setMessage(result.error ? result.error : result.message);
          setLoad(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check1: true }));
          setUpdateImage(!updateImage)
        }, 2000);
      } else if (result.isSuccess == false) {
        setTimeout(() => {
          setMessage(result.error ? result.error : result.message);
          setLoad(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check4: true }));
        }, 2000);
      }
    } catch (error) {
      const result = await SupplierUpdateMainFile(
        id,
        play?.fileId,
        play?.fileType === 8 ? 10 : play?.fileType == 7 && 9,
        token,
        chabk
      );

      setTimeout(() => {
        if (result.isSuccess) {
          if (result.isSuccess == true) {
            setTimeout(() => {
              setMessage(result.error ? result.error : result.message);
              setLoad(false);
              setCheck(!check);
              setCheckAll((r) => ({ ...r, check1: true }));
            }, 2000);
          } else if (result.isSuccess == false) {
            setTimeout(() => {
              setMessage(result.error ? result.error : result.message);
              setLoad(false);
              setCheck(!check);
              setCheckAll((r) => ({ ...r, check4: true }));
            }, 2000);
          }
        } else {
          setTimeout(() => {
            setLoad(false);
            setCheck(!check);
            setMessage("درخواست شما ارسال نشد");
            setCheckAll((r) => ({ ...r, check4: true }));
          }, 2000);
        }
      }, 10000);
    } finally {
      setTimeout(() => {
        setLoad(false);
        setTimeout(() => {
          setMessage("");
          setCheckAll((r) => ({ ...r, check4: false }));
          setCheckAll((r) => ({ ...r, check1: false }));
        }, 5000);
      }, 2000);
    }
  }
  async function sendForm2() {
    setLoad(true);
    try {
      const result = await SupplierRemoveFile(id, play?.fileId, token, chabk);
      if (result.isSuccess == true) {
        setMessage(result.message || "پیغامی وجود ندارد");
        setTimeout(() => {
          setLoad(false);
          setShowViewModal(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check1: true }));
        }, 2000);
      } else if (result.isSuccess == false) {
        setMessage(result.message || "پیغامی وجود ندارد");
        setTimeout(() => {
          setLoad(false);
          setShowViewModal(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check4: true }));
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        setCheck(!check);
        setMessage("ارسال نشد ");
        setCheckAll((r) => ({ ...r, check4: true }));
      }, 2000);
    } finally {
      setTimeout(() => {
        setLoad(false);
        setTimeout(() => {
          setMessage("");
          setCheckAll((r) => ({ ...r, check4: false }));
          setCheckAll((r) => ({ ...r, check1: false }));
        }, 5000);
      }, 2000);
    }
  }
  function clickPlay(val) {
    setPlay(val);
  }
  function sendForm3() {
    setShowViewModal(true);
  }
  function sendForm4() {
    setShowViewModal2(true);
  }
  async function uploadVideo() {
    if (dataVideo) {
      setLoad(true);
      try {
        const result = await addFile(id, dataVideo, token, chabk);
        if (result.isSuccess == true) {
          setTimeout(() => {
            setMessage(result.error ? result.error : result.message);
            setLoad(false);
            setShowViewModal(false);
            setCheck(!check);
            setCheckAll((r) => ({ ...r, check1: true }));
          }, 2000);
        } else if (result.isSuccess == false) {
          setTimeout(() => {
            setMessage(result.error ? result.error : result.message);
            setLoad(false);
            setShowViewModal(false);
            setCheck(!check);
            setCheckAll((r) => ({ ...r, check4: true }));
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {
          setMessage("درخواست شما ارسال نشد ");
          setCheckAll((r) => ({ ...r, check4: true }));
          setLoad(false);
          setCheck(!check);
        }, 2000);
      } finally {
        setTimeout(() => {
          setLoad(false);
          setTimeout(() => {
            setMessage("");
            setCheckAll((r) => ({ ...r, check4: false }));
            setCheckAll((r) => ({ ...r, check1: false }));
          }, 5000);
        }, 2000);
      }
    }
  }
  async function uploadImage() {
    if (dataImage) {
      setLoad(true);
      try {
        const result = await addFile(id, dataImage, token, chabk);
        if (result && result.isSuccess == true) {
          setMessage(result.message || "پیغامی وجود ندارد");
          setTimeout(() => {
            setLoad(false);
            setShowViewModal2(false);
            setCheck(!check);
            setCheckAll((r) => ({ ...r, check1: true }));
          }, 2000);
        } else if (result && result.isSuccess == false) {
          setMessage(result.message || "پیغامی وجود ندارد");
          setTimeout(() => {
            setLoad(false);
            setShowViewModal2(false);
            setCheck(!check);
            setCheckAll((r) => ({ ...r, check4: true }));
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {
          setShowViewModal2(false);
          setLoad(false);
          setCheck(!check);
          setCheckAll((r) => ({ ...r, check4: true }));
          setMessage("ارسال نشد ");
        }, 2000);
      } finally {
        setTimeout(() => {
          setLoad(false);
          setTimeout(() => {
            setMessage("");
            setCheckAll((r) => ({ ...r, check1: false }));
            setCheckAll((r) => ({ ...r, check4: false }));
          }, 5000);
        }, 2000);
      }
    }
  }
  const closeModal = () => {
    setShowViewModal(false);
    setShowViewModal2(false);
  };

  return (
    <>
      <style>
        {`
        .boxFilter{
          background:#ffffff4f;
          backdrop-filter:blur(10px);
        }
        .boxFilter18{
          background:#ffffff4f;
          backdrop-filter:blur(10px);
          }
          .boxFilter4{
            backdrop-filter:blur(10px);
        }
            .player-wrapper {
  position: relative;
  padding-top: 56.25%;
  width: 100%;
  height: 350px; 
  overflow: hidden;
}
            .player-wrapper2 {
  position: relative;
  padding-top: 56.25%;
  width: 100%;
  height: 126px; 
  overflow: hidden;
}

.react-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
        `}
      </style>
      <CheckMessage message={message} check={checkAll} />
      {roleCookie == "Admin" ? (
       (id?(isLoading == true ?
          (
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
          )
          :
          <>
          <div className="w-full min-h-[100vh] flex justify-center flex-wrap content-between">
                <div className="w-[100%] flex justify-center flex-wrap">
                  {loading ? (
                    <Load load={loading} text={"در حال بارگذاری داده‌ها..."} />
                  ) : (
                    <>
                      <div className=" w-full h-[140px] relative">
                        <div className="w-full flex flex-wrap">
                          <div className="w-full flex justify-end pt-2">
                            <div className="flex gap-2">
                              <div className="bg-[#B886FF] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                                <Svg1 />
                              </div>
                              <div className="bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                                <Svg2 />
                              </div>
                              <p className=" h-[30px] text-[1.2rem] flex items-center justify-center">
                                {nameLogin}
                              </p>
                              <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                                <i className="bi bi-chevron-down"></i>
                              </div>
                            </div>
                          </div>
                          <h4 className="w-full text-center text-[2rem] text-zinc-800">
                            گالری تامین‌کننده
                          </h4>
                          <div
                            style={{
                              display: roleCookie == "Admin" ? "flex" : "none",
                            }}
                            className="w-[100%] h-[70px] flex justify-center items-center gap-4 z-50"
                          >
                             <div className="w-[40%] h-[70px] flex gap-3 content-center">
                <h4 className="flex items-center text-[1.2rem]">
                  نام تامین کننده
                </h4>
                <div className="w-[48%] flex-wrap flex justify-center content-center">
                  <SelectInput
                    options={options1}
                    setData={setId}
                    hasError={styleError6}
                  />
                </div>
              </div>
                    
                          </div>
                        </div>
                      </div>
                      <div className="w-full overflow-hidden relative">
                        <div className="w-full flex" dir="ltr">
                          <section
                            dir="rtl"
                            className="w-full h-full flex flex-wrap justify-center py-0"
                          >
                            <article className="w-[90%] h-auto flex flex-wrap bg-[#ffffff7f] rounded-2xl overflow-hidden">
                              <div className="w-[100%] xl:w-[55%] ">
                                <div className="w-full p-4 flex justify-center items-center">
                                  {(play && play?.fileType == 7) ||
                                  play?.fileType == 9 ? (
                                    <figure className="w-full h-[350px] flex justify-center items-center rounded-2xl overflow-hidden bg-black">
                                      <img
                                        className="h-full rounded-2xl overflow-hidden"
                                        src={play?.link}
                                        alt="Image"
                                      />
                                    </figure>
                                  ) : (
                                    <div className="player-wrapper rounded-2xl overflow-hidden w-[100%] h-[500px] object-cover bg-black">
                                      {/*  <ReactPlayer
                                className="react-player"
                                url={play?.link ? play?.link : ''}
                                controls={
                                  play?.fileType == 8 || play?.fileType == 10
                                    ? true
                                    : false
                                }
                                width="100%"
                                height="100%"
                              />*/}
                                    </div>
                                  )}
                                </div>
                                <div className="w-full flex justify-center gap-10">
                                  <div className="w-[30%]">
                                    <Button
                                      value={
                                        play?.fileType == 8 ||
                                        play?.fileType == 10
                                          ? "انتخاب بعنوان ویدئو اصلی"
                                          : "انتخاب بعنوان عکس اصلی"
                                      }
                                      click={() => sendForm1(event)}
                                      styleButton={18}
                                    />
                                  </div>
                                  <div className="w-[30%]">
                                    <Button
                                      value={
                                        play?.fileType == 8 ||
                                        play?.fileType == 10
                                          ? "حذف ویدئو"
                                          : "حذف عکس"
                                      }
                                      click={() => sendForm2(event)}
                                      styleButton={17}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="w-[100%] xl:w-[45%] h-[440px] overflow-hidden">
                                <div className="w-full h-full p-4 overflow-y-auto myElement flex flex-wrap justify-between content-start gap-5">
                                  {data &&
                                  data.filter((item) => item.fileType === 10)
                                    .length > 0 ? (
                                    <div className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl relative overflow-hidden">
                                      <div className="player-wrapper2 rounded-2xl overflow-hidden w-[100%]  object-cover bg-black">
                                        {/* <ReactPlayer
                                  className="react-player"
                                  url={
                                    data?.filter(
                                      (item) => item.fileType === 10
                                    )[0]?.link || ''
                                  }
                                  controls={false}
                                  width="100%"
                                  height="100%"
                                />*/}
                                        <div
                                          onClick={() =>
                                            clickPlay(
                                              data?.filter(
                                                (item) => item.fileType === 10
                                              )[0]
                                            )
                                          }
                                          className="cursor-pointer w-full h-full text-white bg-[rgba(0,0,0,.5)] absolute top-0 flex justify-center items-center"
                                        >
                                          ویدئو اصلی
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                  {data?.filter(
                                    (item) => item.fileType === 9
                                  ) ? (
                                    <div className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl relative overflow-hidden">
                                      <>
                                        <figure className="w-full h-[110px] flex justify-center items-center bg-black rounded-2xl overflow-hidden">
                                          <img
                                            className="h-full rounded-2xl overflow-hidden cursor-pointer absolute top-0 "
                                            src={
                                              data?.filter(
                                                (item) => item.fileType === 9
                                              )[0]?.link
                                            }
                                            alt="Image"
                                          />
                                        </figure>
                                        <div
                                          onClick={() =>
                                            clickPlay(
                                              data?.filter(
                                                (item) => item.fileType === 9
                                              )[0]
                                            )
                                          }
                                          className="cursor-pointer w-full h-full text-white bg-[rgba(0,0,0,.5)] absolute top-0 flex justify-center items-center"
                                        >
                                          عکس اصلی
                                        </div>
                                      </>
                                    </div>
                                  ) : null}
                                  {data &&
                                    data
                                      .filter(
                                        (item) =>
                                          item.fileType === 7 ||
                                          item.fileType === 8
                                      )
                                      .map((val, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl"
                                          >
                                            {val.fileType === 7 ? (
                                              <figure className="w-full h-[126px] flex justify-center rounded-2xl overflow-hidden items-center bg-black">
                                                <img
                                                  onClick={() => clickPlay(val)}
                                                  className="h-full rounded-2xl cursor-pointer"
                                                  src={val.link}
                                                  alt="Image"
                                                />
                                              </figure>
                                            ) : (
                                              val.fileType === 8 && (
                                                <div
                                                  onClick={() => clickPlay(val)}
                                                  className="cursor-pointer player-wrapper2 rounded-2xl overflow-hidden w-[100%] h-[126px] object-cover bg-black"
                                                >
                                                  {/*<ReactPlayer
                                            className="react-player"
                                            url={val?.link ? val?.link : ''}
                                            controls={false}
                                            width="100%"
                                            height="100%"
                                          />*/}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        );
                                      })}
                                </div>
                              </div>
                            </article>
                            <article className="w-[90%] py-2 flex justify-end items-center gap-5">
                              <div className="w-[20%]">
                                {/* <Button
                          value={"بارگذاری ویدئو جدید"}
                          click={() => sendForm3(event)}
                          styleButton={10}
                        />*/}
                              </div>
                              <div className="w-[20%]">
                                <Button
                                  value={"بارگذاری عکس جدید"}
                                  click={() => sendForm4(event)}
                                  styleButton={10}
                                />
                              </div>
                            </article>
                          </section>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full h-[4vh] flex justify-center items-center pt-0">
                  <WithSupport2 />
                </div>
              </div>
          </>)
          :
            <>
              <div
                style={{ display: roleCookie == "Admin" ? "flex" : "none" }}
                className="w-[100%] h-[100vh] flex justify-center items-center gap-4 z-50"
              >
                  <div className="w-[50%] h-[70px] flex gap-3 content-center">
                          <h4 className="flex items-center text-[1.2rem]">
                            نام تامین کننده
                          </h4>
                          <div className="w-[48%] flex-wrap flex justify-center content-center">
                            <SelectInput
                              options={options1}
                              setData={setId}
                              hasError={styleError6}
                            />
                          </div>
                        </div>
              </div>
            </>
          )
      ) : (
        <>
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
            <>
              <div className="w-full min-h-[100vh] flex justify-center flex-wrap content-between">
                <div className="w-[100%] flex justify-center flex-wrap">
                  {loading ? (
                    <Load load={loading} text={"در حال بارگذاری داده‌ها..."} />
                  ) : (
                    <>
                      <div className=" w-full h-[140px] relative">
                        <div className="w-full flex flex-wrap">
                          <div className="w-full flex justify-end pt-2">
                            <div className="flex gap-2">
                              <div className="bg-[#B886FF] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                                <Svg1 />
                              </div>
                              <div className="bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                                <Svg2 />
                              </div>
                              <p className=" h-[30px] text-[1.2rem] flex items-center justify-center">
                                {nameLogin}
                              </p>
                              <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                                <i className="bi bi-chevron-down"></i>
                              </div>
                            </div>
                          </div>
                          <h4 className="w-full text-center text-[2rem] text-zinc-800">
                            گالری تامین‌کننده
                          </h4>
                          <div
                            style={{
                              display: roleCookie == "Admin" ? "flex" : "none",
                            }}
                            className="w-[100%] h-[70px] flex justify-center items-center gap-4 z-50"
                          >
                            <div className="w-[50%] h-[70px] flex gap-3 content-center">
                          <h4 className="flex items-center text-[1.2rem]">
                            نام تامین کننده
                          </h4>
                          <div className="w-[48%] flex-wrap flex justify-center content-center">
                            <SelectInput
                              options={options1}
                              setData={setId}
                              hasError={styleError6}
                            />
                          </div>
                        </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full overflow-hidden relative">
                        <div className="w-full flex" dir="ltr">
                          <section
                            dir="rtl"
                            className="w-full h-full flex flex-wrap justify-center py-0"
                          >
                            <article className="w-[90%] h-auto flex flex-wrap bg-[#ffffff7f] rounded-2xl overflow-hidden">
                              <div className="w-[100%] xl:w-[55%] ">
                                <div className="w-full p-4 flex justify-center items-center">
                                  {(play && play?.fileType == 7) ||
                                  play?.fileType == 9 ? (
                                    <figure className="w-full h-[350px] flex justify-center items-center rounded-2xl overflow-hidden bg-black">
                                      <img
                                        className="h-full rounded-2xl overflow-hidden"
                                        src={play?.link}
                                        alt="Image"
                                      />
                                    </figure>
                                  ) : (
                                    <div className="player-wrapper rounded-2xl overflow-hidden w-[100%] h-[500px] object-cover bg-black">
                                      {/*  <ReactPlayer
                                className="react-player"
                                url={play?.link ? play?.link : ''}
                                controls={
                                  play?.fileType == 8 || play?.fileType == 10
                                    ? true
                                    : false
                                }
                                width="100%"
                                height="100%"
                              />*/}
                                    </div>
                                  )}
                                </div>
                                <div className="w-full flex justify-center gap-10">
                                  <div className="w-[30%]">
                                    <Button
                                      value={
                                        play?.fileType == 8 ||
                                        play?.fileType == 10
                                          ? "انتخاب بعنوان ویدئو اصلی"
                                          : "انتخاب بعنوان عکس اصلی"
                                      }
                                      click={() => sendForm1(event)}
                                      styleButton={18}
                                    />
                                  </div>
                                  <div className="w-[30%]">
                                    <Button
                                      value={
                                        play?.fileType == 8 ||
                                        play?.fileType == 10
                                          ? "حذف ویدئو"
                                          : "حذف عکس"
                                      }
                                      click={() => sendForm2(event)}
                                      styleButton={17}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="w-[100%] xl:w-[45%] h-[440px] overflow-hidden">
                                <div className="w-full h-full p-4 overflow-y-auto myElement flex flex-wrap justify-between content-start gap-5">
                                  {data &&
                                  data.filter((item) => item.fileType === 10)
                                    .length > 0 ? (
                                    <div className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl relative overflow-hidden">
                                      <div className="player-wrapper2 rounded-2xl overflow-hidden w-[100%]  object-cover bg-black">
                                        {/* <ReactPlayer
                                  className="react-player"
                                  url={
                                    data?.filter(
                                      (item) => item.fileType === 10
                                    )[0]?.link || ''
                                  }
                                  controls={false}
                                  width="100%"
                                  height="100%"
                                />*/}
                                        <div
                                          onClick={() =>
                                            clickPlay(
                                              data?.filter(
                                                (item) => item.fileType === 10
                                              )[0]
                                            )
                                          }
                                          className="cursor-pointer w-full h-full text-white bg-[rgba(0,0,0,.5)] absolute top-0 flex justify-center items-center"
                                        >
                                          ویدئو اصلی
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                  {data?.filter(
                                    (item) => item.fileType === 9
                                  ) ? (
                                    <div className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl relative overflow-hidden">
                                      <>
                                        <figure className="w-full h-[110px] flex justify-center items-center bg-black rounded-2xl overflow-hidden">
                                          <img
                                            className="h-full rounded-2xl overflow-hidden cursor-pointer absolute top-0 "
                                            src={
                                              data?.filter(
                                                (item) => item.fileType === 9
                                              )[0]?.link
                                            }
                                            alt="Image"
                                          />
                                        </figure>
                                        <div
                                          onClick={() =>
                                            clickPlay(
                                              data?.filter(
                                                (item) => item.fileType === 9
                                              )[0]
                                            )
                                          }
                                          className="cursor-pointer w-full h-full text-white bg-[rgba(0,0,0,.5)] absolute top-0 flex justify-center items-center"
                                        >
                                          عکس اصلی
                                        </div>
                                      </>
                                    </div>
                                  ) : null}
                                  {data &&
                                    data
                                      .filter(
                                        (item) =>
                                          item.fileType === 7 ||
                                          item.fileType === 8
                                      )
                                      .map((val, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className="w-[12rem] 2xl:w-[14rem] bg-black rounded-2xl"
                                          >
                                            {val.fileType === 7 ? (
                                              <figure className="w-full h-[126px] flex justify-center rounded-2xl overflow-hidden items-center bg-black">
                                                <img
                                                  onClick={() => clickPlay(val)}
                                                  className="h-full rounded-2xl cursor-pointer"
                                                  src={val.link}
                                                  alt="Image"
                                                />
                                              </figure>
                                            ) : (
                                              val.fileType === 8 && (
                                                <div
                                                  onClick={() => clickPlay(val)}
                                                  className="cursor-pointer player-wrapper2 rounded-2xl overflow-hidden w-[100%] h-[126px] object-cover bg-black"
                                                >
                                                  {/*<ReactPlayer
                                            className="react-player"
                                            url={val?.link ? val?.link : ''}
                                            controls={false}
                                            width="100%"
                                            height="100%"
                                          />*/}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        );
                                      })}
                                </div>
                              </div>
                            </article>
                            <article className="w-[90%] py-2 flex justify-end items-center gap-5">
                              <div className="w-[20%]">
                                {/* <Button
                          value={"بارگذاری ویدئو جدید"}
                          click={() => sendForm3(event)}
                          styleButton={10}
                        />*/}
                              </div>
                              <div className="w-[20%]">
                                <Button
                                  value={"بارگذاری عکس جدید"}
                                  click={() => sendForm4(event)}
                                  styleButton={10}
                                />
                              </div>
                            </article>
                          </section>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full h-[4vh] flex justify-center items-center pt-0">
                  <WithSupport2 />
                </div>
              </div>
            </>
          )}
        </>
      )}

      <Load load={load} text={"لطفا منتظر بمانید ..."} />

      {/* View Modal */}
      {showViewModal && (
        <Modal onClose={closeModal} title="آپلود ویدئو">
          <div className="w-[60%] flex justify-center flex-wrap gap-5 px-5">
            <File
              width={"w-[100%]"}
              label={""}
              setDataFile={setDataVideo}
              style2={"h-[80px]"}
              styleLabel={"text-white pb-3 text-[1.1rem] hidden"}
              type={8}
              setLoad={setLoad}
            />
            <div className="w-[40%]">
              <Button
                value={"ثبت"}
                click={() => uploadVideo(event)}
                styleButton={10}
              />
            </div>
          </div>
        </Modal>
      )}
      {/* View Modal */}
      {showViewModal2 && (
        <Modal onClose={closeModal} title="آپلود عکس">
          <div className="w-[60%] flex justify-center flex-wrap gap-5 px-5">
            <File
              width={"w-[100%]"}
              label={""}
              setDataFile={setDataImage}
              style2={"h-[80px]"}
              styleLabel={"text-white pb-3 text-[1.1rem] hidden"}
              type={7}
              setLoad={setLoad}
              fileType={"image"}
              setCheck={setCheck}
              setMessage={setMessage}
            />
            <p className="w-[100%] flex justify-center text-red-600">
              {message}
            </p>
            <div className="w-[40%]">
              <Button
                value={"ثبت"}
                click={() => uploadImage(event)}
                styleButton={10}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default UploadVideoSupplier;

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
