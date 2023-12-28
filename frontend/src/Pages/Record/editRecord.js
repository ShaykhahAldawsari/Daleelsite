import React , {useState } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { editRecord } from '../../utils';

const EditRecord = () => {
    
      const navigate = useNavigate();
      const location = useLocation();
      const [loading, setLoading] = useState(false);
      const state = location.state;
       
      //Function to handle edit
      const handleEdit = async (event)=>{
        event.preventDefault();
        const data = event.target.elements;
          const updatedData = {
            staffname: data.staffname.value,
            maintainencenumber: data.maintainencenumber.value,
            roomnumber: data.roomnumber.value,
            staffsection: data.staffsection.value,
            map: data.map.value,
          };
        
        setLoading(true);
        await editRecord(updatedData , state.record._id);
        setLoading(false);
      }
     

    return loading ? <h1>Loading</h1> :  !state ? <h1>No data found</h1> :  (
        
        <div className="info-container">
        <div className="infobox">
            <form onSubmit={handleEdit}>
            <br />


            <h1>الإسم</h1>
            <input defaultValue={state.record.staffname} className="input2" id='staffname' name='staffname'/> 

            <h1>لوحة الصيانة</h1>
            <input defaultValue={state.record.maintainencenumber}  className="input2" id='maintainencenumber' name='maintainencenumber' />
            
       
            <h1>اللوحة الإرشادية</h1>
            <input defaultValue= {state.record.roomnumber}  className="input2" name='roomnumber'/>
       
            <h1>القسم</h1>
            <input defaultValue= {state.record.staffsection}  className="input2" name='staffsection'/>
    
    
            <h1 className="map">خريطة توضيحية</h1>
            <input defaultValue={state.record.map} name='map' className="input2" />
          
            <br />
            <br />
            <br />
            <br />
            <button  style={{marginTop: '86px'}}  type='submit' className="btn" >Update</button>
            <button   style={{marginTop: '86px'}}  className="btn" onClick={()=>{navigate("/")}}>تم</button>
            </form>
        </div>
    </div> )
}

export default EditRecord;