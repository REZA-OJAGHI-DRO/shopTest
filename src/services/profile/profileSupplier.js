export const fetchSupplierGet = async (
    id,
    token,
    chabk,
    setMessageData,
    setCheckData,
    setData,
    setCheckDataAll
) => {
    const url = `https://${chabk}/Profile/Supplier/Get`;
    const data = { id };

  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(response.status); 
        }
        
        const result = await response.json();
        if (result?.isSuccess) {
            setData(result.data);
            setCheckDataAll((r) => ({...r,check1: true}));
        } else {
            setCheckData(true);
            setMessageData((prevData) => [
                ...prevData,
                result.errors ? result.errors : result.message
            ]);
        }

        return result;
    } catch (error) {
        setCheckData(true);

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData((prevData) => [
                ...prevData, 
                'خطا در دریافت اطلاعات تامین کننده : به دلیل محدودیت‌های امنیتی، امکان دریافت اطلاعات از سرور وجود ندارد.'
            ]);
        } else if (!navigator.onLine) {
            setMessageData((prevData) => [
                ...prevData, 
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            ]);
        } else {
            const errorMessages = {
                400: 'خطا در دریافت اطلاعات تامین کننده : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'خطا در دریافت اطلاعات تامین کننده : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'خطا در دریافت اطلاعات تامین کننده : صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'خطا در دریافت اطلاعات تامین کننده : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'خطا در دریافت اطلاعات تامین کننده : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'خطا در دریافت اطلاعات تامین کننده : زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطا در دریافت اطلاعات تامین کننده : خطای ناشناخته‌ای رخ داده است.';
            setMessageData((prevData) => [...prevData, message]);
        }
    }
};


export async function profileSupplierUpdate(
    updatedData,
    token,
    chabk,
    setCheckDataAll,
  //   setCheckData,
    setMessageData
  ) {
  const url = `https://${chabk}/Profile/Supplier/Update`;

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json-patch+json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
          throw new Error(response.status); 
      }
      
      const result = await response.json();
      if (result?.isSuccess) {
          setCheckDataAll((r) => ({...r,check1: true}));
      } else {
          // setCheckData(true);
          setMessageData(
              result.errors ? result.errors : result.message
          );
      }

      return result;
  } catch (error) {
      // setCheckData(true);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
          setMessageData( 
              'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.'
          );
      } else if (!navigator.onLine) {
          setMessageData(
              "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
          );
      } else {
          const errorMessages = {
              400: ' درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
              401: 'برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
              403: 'شما اجازه دسترسی به این قسمت را ندارید.',
              404: 'صفحه یا منبع مورد نظر پیدا نشد.',
              408: 'زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
              500: 'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
              502: 'مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
              503: 'سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
              504: 'زمان اتصال به سرور اصلی تمام شد.'
          };
          
          const message = errorMessages[Number(error.message)] || 'خطای ناشناخته‌ای رخ داده است.';
          setMessageData( message);
      }
  }
}

