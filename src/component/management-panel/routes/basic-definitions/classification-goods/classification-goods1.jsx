import img1 from "/img/head-1.webp";
import Table1 from "./table1.jsx";

import {
  React,
  useState,
  WithSupport2,
  Button,
  TextFull,
  TextNumber,
  Load,
  CheckMessage,
  useSelector,
  categoryCreate
} from '@/component/management-panel/import-management.js'

function ClassificationOfGoods1() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [level, setLevel] = useState(0);
  const [parentCategoryId, setParentCategoryId] = useState(0);
  const [styleError1, setStyleError1] = useState(false);
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [updateTable, setUpdateTable] = useState(false);

  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);

  const sendForm = async () => {
    if (!name) {
      setStyleError1(true);
    } else {
      setLoad(true);
      try {
        const result = await categoryCreate(
          name,
          code,
          1,
          null,
          token,
          chabk,
         setMessage
        );
        if (result.isSuccess == true) {
          setTimeout(() => {
            setCheck((r) => ({ ...r, check1: true }));
            setName("");
            setCode("");
            setLoad(false);
            setUpdateTable(!updateTable);
            setMessage(result.error ? result.error : result.message);
          }, 2000);
        } else if (result.isSuccess == false) {
          setTimeout(() => {
            setCheck((r) => ({ ...r, check4: true }));
            setName("");
            setCode("");
            setLoad(false);
            setUpdateTable(!updateTable);
            setMessage(result.error ? result.error : result.message);
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad(false);
        }, 2000);
      } finally {
        setTimeout(() => {
          setLoad(false);
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({ ...r, check4: false }));
            setCheck((r) => ({ ...r, check1: false }));
          }, 5000);
        }, 2000);
      }
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
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full min-h-[100vh] flex 2xl:container justify-center flex-wrap content-between">
          <section className="w-[81%]  pt-10">
            <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
              <img src={img1} alt="" className="w-full h-full rounded-2xl" />
            </div>
            <div className="w-full py-5">
              <div
                dir="ltr"
                className="w-full"
              >
                <div dir="rtl" className="w-full h-full">
                  <section className="w-full h-full flex flex-wrap px-4 pb-2 gap-4">
                    <h3 className="w-full flex justify-center text-[1.3rem] ">
                      دسته بندی سطح یک
                    </h3>
                    <article className="w-[100%] rounded-2xl shadow-custom-7 boxFilter px-5 flex gap-8 py-5 flex-wrap justify-around items-center">
                      <div className="w-[100%]">
                      <div className="w-[70%] flex gap-5 items-center pb-3">
                        <TextFull
                          pattern={/^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/}
                          placeholder={"لطفا نوع دسته بندی را وارد کنید..."}
                          label={"* نوع دسته بندی :"}
                          svg={false}
                          width={"w-[100%] h-[60px]"}
                          data={name}
                          setData={setName}
                          styleLabel={"text-[1rem] xl:text-[1rem] "}
                          styleInput={
                            "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                          }
                          styleError={styleError1}
                          styleBox={"bg-[#ffffff]"}
                        />
                        <TextNumber
                          placeholder={""}
                          label={"کد :"}
                          svg={false}
                          width={"w-[100%] h-[60px]"}
                          max={""}
                          data={code}
                          setData={setCode}
                          styleLabel={"text-[1rem] lg:text-[1rem] text-black"}
                          styleInput={
                            "text-[1rem] lg:text-[1.2rem] h-[40px] lg:h-[35px]"
                          }
                          styleBox={"bg-[#ffffff]"}
                        />
                      </div>
                      </div>
                      <div className="w-[20%] flex items-end pb-2">
                        <Button
                          value={"ثبت"}
                          click={() => sendForm(event)}
                          styleButton={10}
                        />
                      </div>
                    </article>
                    <article className="w-[100%] flex justify-center">
                    {/* <Table1 token={token} chabk={chabk} /> */}
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
          text={"در حال ثبت نوع بسته بندی لطفا منتظر بمانید ..."}
        />
      </div>
    </>
  );
}

export default ClassificationOfGoods1;
