import {
  React,
  useCallback,
  useEffect,
  useRef,
  useState,
  GetProductClassification,
  GeneralTable,
} from '@/component/management-panel/import-management.js'

function Table1({ token, chabk}) {
    const [messageData, setMessageData] = useState([]);
    const [checkData, setCheckData] = useState(false);
    const [checkDataAll, setCheckDataAll] = useState({
        check1: false,
      });
    const [options1, setOptions1] = useState([{ key: "", value: "" }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const items = options1.map((item) => ({
        key: item.key,
        value: item.value,
      }));
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

    
    
      const headers = [
        { key: "id", title: "ردیف", style: "w-[5%]  border-l h-[40px]" },
        {
          key: "value",
          title: "عنوان",
          style: "w-[80%]  border-l h-[40px]",
        },
        {
          key: "actions",
          title: "عملیات",
          style: "w-[10%] h-[40px]",
          buttons: [
            {
              text: "لغو",
              style: "bg-green-500 text-white px-2 py-1 rounded",
            //   onClick: (id) => alert(`حذف ${id}`),
            },
          ],
        },
      ];
    
    
      return (
        <>
          <GeneralTable
            items={items}
            headers={headers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalItems={items.length}
          />
        </>
      );
}

export default Table1