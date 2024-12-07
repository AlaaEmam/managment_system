import React, { useEffect, useState } from "react";
import {
  BASE_IMG_URL,
  privateAxiosInstance,
  requestHeader,
  USERSSURLS,
} from "../../../../constants/URLS";
import noPhoto from "../../../../assets/noPhoto.png";
import "../UsersList/UserList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
interface User {
  id: 1;
  userName: string;
  imagePath: null;
  email: string;
  country: string;
  phoneNumber: number;
  isActivated: boolean;
  // Add other relevant fields
}

export default function UsersList() {
  const [state, setState] = useState("activeId");

  const [show, setShow] = useState(false);

  const [userDataById, setUserDataById] = useState<User>({
    id: 1,
    userName: "",
    imagePath: null,
    email: "string",
    country: "string",
    phoneNumber: 0,
    isActivated: true,
  });

  const handleClose = () => setShow(false);
  const getUserById = async (id: number) => {
    const response = await privateAxiosInstance.get(
      USERSSURLS.getUserById(id),
      requestHeader
    );

    setUserDataById(response.data);
    setShow(true);
  };

  // const handleShow = (id: number) => {
  //   getUserById(id);
  //   setShow(true);
  // };

  const [userList, setuserList] = useState([]);
  const [paginationNumber, setPaginationNumber] = useState<number[]>([0]);
  const getUserList = async (pageSize: number, pageNumber: number) => {
    const response = await privateAxiosInstance.get(
      USERSSURLS.getUsersUrl(pageSize, pageNumber),
      requestHeader
    );
    setPaginationNumber(
      Array(response.data.totalNumberOfPages)
        .fill(null)
        .map((_, i) => i + 1)
    );
    setuserList(response.data.data);
  };

  const blockUser = async (id: number) => {
    try {
      await privateAxiosInstance.put(
        USERSSURLS.toggleStatusUrl(id),
        {},
        requestHeader
      );
      toast.success("status Changed sucssed");
      getUserList(10, 1);
    } catch (error: any) {
      console.log(error);
    }
  };

  //search
  const [searchValue, setSearchValue] = useState("");
  // const getValue = (e: any) => {
  //   console.log(e.target.value);
  //   setemail(e.target.value)
  // };

  const filterUserList = async (
    name: string,
    pageSize: number,
    pageNumber: number
  ) => {
    const response = await privateAxiosInstance.get(
      USERSSURLS.filteruser(name, pageSize, pageNumber),
      requestHeader
    );
    setuserList(response.data.data);
  };
  const getName = (e: any) => {
    setSearchValue(e.target.value);
    filterUserList(e.target.value, 10, 1);
  };

  //filterwithselect
  const getValue: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = await privateAxiosInstance.get(
      //`https://upskilling-egypt.com:3003/api/v1/Users/?${e.target.value}=${searchValue}`
      USERSSURLS.filerWithSelect(e.target.value, searchValue),
      requestHeader
    );
    setuserList(res.data.data);
    console.log("res", res);
  };

  useEffect(() => {
    getUserList(10, 1);
    return () => {};
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="text-center py-3">
            <div className="my-2">
              {userDataById.imagePath == null ? (
                <img width={60} src={noPhoto} alt="" className="rounded-2" />
              ) : (
                <img
                  width={60}
                  src={`${BASE_IMG_URL}/${userDataById.imagePath}`}
                  alt=""
                  className="rounded-2"
                />
              )}
            </div>
            <h4 className="my-2">{userDataById.userName}</h4>
            <h4 className="my-2">{userDataById.email}</h4>
            <h4 className="my-2">{userDataById.phoneNumber}</h4>
            <h4 className="my-2">
              {userDataById.isActivated ? (
                <span className="bg-success px-3 py-1 rounded-4 text-white fa-sm">
                  active
                </span>
              ) : (
                <span className="bg-danger px-2 py-1 rounded-4 text-white fa-sm">
                  Not Active
                </span>
              )}
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="bg-white px-5 py-4">
        <div className="bg-white  ">
          <div className="row ">
            <h2>users</h2>
          </div>
        </div>
      </div>
      <div className="userList p-5">
        <div className="bg-white  rounded-4 shadow-sm">
          <div className="p-4 ">
            <form className="row g-3">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-5"
                  onChange={getName}
                  placeholder="Search Fleets"
                />
              </div>
              <div className="col-auto position-relative">
                <i className="fa-solid fa-filter filterUser"></i>
                <select
                  className="form-select form-select-lg rounded-5  ps-5 "
                  onChange={getValue}
                >
                  <option value="" className="fa-1x">
                    Filter{" "}
                  </option>
                  <option value="userName">userName </option>
                  <option value="email">Email</option>
                  <option value="country">Country</option>
                </select>
              </div>
            </form>
          </div>

          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Statues</th>
                <th scope="col">phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">country</th>

                <th scope="col">Date Created</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: User) => (
                <tr key={user.id}>
                  <td> {user.userName}</td>
                  <td>
                    {user.isActivated ? (
                      <span className="bg-success px-3 py-1 rounded-4 text-white fa-sm">
                        active
                      </span>
                    ) : (
                      <span className="bg-danger px-2 py-1 rounded-4 text-white fa-sm">
                        Not Active
                      </span>
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>

                  <td>
                    {user.imagePath == null ? (
                      <img
                        width={40}
                        src={noPhoto}
                        alt=""
                        className="rounded-2"
                      />
                    ) : (
                      <img
                        width={40}
                        src={`${BASE_IMG_URL}/${user.imagePath}`}
                        alt=""
                        className="rounded-2"
                      />
                    )}
                  </td>
                  <td>
                    <div className="dropdown">
                      <i className="fa-solid fa-ellipsis-vertical dropbtn"></i>
                      <div className="dropdown">
                        <div className="dropdown-content px-4 p-3 rounded-3 shadow">
                          <span
                            className="d-flex justify-content-between align-items-center  "
                            style={{ cursor: "pointer" }}
                          >
                            <i
                              className="fa-solid fa-lock  pe-1 fa-sm"
                              onClick={() => {
                                blockUser(user.id);
                              }}
                            ></i>

                            {user.isActivated ? "block" : "active"}
                          </span>
                          <span
                            onClick={() => getUserById(user.id)}
                            className=" d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa-regular   fa-eye pe-1 fa-sm"></i>
                            View
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="py-5 ps-4">
            <nav>
              <ul className="pagination">
                {paginationNumber.map((p) => (
                  <li className="page-item">
                    <button
                      onClick={() => getUserList(10, p)}
                      className="page-link"
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
