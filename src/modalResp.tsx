import { motion   } from "framer-motion"
import { SlClose } from "react-icons/sl"
import Loader from "./loader"


interface UserType {
    name : string
    url: string
    created_at : string
    language : string
    html_url : string
} 

interface modazinho {
    open : boolean,
    setSelectedId : Function,
    loading : boolean,
    seguidores : Array<UserType>,
    // setnewlogin : Function
    // functiona : Function
}





function ModalResp( { open   , setSelectedId,  seguidores , loading  } : modazinho) {

    const formatadata = (semfomatar : string) => {
        const data = new Date(`${semfomatar}`);
  
  // Obtém os componentes da data
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Os meses são indexados em 0, então somamos 1
  const ano = data.getFullYear();
  
     return  `${dia}/${mes}/${ano}`}

  
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
           
                <div className="bg-gradient-to-br  to-cyan-950 shadow-2xl xl:w-5/12 sm:w-6/12 w-7/12 rounded-2xl from-blue-900  flex-col">
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
                        key={a} className="flex flex-row p-1 cursor-pointer items-center  justify-center w-full  "
                        // href=""
                        >
                            <a href={`${i.html_url}`} target="_blank"
                            // onClick={() => (functiona(i.login))}
                            className=" p-2 xl:p-1 pl-2 text-xs sm:text-sm xl:text-base   gap-3 bg-gradient-to-br to-cyan-700 shadow-2xl  from-blue-700 rounded-full   my-1 w-5/6">
                            <div className="w-full grid-cols-1 xl:grid-cols-2 gap-2 grid justify-items-center">
                                <div>
                                <span className=" shadow-2xl break-all text-slate-100 font-black bg-gradient-to-r from-blue-500 to-sky-500 p-1 px-3 rounded-full" >
                                        {i.name}
                                        
                                    </span>
                                </div>
                                   
                                    <motion.span className="text-xs sm:text-sm xl:text-base shadow-2xl  bg-gradient-to-r from-blue-100 to-sky-300 p-1 rounded-full font-semibold" >{formatadata(i.created_at)}</motion.span>
                                    
                                        <div>
                                        <span className={ !(i.language === null ) ? " text-slate-100  shadow-2xl bg-gradient-to-r from-orange-600 to-amber-500 rounded-full p-1 font-semibold" : 
                                    "bg-gradient-to-r text-slate-100 from-red-600 to-red-900 rounded-full break-all p-1 shadow-2xl font-semibold" }>
                                                {
                                                !(i.language === null )  ? <>
                                                {i.language}</>:<>Linguagem não reconhecida</> 
                                                }
                                            </span>
                                        </div>
                                           
                                       
                                    </div>
                               
                            </a>
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

export default ModalResp