import React , {useState } from 'react';
import {createRecord  } from '../../utils';
import { useNavigate } from 'react-router-dom';

const AddRecord = () => {


      const navigate = useNavigate();
      const [loading , setLoading] = useState(false);

      //Function to handle add
      const handleAdd = async (event)=>{
        event.preventDefault();
        const data = event.target.elements;
          const newData = {
            staffname: data.staffname.value,
            maintainencenumber: data.maintainencenumber.value,
            roomnumber: data.roomnumber.value,
            staffsection: data.staffsection.value,
            map: data.map.value,
          };
        
        setLoading(true);
        await createRecord(newData);
        setLoading(false);
      }
     
    return loading ? <h1>Loading</h1> :  (
        
        <div className="info-container" style={{textAlign: 'center'}}> 
        <div className="infobox">
            <form onSubmit={handleAdd} style={{margin: '0 auto'}}>
            <br />

            <h1>الإسم</h1>
            <input className="input2" id='staffname' name='staffname'/> 

            <h1>لوحة الصيانة</h1>
            <input className="input2" id='maintainencenumber' name='maintainencenumber' />
            
       
            <h1>اللوحة الإرشادية</h1>
            <input className="input2" name='roomnumber'/>
       
            <h1>القسم</h1>
            <input className="input2" name='staffsection'/>
    
    
            <h1 className="map">خريطة توضيحية</h1>
            <input name='map' className="input2" />
            <br />
            <br />
            <br />
            <br />
            <button style={{marginTop: '86px'}} type='submit' className="btn" >إضافة السجل</button>
            <button style={{marginTop: '86px'}} className="btn" onClick={()=>{navigate("/")}}>تم</button>
            </form>
        </div>
    </div> )
}

export default AddRecord;