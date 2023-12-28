import React , { useEffect}from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import copy from '../../assets/copy.png'

const Record = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    //Function responsible for copying
  const handleCopy =  async(text) => {
    if(text===""){
      return;
    }
    //Copy the text to clipboard
    await navigator.clipboard.writeText(text);
  
    // Alert the copied text
    alert("تم نسخ: " + text);
  } 

  return !state ? "السجل غير موجود، حاول البحث بالاسم الكامل، لوحة الصيانة أو اللوحة الارشادية" :  (
    <div className="info-container">
    <div className="infobox">
        <br />
        <h1>الإسم</h1>
        <div style={{cursor: 'pointer'}}  onClick={()=>{handleCopy(state.records.staffname)}}>
          <img src={copy} alt="" height="20px" width="20px"/>
        </div>
        <p className="input2" id='staffname'> {state.records.staffname} </p>

        <h1>لوحة الصيانة</h1>
        <div style={{cursor: 'pointer'}}  onClick={()=>{handleCopy(state.records.maintainencenumber)}}>
          <img src={copy} alt="" height="20px" width="20px"/>
        </div>        <p className="input2" id='maintainencenumber'> {state.records.maintainencenumber} </p>
        
   
        <h1>اللوحة الإرشادية</h1>
        <div style={{cursor: 'pointer'}}  onClick={()=>{handleCopy(state.records.roomnumber)}}>
          <img src={copy} alt="" height="20px" width="20px"/>
        </div>
        <p className="input2"> {state.records.roomnumber} </p>
   
        <h1>القسم</h1>
        <div style={{cursor: 'pointer'}}  onClick={()=>{handleCopy(state.records.staffsection)}}>
          <img src={copy} alt="" height="20px" width="20px"/>
        </div>        <p className="input2"> {state.records.staffsection} </p>


        <h1 className="map">خريطة توضيحية</h1>
 
        <p className="input2">
        <a style={{textDecoration: 'none'}} href={state.records.map}>عرض الخريطة</a></p>
        <br />
        <br />
        <br />
        <br />
        <button  style={{marginTop: '86px'}}  className="btn" onClick={()=>{navigate("/")}}>تم</button>
        <button  style={{marginTop: '86px'}}  className="btn" onClick={()=>{window.print()}}>طباعة السجل</button>
    </div>
</div>
  )
}

export default Record