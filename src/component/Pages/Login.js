import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login


// {showModal ? (
//     <>
//     <div
//         className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//     >
//         <div className="relative w-full my-6 mx-auto max-w-3xl">
//         {/*content*/}
//         <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//             {/*header*/}
//             <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//             <h3 className="text-xl font-semibold">
//                 Choose User
//             </h3>
//             <button
//                 className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                 onClick={() => setShowModal(false)}
//             >
//                 <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                 ×
//                 </span>
//             </button>
//             </div>
//             {/*body*/}
//             <div className="relative space-y-4 p-6 flex-auto">
            
//             <div>
           

//             <select
//                 name="HeadlineAct"
//                 id="HeadlineAct"
//                 className="mt-1.5 py-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
//                 required onChange={(e) => { setUser(e.target.value) }}
//             >
//                 <option>Please select</option>
//                 <option value="user">User</option>
//                 <option value="artiste">Artiste</option>
//             </select>
//             </div>
//             {
//                 user ==='user' && (
//                     navigate('/', {state: user})
//                 )
//             } 
//             {
//                 user ==='artiste' && (
//                     navigate('/dashboard', {state: user})
//                 )
//             } 

        

//             </div>
//             {/*footer*/}
//             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//             <button
//                 className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//                 onClick={() => setShowModal(false)}
//             >
//                 Close
//             </button>
//             </div>
//         </div>
//         </div>
//     </div>
//     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//     </>
// ) : null}