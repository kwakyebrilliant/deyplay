import React from 'react'

function Login() {
  return (
    <div>

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
      Connect Address
    </h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
      dolores deleniti inventore quaerat mollitia?
    </p>

    <form
      action=""
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center text-lg font-medium">Choose user type</p>

      <div>
        <label for="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black border-black"
      >
        Connect Wallet
      </button>
    </form>
  </div>
</div>
    </div>
  )
}

export default Login


// {showModal ? (
//     <>
//     <div
//         classNameName="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//     >
//         <div classNameName="relative w-full my-6 mx-auto max-w-3xl">
//         {/*content*/}
//         <div classNameName="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//             {/*header*/}
//             <div classNameName="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//             <h3 classNameName="text-xl font-semibold">
//                 Choose User
//             </h3>
//             <button
//                 classNameName="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                 onClick={() => setShowModal(false)}
//             >
//                 <span classNameName="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                 ×
//                 </span>
//             </button>
//             </div>
//             {/*body*/}
//             <div classNameName="relative space-y-4 p-6 flex-auto">
            
//             <div>
           

//             <select
//                 name="HeadlineAct"
//                 id="HeadlineAct"
//                 classNameName="mt-1.5 py-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
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
//             <div classNameName="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//             <button
//                 classNameName="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//                 onClick={() => setShowModal(false)}
//             >
//                 Close
//             </button>
//             </div>
//         </div>
//         </div>
//     </div>
//     <div classNameName="opacity-25 fixed inset-0 z-40 bg-black"></div>
//     </>
// ) : null}