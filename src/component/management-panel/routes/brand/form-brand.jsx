import { Controller, useForm } from "react-hook-form";
import {
  React,
  useEffect,
  useRef,
  useCallback,
  useState,
  useSelector,
  GetCookie,
  InputTextNoValid,
  File,
  supplierNameGetAll,
  InputSelect,
  sendBrandRegistration,
} from "@/component/management-panel/import-management.js";

const FormBrand = ({
  setLoad,
  setLoad2,
  setLoad3,
  setCheckData,
  setCheckDataAll,
  setMessageData,
  setUpdateTable,
  updateTable,
  setCheck,
  setMessage,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  //   ********
  const [options4, setOptions4] = useState([{ key: "", value: "" }]);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [dataFile, setDataFile] = useState("");
  const [dataFile2, setDataFile2] = useState(null);

  //   **********

  const GetSupplier = useCallback(() => {
    const keyword = "";
    supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions4(data);
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
  //   **********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      name1,
      name2,
      ownerId,
      dataFile,
      dataFile2,
    },
  });

  useEffect(() => {
    reset({
      name1,
      name2,
      ownerId,
      dataFile,
      dataFile2,
    });
  }, [name1, name2, ownerId, dataFile, dataFile2, reset]);

  const onSubmit = async (dataAll) => {

    const updatedDataAll = {
      name: dataAll?.name1,
      enName: dataAll?.name2,
      ownerId: dataAll?.ownerId,
      logo: dataAll?.dataFile ? dataAll?.dataFile : null,
      priceList: dataAll?.dataFile2 ? dataAll?.dataFile2 : null,
    };

    setLoad3(true);
    try {
      const result = await sendBrandRegistration(
        updatedDataAll,
        token,
        chabk,
        setMessage
      );
      if (result.isSuccess == true) {
        setMessage(result.error ? result.error : result.message);
        setUpdateTable(!updateTable);
        setTimeout(() => {
          setCheck((r) => ({ ...r, check1: true }));
          setName1("");
          setName2("");
          setOwnerId("");
          setDataFile("");
          setDataFile2("");
          setLoad3(false);
        }, 2000);
      } else if (result.isSuccess == false) {
        setMessage(result.error ? result.error : result.message);
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad3(false);
        }, 2000);
      }
    } catch (error) {
      setLoad3(false);
      setCheck((r) => ({ ...r, check4: true }));
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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-4 justify-center"
    >
      <div
        dir="rtl"
        className="w-[100%] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-around flex-wrap boxFilter"
      >
        <div className="w-[100%] lg:w-[45%] flex flex-wrap">
          <Controller
            name="name1"
            control={control}
            rules={{
              required: {
                value: true,
                message: "وارد کردن نام برند به فارسی الزامی است",
              },
              pattern: {
                value: /^[\u0600-\u06FF\s0-9]+$/,
                message: "فقط حروف فارسی و اعداد مجاز هستند",
              },
            }}
            render={({ field }) => (
              <InputTextNoValid
                {...field}
                type="text"
                placeholder={"نام برند"}
                label={"نام برند به فارسی :"}
                svg={false}
                width={`w-[100%]`}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    !value.startsWith(" ") &&
                    /^[\u0600-\u06FF\s0-9]*$/.test(value)
                  ) {
                    setName1(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] placeholder:text-[1rem]"
                }
                styleBox={"bg-[#ffffff]"}
              />
            )}
          />

          {errors.name1 && (
            <p style={{ color: "red" }}>{errors.name1.message}</p>
          )}
        </div>

        <div className="w-[100%] lg:w-[45%] flex flex-wrap">
          <Controller
            name="name2"
            control={control}
            rules={{
              required: {
                value: true,
                message: "وارد کردن نام برند به انگلیسی الزامی است",
              },
              pattern: {
                value: /^[A-Za-z0-9\s]+$/,
                message: "فقط حروف انگلیسی و اعداد مجاز هستند",
              },
            }}
            render={({ field }) => (
              <InputTextNoValid
                {...field}
                type="text"
                placeholder={"name"}
                label={"نام برند به لاتین:"}
                svg={false}
                width={`w-[100%]`}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value.startsWith(" ") && /^[A-Za-z0-9\s]*$/.test(value)) {
                    setName2(value);
                    field.onChange(e);
                  }
                }}
                styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                styleInput={
                  "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px] placeholder:text-[1rem]"
                }
                styleBox={"bg-[#ffffff]"}
              />
            )}
          />
          {errors.name2 && (
            <p style={{ color: "red" }}>{errors.name2.message}</p>
          )}
        </div>

        <div className="w-[100%] lg:w-[45%] flex flex-wrap">
          <p className="w-full">
            <span className="text-red-500">*</span> نوع بسته مالک برند :
          </p>
          <Controller
            name="ownerId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "انتخاب مالک برند الزامی است",
              },
            }}
            render={({ field }) => (
              <InputSelect
                options={options4}
                data={field.value}
                setData={(selected) => {
                  field.onChange(selected);
                }}
              />
            )}
          />
          {errors.ownerId && (
            <p style={{ color: "red" }}>{errors.ownerId.message}</p>
          )}
        </div>
        <div className="w-full flex justify-around flex-wrap gap-5">
          <div className="w-[100%] lg:w-[45%] flex flex-wrap">
            <Controller
              name="dataFile"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "آپلود آرم برند الزامی است",
                },
              }}
              render={({ field }) => (
                <File
                  {...field}
                  width={"w-[100%] h-[60px]"}
                  label={"آرم برند را آپلود کنید :"}
                  setDataFile={(file) => {
                    field.onChange(file);
                  }}
                  style2={"h-[40px]"}
                  styleLabel={"text-black"}
                  type={1}
                  setLoad={setLoad}
                  fileType={"image"}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  updateTable={updateTable}
                />
              )}
            />
            {errors.dataFile && (
              <p style={{ color: "red" }}>{errors.dataFile.message}</p>
            )}
          </div>

          <div className="w-[100%] lg:w-[45%] flex flex-wrap">
            <Controller
              name="dataFile2"
              control={control}
              render={({ field }) => (
                <File
                  {...field}
                  width={"w-[100%] h-[60px]"}
                  label={"لیست قیمتی برند را آپلود کنید :"}
                  setDataFile={(file) => {
                    field.onChange(file);
                  }}
                  style2={"h-[40px]"}
                  styleLabel={"text-black"}
                  type={2}
                  setLoad={setLoad2}
                  fileType={"image"}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  updateTable={updateTable}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className={
            " w-[25%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت برند
        </button>
      </div>
    </form>
  );
};

export default FormBrand;
