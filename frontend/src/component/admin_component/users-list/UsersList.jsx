import React, { useEffect, useState } from 'react';
import { UserIcon, LockClosedIcon, LockOpenIcon, UsersIcon } from '@heroicons/react/24/outline';
import ADMIN_API from '../../../api/ADMIN_API';

function UsersList() {
  const[users,setUsers]=useState([])

  async function fetchUsers(){
    try {
      const res = await ADMIN_API.get("/allUsers")
      setUsers(res.data.userList)
    } catch (error) {
      console.log('fetching the users failed')
    }

  }

  useEffect(()=>{
    fetchUsers()
  },[])

  async function handleBlock(id){
    try {
      await ADMIN_API.patch(`/userStatus/${id}`,{status:"blocked"});
      fetchUsers()

    } catch (error) {
      console.log('patching not done')
    }
  }

  async function handleUnblock(id){
    try {
      await ADMIN_API.patch(`/userStatus/${id}`,{status:"active"});
      fetchUsers()
    } catch (error) {
      console.log('unblock patch not done')
    }

  }

  return (
    <div className="min-h-screen items-start">
      <div className=" max-w-6xl bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
      
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <UserIcon className="w-7 h-7 text-indigo-400" />
            Users List
          </h2>
        </div>

        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">No</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-300">{user._id}</td>
                  <td className="px-6 py-4 text-white font-medium">{user.username}</td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "admin" ? "bg-blue-500/20 text-white"
                          :user.status ==="active" ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      <div className="flex items-center w-32 gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 !rounded-lg">
                        <UsersIcon className="w-4 h-4" /> Admin
                      </div>
                    ) : user.status === "active" ? (
                      <button onClick={()=>handleBlock(user._id)} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 !rounded-lg">
                        <LockClosedIcon  className="w-4 h-4" /> Block
                      </button>
                    ) : (
                      <button onClick={()=>handleUnblock(user._id)} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 !rounded-lg">
                        <LockOpenIcon className="w-4 h-4" /> Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
