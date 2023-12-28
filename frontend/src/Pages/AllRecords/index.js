import React, { useEffect, useState } from "react";
import { getRecords, deleteRecord, getSingleRecord } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import LogoImam from "../../assets/logoimam.png"

const AllRecords = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(false);
  const [fetch, toggleFetch] = useState(false);


  const navigate = useNavigate();


  // function for fetching data from mongodb
  useEffect(() => {
    const fetchRecords = async () => {
      const response = await getRecords();
      if (response) {
        setRecords(response);
        setLoading(false);
      } else {
        //when a problem happen with fetching data from mongodb this error message appear
        alert("حدث خطأ اثناء استيراد البيانات،الرجاءإعادة المحاولة");
      }
    };
    fetchRecords();
  }, [fetch]);

  //Navigate to edit page
  const handleNavigate = (record) => {
    navigate("/edit-record", { state: { record: record } });
  };

  //Function for deleting the record
  const handleDelete = async (id) => {
    setLoading(true);
    await deleteRecord(id);
    setLoading(false);
    toggleFetch();
  };

  //Function for triggerig the search
  const handleSearch = async (event) => {
    event.preventDefault();

    const query = event.target.elements.query.value;
    if (query === "") {
      return;
    }
    setLoading(true);
    const data = await getSingleRecord(query);
    console.log(data);
    if (data) {
      setRecords([data]);
    }
    setLoading(false);
  };

  return loading ? (
// if the record isn't in the database or the user only wrote the first name/ last name of the staff/ faculty memeber, no record will be shown
// in future versions the admin will be redircted to a new page that will have a message that is "السجل غير موجود، حاول البحث بإستعمال الاسم الكامل، اللوحة الارشادية أو اللوحة الصيانة"
    <h1>جاري التحميل</h1>
  ) : (
    <>
      <div style={{ overflow: "scroll" }}> 
        <div style={{ marginBottom: "-125px" }}>

          <p style={{ marginBottom: "150px" }} className="search" id="searchButton">
            <form onSubmit={handleSearch} className="search-bar">
              <input type="search" placeholder="...البحث" name="query" />
            </form>
          </p>
        </div>

        <div className="info-container" style={{ overflow: "scroll"}}>
          <table style={{textAlign: 'right'}}>
            <thead>
              <tr>
                <th>الخريطة التوضيحية</th>
                <th>اللوحة الارشادية</th>
                <th>لوحة الصيانة</th>
                <th>القسم</th>
                <th>الاسم</th>
                <th>تحرير</th>
              </tr>
            </thead>

            <tbody>
              {records &&
                records.map((record) => {
                  return (
                    <tr>
                      <td>
                        <a href={record.map}>عرض الخريطة</a>
                      </td>
                      <td>{record.roomnumber}</td>
                      <td>{record.maintainencenumber}</td>
                      <td>{record.staffsection}</td>
                      <td>{record.staffname}</td>
                      <td style={{ cursor: "pointer" }}>
                        <p
                          style={{ display: "inline"}}
                          onClick={() => {
                            handleNavigate(record);
                          }}
                        >
                          ✏️
                        </p>
                        <p
                          style={{ display: "inline" }}
                          onClick={() => {
                            handleDelete(record._id);
                          }}
                        >
                          ❌
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllRecords;
