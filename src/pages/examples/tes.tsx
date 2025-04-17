import { isEmailExist } from "@/db/action/user"
import { useEffect } from "react"

export default function Tes() {

    useEffect(() => {
        const email = isEmailExist("yusufpazuruan@gmail.com")
        alert(email)
    },[])
  return (
    <div>tes</div>
  )
}
