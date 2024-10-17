import React, { useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Close } from "@mui/icons-material";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

function PDTemplate(props) {
  const ref = useRef();
  const [openAirPopup, setOpenAirPopup] = useState(false);
  const [item, setItem] = useState("");
  const [customer, setCustomerName] = useState("");
  const [Quantity,setQuantity]= useState("")
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  const addData = (event) => {
    event.preventDefault(); 

    setList((prevList) => [
      ...prevList,
      {
        customer: customer,
        product: item,
        Quantity:Quantity,
        amount: amount,
      },
    ]);

    setCustomerName("");
    setItem("");
    setQuantity("")
    setAmount(0);
  };

  let sum = 0;
  list.forEach((entry) => {
    sum += parseInt(entry.amount);
  });

  return (
    <>
      <div className="container" ref={ref}>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4 brcode">
                <Barcode
                  value={`4n%${props.InvoiceNumber}+ut%`}
                  width={1}
                  height={50}
                  displayValue={false}
                />
              </div>

              <div className="col-md-8 text-right bbc">
                <h4>Invoice Number: {props.InvoiceNumber}</h4>
                <h5>Date: {new Date().toLocaleDateString()}</h5>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Product</th>
                      <th>Quatity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.customer}</td>
                        <td>{entry.product}</td>
                        <td>{entry.Quantity}</td>
                        <td>Rs:{entry.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right">
                  <h4>Total: Rs:{sum}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReactToPrint
        trigger={() => <button className="btn btn-primary mt-3">Print Invoice</button>}
        content={() => ref.current}
      />

      <form onSubmit={addData} className="form-group mt-3">
        
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter Customer Name"
          className="form-control mb-2"
        />

        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Product Name"
          className="form-control mb-2"
        />
          <input
          type="number"
          value={Quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Please Give a Quantity"
          className="form-control mb-2"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="form-control mb-2"
        />
       
        <button type="submit" className="btn btn-success">
          Add Product
          </button>
      </form>

      <Dialog open={openAirPopup} onClose={() => setOpenAirPopup(false)}>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Title
            <Close onClick={() => setOpenAirPopup(false)} />
          </div>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
}

export default PDTemplate;
