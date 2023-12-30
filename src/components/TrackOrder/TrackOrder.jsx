import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTypography,
  MDBBtn,
  MDBRow,
} from "mdb-react-ui-kit";
import "./Track.css";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { BASEPATH } from "../../config";

export default function TrackOrder({ basicModal, setBasicModal, order ,setIsOrderUpdated}) {
  const toggleOpen = () => setBasicModal(!basicModal);
  const socket = io(BASEPATH);
  const [cuurentorder,setCuurentOrder] = useState(order)

  useEffect(()=>{
    
    if(order){
        socket.emit('join',`order_${cuurentorder.OrderId}`)
    }
   },[])
   
   socket.on('orderUpdated', (data)=>{
    console.log(data);
    toast.success('Order Status Changed.',{autoClose: 800})
    setCuurentOrder((prev)=>{ return {...prev,status:data.status}})
    setIsOrderUpdated(Math.random())
   })

  return (
    <>

      <MDBModal open={basicModal} setopen={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Tracking Details</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer className="py-5">
                <div className="main_container">




                  <div className="container padding-bottom-3x mb-1">
                    <div className="card mb-3">
                      <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Order No - </span><span className="text-medium">{cuurentorder.OrderId}</span></div>
                      <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">

                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> {cuurentorder.status}</div>
                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> {(() => {
                          const date = new Date();

                          let day = date.getDate();
                          let month = date.getMonth() + 1;
                          let year = date.getFullYear();
                          return `${day}-${month}-${year}`
                        })()}</div>
                      </div>
                      <div className="card-body">
                        <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                          <div className={`step ${cuurentorder.status == "order_placed" ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                              <div className="step-icon"><i className="pe-7s-cart"></i></div>
                            </div>
                            <h4 className="step-title">Order Placed</h4>
                          </div>
                          <div className={`step ${cuurentorder.status == "order_confirmed" ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                              <div className="step-icon"><i className="pe-7s-config"></i></div>
                            </div>
                            <h4 className="step-title">Order Confirmed</h4>
                          </div>
                          <div className={`step ${cuurentorder.status == "order_preparing" ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                              <div className="step-icon"><i className="pe-7s-coffee"></i></div>
                            </div>
                            <h4 className="step-title">Preparing Order</h4>
                          </div>
                          <div className={`step ${cuurentorder.status == "order_OFD" ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                              <div className="step-icon"><i className="pe-7s-car"></i></div>
                            </div>
                            <h4 className="step-title">Out For Delevery</h4>
                          </div>
                          <div className={`step ${cuurentorder.status == "order_delivered" ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                              <div className="step-icon"><i className="pe-7s-home"></i></div>
                            </div>
                            <h4 className="step-title">Delivered</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">

                    </div>
                  </div>
                </div>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}