import { motion   } from "framer-motion"
import { SlClose } from "react-icons/sl"
import Loader from "./loader"


interface UserType {
    login : string
    avatar_url: string
} 

interface modazinho {
    open : boolean,
    setSelectedId : Function,
    loading : boolean,
    seguidores : Array<UserType>,
    // setnewlogin : Function
    functiona : Function
}



function Modal( { open   , setSelectedId,  seguidores , loading  , functiona} : modazinho) {
  return (
    <>
    {
    open 
    && (
     <motion.div 
     initial={{y: "-100vh", opacity: 0,}}
     animate={{ y: 0, opacity: 1, }}
     transition={{        duration: 0.1, type: "spring", damping: 25, stiffness: 500,}}
     exit={{  y: "-100vh", opacity: 0,}}
     className="w-screen h-full  backdrop-filter backdrop-blur-lg  fixed justify-center  flex flex-col">
        <div  
        className="flex-col items-center justify-center   gap-y-7  h-full flex text-5xl ">
           { loading  ?
           
                <div className="bg-gradient-to-br  to-cyan-950 shadow-2xl xl:w-5/12 sm:w-9/12 w-7/12 rounded-2xl from-blue-900  flex-col">
                    <div>
                        <motion.button className=" fixed p-3 " onClick={() => (setSelectedId (!open))} >
                                <SlClose size={30} color="white" /> 
                        </motion.button>
                </div>
                <div  className=" flex-col  h-[24rem] mt-10  overflow-y-auto overflow-x-hidden flex-wrap w-full ">
            
                  { seguidores.length === 0 ? 
                   <>
                  <h1 className="text-center mt-6 text-red-800">
                    Não possui nenhum 
                  </h1>
                  </>
                  : <>
                    { 
                        seguidores.map ((i : UserType , a : number) =>
                    <>
                        <motion.div
                        initial={{scale:0}}
                        animate={{scale:1 , animation:2}}
                        whileHover={{scale:1.05}}
                        
                        // onClick={procuraseguidor(user)}
                        key={a} className="flex flex-row p-1 cursor-pointer items-center  justify-center w-full "
                        // href=""
                        >
                            <button 
                            onClick={() => (functiona(i.login))}
                            className=" p-1 pl-1 sm:pl-2 xl:pl-3 gap-3 bg-gradient-to-br to-cyan-700 shadow-2xl  from-blue-700 rounded-full flex items-center flex-row my-1 w-5/6">
                                <img className="h-10 w-10  rounded-full" src={i.avatar_url}/>
                                <motion.span className="text-base text-slate-200  font-black" >{i.login.charAt(0).toUpperCase() + i.login.slice(1) }</motion.span>
                            </button>
                        </motion.div>
                    </>
                    
                    ) 
                    
                    }
                    </>
                    }
                </div>
                </div>
               :
               <>
               <Loader/>
               </> }
            </div>
        </motion.div>
        )}
</>
  )
}

export default Modal