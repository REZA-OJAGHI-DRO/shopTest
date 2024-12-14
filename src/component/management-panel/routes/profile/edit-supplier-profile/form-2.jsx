import { Controller, useForm } from "react-hook-form";
import {
  React,
  useEffect,
  useState,
  InputNumber,
  useSelector,
  GetCookie,
  City,
  InputTextArea,
  profileSupplierUpdate,
} from "@/component/management-panel/import-management.js";

const Form2 = ({
  data,
  setLoad,
  setLoad2,
  setCheck,
  setMessage,
  setUpdateTable,
  updateTable,
}) => {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));

  const [codePost, setCodePost] = useState("");
  const [address, setAddress] = useState("");
  const [dataCityId2, setDataCityId2] = useState("");
  const [dataCityId, setDataCityId] = useState();
  // ********

  // ********
  useEffect(() => {
    if (data) {
      setDataCityId2(data?.cityId);
      setDataCityId(data?.provinceId);
      setAddress(data?.address);
      setCodePost(data?.postalCode);
    }
  }, [data]);

  //   **********
  const {
    control,
    // register, // برای ثبت کردن فیلدها
    handleSubmit, // برای هندل کردن سابمیت فرم
    formState: { errors }, // برای مدیریت خطاها
    reset,
  } = useForm({
    defaultValues: {
      address,
      codePost,
      dataCityId2,
    },
  });

  useEffect(() => {
    reset({
      address,
      codePost,
      dataCityId2,
    });
  }, [address, codePost, dataCityId2, reset]);

  const [dataT, setDatadT] = useState(data);

  const onSubmit = async (dataAll) => {
    let hasChanged = false;
    hasChanged =
      dataT?.cityId !== dataCityId2 ||
      dataT?.address !== dataAll?.address ||
      dataT?.postalCode !== dataAll?.codePost;


    if (hasChanged) {
      const updatedData = {
        id: dataT?.id,
        name: null,
        phone: null,
        phone2: null,
        accountantMobile: null,
        coordinatorMobile: null,
        description: null,
        cityId:
          dataT?.cityId !== dataCityId2 ? dataCityId2 : null,
        address: dataT?.address !== dataAll?.address ? dataAll?.address : null,
        postalCode:
          dataT?.postalCode !== dataAll?.codePost ? dataAll?.codePost : null,
        categoryIdsEdited: false,
        categoryIds: null,
        importBrandsEdited: false,
        importBrands: null,
        produceBrandsEdited: false,
        produceBrands: null,
        spreaderBrandsEdited: false,
        spreaderBrands: null,
        isPerson: null,
        // birthDate: "2024-12-09T19:50:58.219Z",
        birthDate: null,
        importDescription: null,
        produceDescription: null,
        spreaderDescription: null,
        hasImport: null,
        hasProduce: null,
        hasSpread: null,
        installments: null,
        cash: null,
        preOrder: null,
        nationalId: null,
        companyNationalId: null,
      };
      setLoad(true);
      try {
        const result = await profileSupplierUpdate(
          updatedData,
          token,
          chabk,
          setCheck,
          setMessage
        );
        if (result.isSuccess) {
          setTimeout(() => {
            setLoad(false);
            setMessage(result.error ? result.error : result.message);
            setCheck((r) => ({ ...r, check1: true }));
            setUpdateTable(!updateTable);
            setTimeout(() => {
              setMessage("");
              setCheck((r) => ({ ...r, check2: false }));
              setCheck((r) => ({ ...r, check1: false }));
            }, 5000);
          }, 2000);
        } else {
          setTimeout(() => {
            setLoad(false);
            setMessage(result.error ? result.error : result.message);
            setCheck((r) => ({ ...r, check1: true }));
            setTimeout(() => {
              setMessage("");
              setCheck((r) => ({ ...r, check2: false }));
              setCheck((r) => ({ ...r, check1: false }));
            }, 5000);
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {
          setLoad(false);
          setCheck((r) => ({ ...r, check4: true }));
          setTimeout(() => {
            setMessage("");
            setCheck((r) => ({ ...r, check4: false }));
          }, 5000);
        }, 2000);
      }
    } else {
      setLoad2(false);
      setCheck((r) => ({ ...r, check3: true }));
      setMessage("هیچ تغییری صورت نگرفته");
      setTimeout(() => {
        setCheck((r) => ({ ...r, check3: false }));
        setMessage("");
      }, 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap gap-1"
    >
      {/* ***** */}
      <div className="w-[100%] ">
        <Controller
          name="dataCityId2"
          control={control}
          rules={{
            required: {
              value: true,
              message: "لطفاً شهر خود را انتخاب کنید",
            },
          }}
          render={({ field }) => (
            <City
              {...field}
              control={control}
              name="dataCityId2"
              dataCityId={dataCityId}
              setDataCityId={setDataCityId}
              dataCityId2={dataCityId2}
              setDataCityId2={setDataCityId2}
              selectedProvinceData={dataT?.provinceName}
              selectedCityData={dataT?.cityName}
              isDisabled={roleCookie === "Supplier"}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
            />
          )}
        />
        {errors.dataCityId2 && (
          <p style={{ color: "red" }}>{errors.dataCityId2.message}</p>
        )}
      </div>

      <div className="w-[100%]  ">
        <Controller
          name="address"
          control={control}
          rules={{
            required: {
              value: true,
              message: "لطفاً آدرس خود را وارد کنید",
            },
          }}
          render={({ field }) => (
            <InputTextArea
              {...field}
              type="text"
              label={"جزئیات آدرس :"}
              width={"w-[100%] h-[190px] mt-6"}
              placeholder={"توضیحات خود را وارد کنید"}
              disabled={roleCookie == "Supplier" ? false : true}
              styleTextarea={"bg-white h-[150px]"}
              styleLabel={"black"}
              value={address}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 200) {
                  setAddress(value);
                  field.onChange(e);
                }
              }}
            />
          )}
        />
        {errors.address && (
          <p style={{ color: "red" }}>{errors.address.message}</p>
        )}
      </div>

      {/* ****** */}
      <div className="w-[100%] xl:w-[45%] ">
        <Controller
          name="codePost"
          control={control}
          rules={{
            minLength: {
              value: 10,
              message: "کد پستی باید 10 رقم باشد",
            },
            maxLength: {
              value: 10,
              message: "کد پستی نباید بیشتر از 10 رقم باشد",
            },
            pattern: {
              value: /^[0-9]{10}$/,
              message: "کد پستی فقط باید شامل اعداد باشد و 10 رقم باشد",
            },
          }}
          render={({ field }) => (
            <InputNumber
              {...field}
              type="text"
              placeholder={"لطفا شناسه کد پستی را وارد کنید ..."}
              label={"کد پستی :"}
              svg={false}
              width={"w-[100%]"}
              value={codePost}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setCodePost(value);
                  field.onChange(e);
                }
              }}
              styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleBox={"bg-[#ffffff]"}
              disabled={roleCookie === "Supplier" ? true : false}
            />
          )}
        />
        {errors.codePost && (
          <p style={{ color: "red" }}>{errors.codePost.message}</p>
        )}
      </div>
      {/* دکمه ارسال */}
      <div className="w-full h-[100px] items-center  flex justify-center">
        <button
          type="submit"
          className={
            " w-[40%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center"
          }
        >
          ثبت ویرایش
        </button>
      </div>
    </form>
  );
};

export default Form2;
