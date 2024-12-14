import React, { useState } from "react";
import RoutesRequest from "./routes-request/routes-request";
function Row({ row, isOpen, onToggle }) {
  return (
    <>
      {/* ردیف اصلی */}
      <div className="flex  items-center bg-white rounded-2xl">
        <div
          className="p-2 w-12 text-center cursor-pointer text-[#B886FF] text-[1.1rem]"
          onClick={onToggle}
        >
          {isOpen ? "▼" : "▲"}
        </div>
        <div className="p-2 py-4 flex-1">{row.id}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.date}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.customer}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.city}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.order}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.payment}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.status}</div>
        <div className="p-2 py-4 flex-1 text-center">{row.viewStatus}</div>
      </div>

      {/* محتوای اضافی */}
      {isOpen && (
        <div className="w-full p-4 mt-5 bg-white rounded-2xl">
          <RoutesRequest/>
        </div>
      )}
    </>
  );
}


export default function TableCollapsible() {

  const data = [
    {
      id: 56757,
      date: "1401/3/6 12:00",
      customer: "رضا",
      city: "تهران",
      order: "10 کارتن 127 واحد",
      payment: "چک 20 روزه",
      status: "مشتری جدید",
      viewStatus: "مشاهده نشده",
    },
    {
      id: 56758,
      date: "1401/3/7 12:30",
      customer: "علی",
      city: "مشهد",
      order: "5 کارتن 50 واحد",
      payment: "نقدی",
      status: "مشتری قدیمی",
      viewStatus: "مشاهده شده",
    },
    {
      id: 56759,
      date: "1401/3/8 14:00",
      customer: "سارا",
      city: "اصفهان",
      order: "20 کارتن 200 واحد",
      payment: "چک 30 روزه",
      status: "مشتری جدید",
      viewStatus: "مشاهده نشده",
    },
    {
      id: 56760,
      date: "1401/3/9 15:00",
      customer: "مهدی",
      city: "تبریز",
      order: "15 کارتن 150 واحد",
      payment: "نقدی",
      status: "مشتری جدید",
      viewStatus: "مشاهده نشده",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null); 

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto mt-8 text-[.9rem] rounded-lg flex flex-wrap gap-2">
      <div className="flex w-full ">
        {/* <div className="p-2 w-12"></div> */}
        <div className="p-2 flex-1 text-center">شماره</div>
        <div className="p-2 flex-1 text-center">تاریخ / ساعت</div>
        <div className="p-2 flex-1 text-center">نام و نام خانوادگی</div>
        <div className="p-2 flex-1 text-center">آدرس</div>
        <div className="p-2 flex-1 text-center">میزان سفارش</div>
        <div className="p-2 flex-1 text-center">نوع خرید</div>
        <div className="p-2 flex-1 text-center">دفعات سفارش</div>
        <div className="p-2 flex-1 text-center">وضعیت</div>
      </div>

      {/* حلقه برای ایجاد ردیف‌ها بر اساس داده‌ها */}
      <div className="w-full flex flex-wrap gap-5">
        {data.map((row, index) => (
          <div className="w-full" key={row.id}>
            <Row
              row={row}
              isOpen={openIndex === index} 
              onToggle={() => handleToggle(index)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
