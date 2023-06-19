import {  useState } from "react";
import "./global.css"
import api from "./AxiosInstace";
import { FaSearch } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import Loader from "./loader";
import {  motion } from "framer-motion";
import Modal from "./modal";

interface UserType {
  name: string;
  html_url: string;
  avatar_url: string;
  public_repos: number;
  location: string;
  followers: number;
  following: number;
  login : string;
  bio: string;
  created_at : string;
  email : string
}

function App() {
  const [usuario, setUsuario] = useState<UserType | null>(null);
  // const [usuario1, setUsuario1] = useState<UserType | null>(null);
  const [isOpen , setIsOPen ] = useState(true)
  const [error, setError] = useState(null);
  const [seguidores , setSeguidores] = useState([])
  const [seguindo , setSeguindo ] = useState([])
  const [selectedId, setSelectedId] = useState(false)
  const [selectedId1, setSelectedId1] = useState(false)
  // const [selectedId2, setSelectedId2] = useState(false)
  const[loading, setLoading] = useState (true)
  const[loading1, setLoading1] = useState (true)
  const[loading2, setLoading2] = useState (true)
  // const[loading3, setLoading3] = useState (true)

  const [user , setUser] = useState("");


  const  procurause = () => {
    setLoading(false)
   async function mandar() {
   await api
    .get(user)
    .then((res) => {
      console.log(res.data)
      setUsuario(res.data);
    })
    .catch((error) => setError(error.message))
    console.log("passei")
    setLoading(true)
   } 

mandar()
setIsOPen(!isOpen)

  }

  const  procuraseguidores = () => {
    setLoading1(false)
   async function mandara() {
   await api
    .get(`${user}/followers`)
    .then((res) => {
      console.log(res.data)
      setSeguidores(res.data);
    })
    .catch((error) => setError(error.message))
    console.log("passei")
    setLoading1(true)
   } 

mandara()
setSelectedId(!selectedId)

  }
//   const  forgetfollow = (user1 : any) => {
//     setLoading1(false)
//    async function mandara() {
//    await api
//     .get(`${user1}`)
//     .then((res) => {
//       console.log(res.data)
//       setSeguidores(res.data);
//     })
//     .catch((error) => setError(error.message))
//     console.log("passei")
//     setLoading1(true)
//    } 

// mandara()
// setSelectedId(!selectedId)

//   }
  const  procuraseguindo = () => {
    setLoading2(false)
   async function mandar() {
   await api
    .get(`${user}/following`)
    .then((res) => {
      console.log(res.data)
      setSeguindo(res.data);
    })
    .catch((error) => setError(error.message))
    console.log("passei")
    setLoading2(true)
   } 

mandar()
setSelectedId1(!selectedId1)
// setIsOPen(!isOpen)

  }

  const fechar  = () =>{
    async function madar() {
       await setIsOPen(!isOpen)
       setUser("")
       setError(null)
    } 
    madar()
    setSelectedId(false)
    setSelectedId1(false)
  }

  const data = new Date(`${usuario?.created_at}`);
  
  // Obtém os componentes da data
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Os meses são indexados em 0, então somamos 1
  const ano = data.getFullYear();
  
  const databrasil =  `${dia}/${mes}/${ano}`

  return (
    
    <>
        <div className=" w-screen h-screen bg-gradient-to-tl overflow-auto justify-center  to-zinc-900  from-blue-950" >
      { 
      isOpen ?
        
        <div className="w-full h-full  flex items-center flex-col ">
        <div className="w-3/4  gap-6 flex flex-col items-center h-auto ">
        <h1 className="sm:text-4xl xl:text-6xl text-3xl mt-40 text-slate-50 font-bold ">
            Procurar Usuario
          </h1>
        <div className="flex flex-row sm:w-96 xl:w-2/4 justify-around items-center">
          <input type="text" placeholder="Digite um usuario" className="rounded-full w-5/6 outline-none pl-2 p-1" onChange={(event) => setUser(event.target.value)}/>
          <button className="p-1 outline-none"  onClick={procurause}><FaSearch color="white" size={24}/></button>
          </div>  
        </div>
        </div>
        
        :
        <>
   {
   error ? 
   <>
  <button className="m-8 fixed p-2" onClick={fechar}>
        <SlClose size={30} color="white" />
        </button>
 <h1 className="sm:text-4xl xl:text-6xl mt-32 text-3xl text-center text-red-700">{error}</h1> 
 </> :
   <>
   {
    loading ? 
    <> 
    {  
        usuario && 
        <>
            <Modal  loading={loading1} open={selectedId} setSelectedId={setSelectedId} seguidores={seguidores} />
            <Modal  loading={loading2}  open={selectedId1} setSelectedId={setSelectedId1} seguidores={seguindo} />
        <button className="m-8 fixed p-2" onClick={fechar}>
        <SlClose size={30} color="white" />
        </button>
      
         <div className="w-full h-full justify-center  flex items-center flex-col ">
         
        <motion.div 
      // initial={{x :"-100vh" }}
      // animate={{ x :0 }}
      // transition={{duration: 0.1}}
        className="flex flex-col h-4/6 bg-gradient-to-br  to-cyan-950 shadow-2xl  from-blue-900 gap-2 justify-between rounded-xl p-2 w-80 xl:w-96   items-center ">
       
        {
        usuario?.name === null ? 
        <>
        <div>
        <span className="font-black text-base text-cyan-50 ">
          {usuario.login}
        </span>
        </div>
          
         </>
          : 
          <div>  
        <span className="font-black text-base text-cyan-50 ">
          {usuario?.name}
        </span>
        </div>
        }
       
          
         
          <motion.a 
          whileHover={{scale:1.15}}
          href={usuario.html_url} target="_blank"  >
          <img  className="w-52 h-52 rounded-full shadow-2xl " src={usuario.avatar_url} alt={usuario.name} />
          </motion.a>
        {!usuario?.email === null && <span className="font-black text-base text-cyan-50 ">{usuario?.email}</span>}
          <div className="flex flex-row rounded-xl   w-11/12 h-auto   pl-1  justify-between">
          <motion.div 
           whileHover={{scale:1.2}}
           onClick={procuraseguidores}
          className="flex flex-col cursor-pointer  items-center">
            <motion.div 
           
            className=" bg-blue-200 shadow-2xl h-8 justify-center items-center flex w-8 p-1 rounded-full">
            <span className="p-1  font-bold ">
            {usuario.followers}
              </span>
            </motion.div>
            <span className="text-base text-cyan-50 font-bold">
            Seguidores
            </span>
            </motion.div>
            <div className="flex  shadow-2xl flex-col items-center">
            <span className=" bg-blue-200 h-8 justify-center items-center font-bold flex w-8 p-1 rounded-full">
            {usuario.public_repos}
            </span>
            <span className="text-base text-cyan-50 font-bold">
            Repositórios
            </span>
          
            </div>
          <motion.div 
          whileHover={{scale:1.2}}
          onClick={procuraseguindo} className="flex flex-col cursor-pointer shadow-2xl items-center">
            <span  className=" bg-blue-200 cursor-pointer h-8 text font-bold justify-center items-center flex w-8 p-1 rounded-full">
            {usuario.following}
            </span>
            <span className="text-base text-cyan-50 font-bold">
            Seguindo 
            </span>
          
            </motion.div>
          </div>
          
         
            <div className="flex flex-col rounded-xl  gap-3 text-cyan-50  w-11/12  pl-1 pt-1 justify-center">
            <div>
        <span className="font-black  text-base">
          Criado em : 
          </span>
          <span className="pl-2">
          {databrasil}
          </span>
        </div>
          { 
         !(usuario?.location ===  null) &&
            <div >
             <span className="font-black text-base">
              Localização :
              </span>
             <span className=" pl-2">
              {usuario.location}
              </span>
            </div>
            }
         
          { 
          !(usuario?.bio === null) &&
            <div>
            <span className="text-center ">
              {usuario?.bio}
              </span>
            </div>}
          </div>
          
          
          </motion.div>
         </div>
       
        </>
        }
    
    </> : 
    <div className=" w-full h-full ">
      <div className="justify-center items-center mt-24 flex">
      <Loader/>
      </div>
    </div>
   }
      
    </>
        }
      </>  
      }


 

      </div>
        </>
  );
}

export default App;
