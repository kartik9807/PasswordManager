import React from 'react'
import { useRef,useState,useEffect } from 'react'
import eye from '../assets/eye.png'
import eyeCross from '../assets/eyecross.png'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref= useRef()
    const passref = useRef()
    const [form, setform] = useState({
        id:"",
        site:"",
        username:"",
        password:""
    })
    const [saveL, setSaveL] = useState([])
    const copytext = (text)=>{
        toast.info('Copied to Clipboard !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    const handleChange = (e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const handleDelete = async(id)=>{
        let a = confirm("Are you sure you want to delete this password")
        if(a){
            let res = await fetch("https://passwordmanager-1-vl26.onrender.com/",{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            })
            // localStorage.setItem("passwords",JSON.stringify(saveL.filter((item)=>item.id!==id)))
            
            setSaveL(saveL.filter((item)=>item.id!==id))
            toast.success('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleEdit = (key)=>{
        setSaveL(saveL.filter((item)=>item.id!==key))
        let form = saveL.filter((item)=>item.id===key)[0]
        setform({...form,id:key})
    }
    const showPassword = ()=>{
        if(ref.current.src.includes(eyeCross)){
            ref.current.src = eye
            passref.current.type = "password"
        }else{
            ref.current.src = eyeCross
            passref.current.type = "text"
        }
    }   
    const savePassword = async()=>{
        if(form.site === "" || form.username === "" || form.password === ""){
            toast.error('Please fill all the fields !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        toast.success('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        let uid = uuidv4()
        // if any such id exist in db delete it
        await fetch("https://passwordmanager-1-vl26.onrender.com/",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id:form.id})
        })
        let res = await fetch("https://passwordmanager-1-vl26.onrender.com/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...form,id:uid})
        })
        setSaveL([...saveL,{...form,id:uid}])
        setform({
            id:"",
            site:"",
            username:"",
            password:""
        })
    }
    const getPasswords = async()=>{
        let req = await fetch("https://passwordmanager-1-vl26.onrender.com/")
        let passwords = await req.json()
        setSaveL(passwords)
    }
    useEffect(() => {
        getPasswords()

    }, [])
    
    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="flex flex-col mt-14 mx-auto max-w-4xl">
                <div className="content">
                    <h1 className='text-4xl font-bold text-center'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></h1>
                    <p className='text-xl text-center font-medium'>Your own password manager</p>
                </div>
                <div className='text-black flex flex-col p-4 gap-4 items-center'>
                    <input className="rounded-full w-full p-1 px-3 border-green-300 border-2 bg-green-50 text-sm md:text-lg" required type="text" value={form.site} onChange={handleChange} name="site" placeholder='Enter website URL'/>
                    <div className='flex gap-2 w-full'>
                        <input className="md:w-[75%] w-[50%] myinput-css text-sm md:text-lg" type="username" name="username" required value={form.username} onChange={handleChange} placeholder='Enter Username'/>
                        <div className='md:w-[25%] w-[50%] relative'>
                            <input ref={passref} className="w-full myinput-css text-sm md:text-lg" type="password" required value={form.password} onChange={handleChange} name="password" placeholder='Enter Password'/>
                            <span className='absolute right-2 top-2/4 -translate-y-2/4'>
                                <img ref={ref} src={eye} alt="" className='w-5 cursor-pointer' onClick={showPassword}/>
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex itme-center text-center w-fit justify-center text-xl font-bold gap-1 bg-green-500 p-2 px-6 rounded-full cursor-pointer hover:bg-green-400 transition-all duration-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
            </div>
            <div className='flex flex-col mt-5 mx-auto items-baseline max-w-4xl gap-2'>
                <h1 className='text-center text-xl font-bold lg:text-2xl md:p-2 px-4 md:container sm:text-left'>Your Passwords</h1>
                {saveL.length === 0 ? <p className='text-center text-md font-medium px-4 md:px-2'>No passwords to show</p>:
                <div className='flex flex-col lg:flex-row max-h-70 gap-4 w-full overflow-y-scroll myscrollBar p-4 lg:p-0'>
                    <table className="table-auto  rounded-t-md w-full overflow-hidden shadow-lg">
                        <thead className='bg-green-800 text-white font-bold h-8'>
                            <tr>
                                <th className='md:w-[60%] w-[25%] py-2'>Site</th>
                                <th className='md:w-[15%] w-[25%] py-2'>Username</th>
                                <th className='md:w-[15%] w-[25%] py-2'>Password</th>
                                <th className='md:w-[10%] w-[25%] py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='w-full bg-green-200 h-10 text-center font-medium overflow-y-auto'>
                            {Array.from(saveL).map((items,index)=>{
                                return(
                                    <tr className='w-full h-11 hover:bg-green-300 transition-colors duration-100' key={items.id}>
                                        <td>
                                            <div className="flex items-center justify-center">
                                                <a href={items.site} target='_blank' rel='noopener noreferrer'>{items.site}</a>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" className="cursor-pointer" onClick={()=>{copytext(items.site)}} >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center">
                                                {items.username}
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" className="cursor-pointer" onClick={()=>{copytext(items.username)}} >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center">
                                                {"*".repeat(items.password.length)}
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" className="cursor-pointer" onClick={()=>{copytext(items.password)}} >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-1">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{"width":"25px", "height":"25px","cursor":"pointer"} } onClick={()=>handleEdit(items.id)} >
                                                </lord-icon>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{"width":"25px", "height":"25px","cursor":"pointer"}} onClick={()=>handleDelete(items.id)}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}     
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    </>
    )
}

export default Manager
