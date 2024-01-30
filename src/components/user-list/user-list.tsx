import React, { Children, FC, useEffect, useRef, useState } from 'react';
import './user-list.scss';
import apiService from '../../services/api.service';
import Loaded from '../loaded/loaded';
import { isTemplateExpression } from 'typescript';
import UserDetails from '../user-details/user-details';
import userModel from '../../models/userModel';
import { Modal } from 'react-bootstrap';
import MyModal from '../my-modal/my-modal';
import { NULL } from 'sass';
import { error } from 'console';

interface UserListProps { }

const UserList: FC<UserListProps> = () => {
  const [errorMessage,setErrorMessage]=useState<string>("")
  const [currentUser,setCurrentUser]=useState<userModel>()
  const [listUsers, setListUsers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listUsersFilter, setListUsersFilter] = useState<any>([]);
  const [isModal, setIsModal] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    loadUsers();
  }, [])
  const loadUsers = () => {
    setIsLoaded(true)
    apiService.getListApi().then((res: any) => {
      setListUsers(res.data)
      setListUsersFilter(res.data)
      setIsLoaded(false)
    }
    ,error=>{
      setErrorMessage('error on load user')
      setTimeout(()=>{
        setErrorMessage('')
      },1000)
    })
    
  }
  // const  deleteItem = async (id:number)=>{
  //   apiService.deleteApi(currentUser?.id).then((res)=>{
  //     listUsers.splice(currentUser?.id,1)
  //     setListUsers([...listUsers])
  //     setListUsersFilter([...listUsers])
  //   },error=>{
  //     setErrorMessage('error on delete user')
  //     //loadUsers()
  //     setTimeout(()=>{
  //       setErrorMessage('')
  //     },1000)
  //   })
  // }

  const searchUser = () => {
    let searchValue = nameRef.current?.value;
    setListUsersFilter(listUsers.filter((item) => item.name.includes(searchValue)))
  }
  const toAddUser = (user: userModel) => {
    listUsers.push(user)
    setListUsers([...listUsers])
    setListUsersFilter([...listUsers])
  }
  const Confirm=(value:any )=>{
    if( value=="Confirm")
    {
      let indexUserDelete= listUsers.findIndex((u)=>u.id==currentUser?.id) 
      // listUsers.splice(indexUserDelete,1)
    let userDelete= listUsers.find((u)=>u?.id==currentUser?.id) 
    console.log(userDelete?.id)
    apiService.deleteApi(userDelete?.id).then((res)=>{
      listUsers.splice(indexUserDelete,1)
      setListUsers([...listUsers])
      setListUsersFilter([...listUsers])
      setIsModal(false)
    },error=>{
      setErrorMessage('error on delete user')
      //loadUsers()
      setTimeout(()=>{
        setErrorMessage('')
      },1000)
    })
    //  setListUsers([...listUsers])
    //  setListUsersFilter([...listUsers])
    //  setIsModal(false)
    }
    else{
      setIsModal(false)
    }
  }
  return <div className="user-list">
 {errorMessage != "" ? <div className="alert alert-danger" role="alert">
     {errorMessage}
   </div> : ""}
    <div dir='rtl' className='row'>
   
      <div className='col-sm-6'>
        <strong > :Search by name</strong>
        <br />
        <input className='search' ref={nameRef} onChange={searchUser}></input>
        <table className='table table-striped'>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>To Delete</th>
            </tr>
          </thead>
         
          <tbody>
            {listUsersFilter.map((u: any, i: number) => {
              return <tr>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td><button onClick={()=>{setCurrentUser(u); setIsModal(true)}} className='btn btn-primary'>Delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
        {isLoaded ? <Loaded title='...Loading'  ></Loaded> : ''}
      </div>
      <div className='col-sm-6'>
        <UserDetails addUserFunction={toAddUser}></UserDetails>
        {isModal?<MyModal title={`Delete ${currentUser?.name}`} confirmFunction={Confirm}>
          <strong>
              ?Are you sure that you want to delete this user
          </strong>
        </MyModal>:""} 
      </div>
    </div>
  </div >
};

export default UserList;