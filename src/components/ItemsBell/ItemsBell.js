import React,{useRef,useState,useEffect} from 'react'
import classes from './ItemsBell.css'
import ItemBell from '../ItemsBell/ItemBell/ItemBell'
import Bell from '../../assets/icons/bell.svg'
  
const ItemsBell = ()=> {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [isVis, setVis] = useState(false)
    const VisChange = () =>{
        setVis((prev)=>!prev)
    }
    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setVis(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    return (
        <div ref={wrapperRef} className={`d-inline-block ${classes.float_right} ${classes.spacing} px-2 py-1 bg-white ${classes.item} ${classes.relative}`}>
            <img onClick={VisChange} style={{ cursor: 'pointer'}} src={Bell} alt="bell" className="img-fluid" />
            <span onClick={VisChange} className={classes.button_badge}>4</span>
            {isVis?
            <div className={`d-flex flex-column justify-content-around ${classes.bell_container} bg-white ${classes.float_right} ${classes.absolute} ${classes.bell_items}`}>
                <ItemBell icon={Bell} text="Trending now: jobs related~to UX/UI design learn more"/>
                <ItemBell icon={Bell} text="New tips: how to collect~the right data"/>
                <ItemBell icon={Bell} text="Trending now: jobs related~to UX/UI design learn more"/>
                <div className={classes.See_all_border}>
                    See all
                </div>
            </div>
            :null
            }
        </div>
    )
}
export default ItemsBell;
