import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, NavItem } from "react-bootstrap";
import axios from "axios";

const Employee = () => {
    const [Data, setdata] = useState([]);
    const [RowData, setRowData] = useState([]);
    const [ViewShow, setViewShow] = useState(false);
    const handleviewshow = () =>
    {
        setViewShow(true);
    }
    const handleviewclose = () =>
    {
        setViewShow(false);
    }

    //For edit:
    const [ViewEdit, setEditShow] = useState(false);
    const handleeditshow = () =>
    {
        setEditShow(true);
    }
    const handleeditclose = () =>
    {
        setEditShow(false);
    }

    //For delete:
    const [ViewDelete, setdeleteShow] = useState(false);
    const handledeleteshow = () =>
    {
        setdeleteShow(true);
    }
    const handledeleteclose = () =>
    {
        setdeleteShow(false);
    }

    //For Adding new data:
    const [ViewPost, setpostShow] = useState(false);
    const handlepostshow = () =>
    {
        setpostShow(true);
    }
    const handlepostclose = () =>
    {
        setpostShow(false);
    }

    let [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [number, setnumber] = useState("");
    const [nic, setnic] = useState("");
    const [address, setaddress] = useState("");

    const [id, setid] = useState("");

    const getdetails = () =>
    {
        let url = "http://localhost:8000/employee";
        try {
            axios.get(url)
            .then((res) =>
            {
                const result = res.data;
                const { status, message, data } = result;
                if (status !== "SUCCESS")
                {
                    alert(message, status);
                }
                else
                {
                    setdata(data);
                    console.log(Data);
                }
            })            
        } catch (error) {
            console.log(error);            
        }        
    }

    // To add new employee data into database:

    const handlesubmit = () =>
    {
        let url = "http://localhost:8000/employee";
        const credentials = { name, email, address, nic, number };
        try {
            axios.post(url,credentials)
            .then((res) =>
            {
                const result = res.data;
                const { status, message, data } = result;
                if (status !== "SUCCESS")
                {
                    alert(message, status);
                }
                else
                {
                    alert(message);
                    window.location.reload();
                }
            })            
        } catch (error) {
            console.log(error);            
        }
        
    }


    const handleedit = () =>
    {
        let url = `http://localhost:8000/employee/${id}`;
        
        if (name === "")
        {
            name = RowData.name;
        }
        const credentials = { name, email, number, nic, address };
        console.log(credentials);
        try {
            axios.put(url,credentials)
            .then((res) =>
            {
                const result = res.data;
                const { status, message, data } = result;
                if (status !== "SUCCESS")
                {
                    alert(message, status);
                    console.log(result);
                }
                else
                {
                    alert(message);
                    window.location.reload();
                }
            })            
        } catch (error) {
            console.log(error);            
        }
    }
    

    useEffect(() => {
        getdetails();
      },[]);

    return (
        <div>
            <div className="row">
                <div className="mt-5 mb-4">
                    <Button variant="primary" onClick={() => 
                    {
                        handlepostshow();
                    }}><i>Add new Employee</i></Button>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-stripped table-hover table-bordered">
                        <thead>
                            <tr>                                
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Nic</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.number}</td>
                                    <td>{item.nic}</td>
                                    <td>{item.address}</td>
                                    <td style={{ minWidth: 190 }}>
                                            <Button size='sm' variant='primary' onClick={() => {
                                                setRowData(item)
                                                handleviewshow()
                                            }}>View</Button> 
                                            <Button size='sm' variant='warning' onClick={() => 
                                            { 
                                                handleeditshow(setRowData(item),setid(item._id))
                                            }}>Edit</Button>
                                    <Button size='sm' variant='danger'>Delete</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="model-box-view">
                <Modal show={ViewShow} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Employee Data</Modal.Title>
                    </Modal.Header>    
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <input type="text" class="form-control" value={RowData.name} readOnly></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" value={RowData.email} readOnly></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" value={RowData.number} readOnly></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" value={RowData.nic} readOnly></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" value={RowData.address} readOnly></input>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleviewclose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="model-box-view">
                <Modal show={ViewPost} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Employee</Modal.Title>
                    </Modal.Header>    
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <input type="text" class="form-control" onChange={(e) =>{setname(e.target.value)}} placeholder="Please enter name"></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setemail(e.target.value)}} placeholder="Please enter email"></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setnumber(e.target.value)}} placeholder="Please enter number"></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setnic(e.target.value)}} placeholder="Please enter nic"></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setaddress(e.target.value)}} placeholder="Please enter address"></input>
                            </div>
                            <Button type="submit" className="btn btn-success mt-4" onClick={handlesubmit}>Submit</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlepostclose}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>


            <div className="model-box-view">
                <Modal show={ViewEdit} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit an Employee</Modal.Title>
                    </Modal.Header>    
                    <Modal.Body>
                        <div>
                            <label>Name:</label>
                            <div className="form-group">
                                <input type="text" class="form-control" onChange={(e) =>{setname(e.target.value)}} placeholder="Please enter name" defaultValue={RowData.name}></input>
                            </div>
                        </div>
                        <div>
                            <label>Email:</label>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setemail(e.target.value)}} placeholder="Please enter email" defaultValue={RowData.email}></input>
                            </div>
                        </div>
                        <div>
                            <label>Number:</label>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setnumber(e.target.value)}} placeholder="Please enter number" defaultValue={RowData.number}></input>
                            </div>
                        </div>
                        <div>
                            <label>Nic:</label>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setnic(e.target.value)}} placeholder="Please enter nic" defaultValue={RowData.nic}></input>
                            </div>
                        </div>
                        <div>
                            <label>Address:</label>
                            <div className="form-group mt-3">
                                <input type="text" class="form-control" onChange={(e) =>{setaddress(e.target.value)}} placeholder="Please enter address" defaultValue={RowData.address}></input>
                            </div>
                            <Button type="submit" className="btn btn-warning mt-4" onClick={handleedit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleeditclose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    );
};

export default Employee;