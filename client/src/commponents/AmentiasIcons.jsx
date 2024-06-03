// Apologies for the confusion. Here's the list of all items without categorization:

// - Bathtub
import { FaBath, FaRegBuilding, FaTrailer } from "react-icons/fa";

// - Cleaning products
import { FaPumpSoap } from "react-icons/fa";

// - Hot water
import { FaShower } from "react-icons/fa";

// - Washer
import { BiSolidWasher } from "react-icons/bi";

// - Hangers
import { TbHanger } from "react-icons/tb";
// - Iron
import { TbIroning } from "react-icons/tb";
// - TV

import { PiAlienBold, PiCoffee, PiTelevisionSimpleBold } from "react-icons/pi";
// - Hot tub
import { MdHotTub, MdOutlineCastle } from "react-icons/md";

// - Ping pong
import { RiGroupLine, RiPingPongLine } from "react-icons/ri";

// - Crib
import { MdOutlineCrib } from "react-icons/md";

// - WiFi
import { FaWifi } from "react-icons/fa";

// - Dedicated workspace

import { BsPersonWorkspace } from "react-icons/bs";

// - Kitchen
import { FaKitchenSet, FaTent } from "react-icons/fa6";

// - Refrigerator
import { MdOutlineKitchen } from "react-icons/md";

// - Microwave
import { LuDoorOpen, LuHotel, LuMicrowave, LuSailboat } from "react-icons/lu";

// - Dishes
import { TbToolsKitchen2 } from "react-icons/tb";

// - Coffee maker
import { MdOutlineCoffeeMaker } from "react-icons/md";

// - Elevator
import { PiElevatorLight } from "react-icons/pi";

// - Parking
import { FaCarSide } from "react-icons/fa";

// - Snooker
import { RiBilliardsFill } from "react-icons/ri";
// - High chair
import { MdBabyChangingStation } from "react-icons/md";
// - Oven
import { GiBarn, GiCookingGlove, GiTreehouse, GiWoodCabin } from "react-icons/gi";

// - Gas stove
import { GiGasStove } from "react-icons/gi";

// - Dining table
import { MdOutlineBrunchDining } from "react-icons/md";
// essentials
// drying rack
import * as stylex from "@stylexjs/stylex";
// home
import { IoHomeOutline } from "react-icons/io5";

import { colors } from "../tokens.stylex";
const styles = stylex.create({
  amentiasDisplay: { fontSize:"xx-large" },
  button:{fontSize:"large"}
});
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { PiToiletPaper } from "react-icons/pi";
const AmenitiesIcons = ({ amenity, variant }) => {
  const amenityMap = {
    bathtub: <FaBath />,
    cleaningProducts: <FaPumpSoap />,
    hotWater: <FaShower />,
    washer: <BiSolidWasher />,
    hangers: <TbHanger />,
    iron: <TbIroning />,
    tv: <PiTelevisionSimpleBold />,
    hotTub: <MdHotTub />,
    pingPong: <RiPingPongLine />,
    crib: <MdOutlineCrib />,
    wifi: <FaWifi />,
    dedicatedWorkspace: <BsPersonWorkspace />,
    refrigerator: <MdOutlineKitchen />,
    microwave: <LuMicrowave />,
    dishes: <TbToolsKitchen2 />,
    coffeeMaker: <MdOutlineCoffeeMaker />,
    elevator: <PiElevatorLight />,
    parking: <FaCarSide />,
    snooker: <RiBilliardsFill />,
    highChair: <MdBabyChangingStation />,
    oven: <GiCookingGlove />,
    gasStove: <GiGasStove />,
    diningTable: <MdOutlineBrunchDining />,
    essentials: <PiToiletPaper />,
    kitchen: <FaKitchenSet />,
    dryingRack: <MdOutlineLocalLaundryService />,
    home:<IoHomeOutline/>,
    bedAndBreakfast: <PiCoffee/>, 
    apartment: <FaRegBuilding />, 
    hotel: <LuHotel />, 
    boat: <LuSailboat />, 
    cabin: <GiWoodCabin />, 
    tent: <FaTent  />, 
    trailer: <FaTrailer  />, 
    castle: <MdOutlineCastle  />, 
    barn: <GiBarn   />, 
    alien: <PiAlienBold  />, 
    treeHouse: <GiTreehouse  />, 
    door: <LuDoorOpen  />, 
    shared: <RiGroupLine/>, 
    hairdryer: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10"
        ></path>
      </svg>
    ),
  };

  if (amenityMap[amenity]) {
    return <span {...stylex.props(styles.amentiasDisplay,styles[variant])}>{amenityMap[amenity]}</span>;
  } else {
    return null;
  }
};

export default AmenitiesIcons;
