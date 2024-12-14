import {
  React,
  useEffect,
  useState,
  Button,
  Modal,
  convertToJalali,
  InputDate,
  GeneralTable,
  CheckBoxAccordion2,
  Load,
  sendDateToBackend,
  postRelationshipAnswer,
} from '@/component/management-panel/import-management.js'

function TableColleagues({
  userId,
  isNew,
  type,
  token,
  chabk,
  id,
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
}) {
  const [showModal, setShowModal] = useState(false);
  const [pagesModal, setPagesModal] = useState(1);
  const [date,setDate]=useState('')
  const [load, setLoad] = useState();
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,

  });
  const [dataAll, setDataAll] = useState();

  const items =
    data &&
    data.map((item) => ({
      acceptorCityId: item.acceptorCityId,
      acceptorId: item.acceptorId,
      acceptorName: item.acceptorName,
      acceptorNationalId: item.acceptorNationalId,
      acceptorPhoneNumber: item.acceptorPhoneNumber,
      acceptorType: item.acceptorType,
      description: item.description,
      id: item.id,
      isNew: item.isNew,
      relationshipType:
        item.relationshipType == 0
          ? "همکاری"
          : item.relationshipType == 1
          ? "نمایندگی"
          : item.relationshipType == 2
          ? "خدمات پس از فروش"
          : "",
      requestDate: convertToJalali(item.requestDate),
      acceptorCityName: item.acceptorCityName,
      acceptorProvinceName: item.acceptorProvinceName,
      requesterIdString: item.requesterIdString,
      requesterName: item.requesterName + "\n" + item.requesterPhoneNumber,
      requesterNationalId: item.requesterNationalId,
      requesterPhoneNumber: item.requesterPhoneNumber,
      requesterType: item.requesterType,
      status:
        item.status == 0
          ? "منتظر پذیرش همکار"
          : item.status == 1
          ? "توسط همکار پذیرش شده"
          : item.status == 2
          ? "همکار نیست"
          : item.status == 3
          ? "حذف شده"
          : "",
    }));

  const headers = [
    { key: "id", title: "ردیف", style: "w-[5%]  border-l h-[40px]" },
    {
      key: "requesterName",
      title: "نام تامین کننده",
      style: "w-[10%]  border-l h-[40px]",
    },
    {
      key: "www",
      title: `مشخصات ${
        type == 0 ? "همکاران" : type == 1 ? "نماینده" : "خدمات پس از فروش"
      }`,
      style: "w-[43%]  border-l",
      subHeader: [
        {
          key: "acceptorName",
          title: "نام و نام خانوادگی",
          style: "w-[30%] h-[40px] border-l",
        },
        {
          key: "acceptorNationalId",
          title: "کد ملی",
          style: "w-[20%] h-[40px] border-l",
        },
        {
          key: "acceptorPhoneNumber",
          title: "تلفن همراه ثابت",
          style: "w-[20%] h-[40px] border-l",
        },
        {
          key: "acceptorProvinceName",
          title: "استان",
          style: "w-[15%] h-[40px]",
        },
        { key: "acceptorCityName", title: "شهر", style: "w-[15%] h-[40px]" },
      ],
    },
    {
      key: "relationshipType",
      title: "نوع رابطه",
      style: "w-[10%]  border-l h-[40px]",
    },
    {
      key: "status",
      title: "وضعیت رابطه",
      style: "w-[12%]  border-l h-[40px]",
    },
    { key: "requestDate", title: "تاریخ", style: "w-[10%]  border-l h-[40px]" },
    {
      key: "actions",
      title: "عملیات",
      style: "w-[10%] h-[40px]",
      buttons: [
        {
          text: "لغو",
          style: ` bg-green-500 text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300 ${
            isNew == 2 ? "hidden" : ""
          } `,
          // onClick: (id) => alert(`حذف ${id}`),
        },
        {
          text: "تعیین وضعیت",
          style: ` bg-[#B27BFF] text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300 ${
            isNew == 1 ? "hidden" : ""
          } `,
          onClick: (id) => openModal(id),
        },
      ],
    },
  ];
const [acceptorId , setAcceptorId] = useState()
const [acceptorType , setAcceptorType] = useState()
const [id2,setId2]=useState()
  function openModal(id , acceptorId) {
    setShowModal(true);
    setAcceptorId(data.find(obj => obj.id === id)?.acceptorId)
    setAcceptorType(data.find(obj => obj.id === id)?.acceptorType)
    setId2(id)
  }
  
  function closeModal() {
    setShowModal(false);
    setPagesModal(1);
    setActiveCheckbox1(0)
    setActiveCheckbox2(0)
  }
  
  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  // const [data1, setData1] = useState("");
  const [checked1, setChecked1] = useState(false);
  
  const handleCheck1 = (index ) => {
    setDate('')
    if (index !== activeCheckbox1) {
      setActiveCheckbox1(index);
      setChecked1(true);
      // setData1(index === 0 ? 1 : 2);
    }
    if (activeCheckbox1 == 0) {
      setDataAll(
        {
          id: id2,
          acceptorId: acceptorId,
          acceptorType: acceptorType,
          isAccepted:false,
          hasKnown:true,
          hasKnownFromYear:'',
          hasTrade:true,
          suggests:true,
        }
      )
    } else if (activeCheckbox1 == 1) {
      setDataAll(
        {
          id: id2,
          acceptorId: acceptorId,
          acceptorType: acceptorType,
          isAccepted:false,
          hasKnown:true,
          hasKnownFromYear:'',
          hasTrade:false,
          suggests:true,
        }
      )
    } else if (activeCheckbox1 == 2) {
      setDataAll(
        {
          id: id2,
          acceptorId: acceptorId,
          acceptorType: acceptorType,
          isAccepted:false,
          hasKnown:true,
          hasKnownFromYear:'',
          hasTrade:false,
          suggests:false,
        }
      )
    } else if (activeCheckbox1 == 3) {
      setDataAll(
        {
          id: id2,
          acceptorId: acceptorId,
          acceptorType: acceptorType,
          isAccepted:null,
          hasKnown:null,
          hasKnownFromYear:'',
          hasTrade:null,
          suggests:null,
        }
      )
      
      // setInStock(true);
    }
  };
  useEffect(()=>{

    console.log(dataAll);
  },[dataAll])
  const [activeCheckbox2, setActiveCheckbox2] = useState(0);
  // const [data1, setData1] = useState("");
  const [checked2, setChecked2] = useState(false);

  const handleCheck2 = (index) => {
    if (index !== activeCheckbox2) {
      setActiveCheckbox2(index);
      setChecked2(true);
      // setData1(index === 0 ? 1 : 2);
    }
    if (activeCheckbox2 == 0) {
      // setInStock(false);
    }
  };

 
  const sendForm = async (x) => {
    closeModal()

    setLoad(true);
    try {
      const result = await postRelationshipAnswer(
        sendDateToBackend(date),
        dataAll,
        token,
        chabk,
        setMessage
      );
      if (result.isSuccess == true) {
        setTimeout(() => {
          setCheck((r) => ({ ...r, check1: true }));

          setLoad(false);
          // setUpdateTable(!updateTable);
          setMessage(result.errors ? result.error : result.message);
        }, 2000);
      } else if (result.isSuccess == false) {
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad(false);
          // setUpdateTable(!updateTable);
          setMessage(result.errors ? result.error : result.message);
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
    
  };

  return (
    <>
      <GeneralTable
        items={items}
        headers={headers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalItems={totalItems}
      />
      {showModal && (
        <Modal onClose={closeModal} title="" style={"w-[90vw] xl:w-[700px]"}>
          <div className="w-full flex flex-wrap justify-center gap-5">
            {pagesModal == 1 ? (
              <>
                <div className="w-full flex flex-wrap gap-5">
                  <p className="w-full">
                    همکار گرامی مواردی که در ادامه به منظور تعیین وضعیت همکاری
                    انتخاب می کنید به همکار شما نمایش داده نخواهد شد
                  </p>
                  <div className="w-[60%] flex gap-3">
                    <Button
                      value={"ایشان را میشناسم"}
                      click={() => setPagesModal(2)}
                      styleButton={22}
                    />
                    <Button
                      value={"ایشان را نمیشناسم"}
                      click={() => setPagesModal(3)}
                      styleButton={17}
                    />
                  </div>
                </div>
              </>
            ) : pagesModal == 2 ? (
              <>
                <div className="w-full flex flex-wrap justify-center gap-5 pb-12">
                  <div className="w-full flex gap-2">
                    <div>
                      <CheckBoxAccordion2
                        label={""}
                        isChecked={activeCheckbox1 === 0}
                        onCheck={() => handleCheck1(0)}
                      />
                    </div>
                    <p>
                    ایشان را میشناسم به عنوان یک همکار با ایشان مراوده مالی اعتباری (غیر نقد) دارم.
                    </p>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-[8.5%]"></div>
                    <p className={`${activeCheckbox1==0?'text-black':'text-zinc-500'}`}>
                    از چه زمانی با ایشان مراوده مالی دارید؟
                    </p>
                    <div className="w-[50%] flex px-5">
                    <InputDate
                    placeholder={"انتخاب تاریخ ..."}
                    label={''}
                    svg={false}
                    width={"w-[100%] 2xl:w-[70%] h-[40px] "}
                    max={""}
                    data={date}
                    setData={setDate}
                    styleLabel={"text-[1rem] xl:text-[1rem] text-black hidden"}
                    styleInput={"text-[1rem] xl:text-[1rem] h-[25px] "}
                    styleError={false}
                    styleBox={`${activeCheckbox1==0?'bg-[#ffffff]':''}`}
                    disabled={activeCheckbox1==0?false:true}
                  />
                    </div>
                  </div>
                  <div className="w-full flex gap-2">
                  <div>
                      <CheckBoxAccordion2
                        label={""}
                        isChecked={activeCheckbox1 === 1}
                        onCheck={() => handleCheck1(1)}
                      />
                    </div>
                    <p>
                    ایشان را به عنوان یک همکار میشناسم ولی مراوده مالی با ایشان نداشته ام
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                  <div>
                      <CheckBoxAccordion2
                        label={""}
                        isChecked={activeCheckbox1 === 2}
                        onCheck={() => handleCheck1(2)}
                      />
                    </div>
                    <p>
                    ایشان را میشناسم لیکن ایشان را به عنوان یک فرد خوش حساب معرفی نخواهم کرد
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                  <div>
                      <CheckBoxAccordion2
                        label={""}
                        isChecked={activeCheckbox1 === 3}
                        onCheck={() => handleCheck1(3)}
                      />
                    </div>
                    <p>
                    مایل به ابراز نظر در این مورد نیستم
                    </p>
                  </div>
                  <div className="w-[20%]">
                  <Button
                      value={"ثبت"}
                      click={()=>sendForm(1)}
                      styleButton={22}
                    />
                  </div>
                </div>
              </>
            ) : pagesModal == 3 ? (
              <>
                <div className="w-full flex flex-wrap justify-center gap-5">
                  <div className="w-full flex gap-2">
                    <div>
                      <CheckBoxAccordion2
                        label={""}
                        isChecked={activeCheckbox2 === 0}
                        onCheck={() => handleCheck2(0)}
                      />
                    </div>
                    <p>
                    تا به حال اسم این فرد به عنوان همکار به گوش بنده نخورده است. البته شاید همکارباشد لیکن بنده اطلاعی ندارم
                    </p>
                  </div>
                  <div className="w-[20%]">
                  <Button
                      value={"ثبت"}
                      click={()=>sendForm(2)}
                      styleButton={22}
                    />
                  </div>
                </div>
              </>
            ):''}
          </div>
        </Modal>
      )}
      <Load load={load} text={"در حال ثبت تعیین وضعیت لطفا منتظر بمانید ..."} />
    </>
  );
}

export default TableColleagues;
