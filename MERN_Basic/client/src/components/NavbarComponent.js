import { getUser ,logout} from "../services/authorize"
const NavberComponent=()=>{


    return(
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <a href="/" className="nav-link"> หน้าเเรก </a>
                </li>
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <a href="/create" className="nav-link"> เขียนบทความ </a>
                    </li>
                )}
                {!getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <a href="/login" className="nav-link">เข้าสุ่ระบบ</a>
                    </li>
                )}
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <button className="nav-link" onClick={()=>logout(()=>window.location.href="/")}>ออกจากระบบ</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}
export default NavberComponent