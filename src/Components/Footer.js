import React from "react";
import '../Styles/footer.css';
import { withRouter,NavLink } from "react-router-dom";

const Footer = () => {
    return (
     
        <div className="footer">
              <div className="container">
                 
                <div className="row">
                
                <div className="mt-5">
                <p className="main-hero-para text-center w-100" style={{fontSize:" x-small",marginTop: "-25px",color:"#9a9a9a"}}>
                    Copyright @ 2021 vandana-Meloth. All rights reserved.
                </p>
                </div>
              </div>
              </div>
          </div>
        
      
    );
  };
  
export default withRouter(Footer);