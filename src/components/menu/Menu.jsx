import { Link } from "react-router-dom"
import { menu } from "../../data";
import "./menu.css"

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <button className="menubutton" key={item.id}>
          <div className="item">
            <Link className="listItem" to={item.url}>
                <img src={item.icon} alt="" className="listitemimg"/>
                <span className="listItemTitle">{item.title}</span>
              </Link>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Menu