import {
  AirVentIcon,
  BathIcon,
  BedIcon,
  Coffee,
  RulerIcon,
  ShowerHead,
  Table,
  Table2,
  Table2Icon,
  Tv,
  WifiIcon,
} from "lucide-react";

export const FasilityRoomStandard = (data: any) => {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-2 items-centter">
          <RulerIcon className="w-6 h-6" />
          <div className="flex flex-col">
            <div className="font-medium">Size Room</div>
            <div className="text-muted-foreground">600 sq ft</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <BedIcon className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">Beds</div>
            <div className="text-muted-foreground">1 Twin</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <ShowerHead className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">Bathrooms</div>
            <div className="text-muted-foreground">1 Bath with Shower</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <WifiIcon className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">Wifi</div>
            <div className="text-muted-foreground">High Speed Wifi</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <Tv className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">TV</div>
            <div className="text-muted-foreground">55" Smart TV</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <AirVentIcon className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">AC</div>
            <div className="text-muted-foreground">Air Vent</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <Table2 className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">Meja</div>
            <div className="text-muted-foreground">1 Table</div>
          </div>
        </div>
        <div className="flex gap-2 items-centter">
          <Coffee className="w-6 h-6" />
          <div className="flex flex-col ">
            <div className="font-medium">Coffe</div>
            <div className="text-muted-foreground">Coffe Maker</div>
          </div>
        </div>
      </div>
    </>
  );
};
export const FasilityRoomPremium = (data: any) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex gap-2 items-centter">
        <RulerIcon className="w-6 h-6" />
        <div className="flex flex-col">
          <div className="font-medium">Size Room</div>
          <div className="text-muted-foreground">600 sq ft</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <BedIcon className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">Beds</div>
          <div className="text-muted-foreground">2 King and 1 Twin</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <BathIcon className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">Bathrooms</div>
          <div className="text-muted-foreground">
            1 Bathub with Shower and jacuzzi
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <WifiIcon className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">Wifi</div>
          <div className="text-muted-foreground">High Speed Wifi</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <Tv className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">TV</div>
          <div className="text-muted-foreground">55" Smart TV</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <AirVentIcon className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">AC</div>
          <div className="text-muted-foreground">Air Vent</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <Table2 className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">Meja</div>
          <div className="text-muted-foreground">1 Table</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <Coffee className="w-6 h-6" />
        <div className="flex flex-col ">
          <div className="font-medium">Coffe</div>
          <div className="text-muted-foreground">Coffe Maker</div>
        </div>
      </div>
      <div className="flex gap-2 items-centter">
        <svg
          className="w-6 h-6 text-muted-foreground fill-white"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M472,280h-16H136.084c-0.016,0-0.032,0-0.048,0H56H40c-13.234,0-24,10.767-24,24c0,4.418,3.582,8,8,8s8-3.582,8-8 c0-4.411,3.589-8,8-8h6.556L27.983,407.443c-2.81,16.864,0.486,34.225,9.282,48.884L48,474.216V503c0,4.963,4.038,9,9,9h398 c4.962,0,9-4.037,9-9v-28.784l10.735-17.889c8.796-14.659,12.092-32.02,9.282-48.884L465.444,296H472c4.411,0,8,3.589,8,8 c0,4.418,3.582,8,8,8s8-3.582,8-8C496,290.767,485.234,280,472,280z M421.015,448.095L411.471,464h-23.654l5.652-14.13 c4.385-10.962,6.014-22.959,4.71-34.694L384.938,296h24.285l19.012,114.074C430.42,423.19,427.856,436.693,421.015,448.095z M346.603,464l5.335-18.69c2.368-8.292,3.223-16.856,2.541-25.456L344.659,296h24.18l13.438,120.943 c1.014,9.127-0.252,18.458-3.664,26.983L370.584,464H346.603z M304.463,464l1.646-29.252c0.096-1.711,0.131-3.449,0.104-5.168 L304.126,296h24.483l9.92,125.119c0.53,6.688-0.134,13.349-1.976,19.798L329.964,464H304.463z M264,464V296h24.124l2.091,133.83 c0.021,1.337-0.006,2.69-0.081,4.021L288.438,464H264z M223.515,464l-1.872-29.944c-0.092-1.484-0.126-2.986-0.1-4.467L223.863,296 H248v168H223.515z M100.529,464l-9.544-15.905c-6.841-11.401-9.405-24.904-7.22-38.021L102.777,296h24.285L113.82,415.176 c-1.304,11.735,0.325,23.732,4.71,34.694l5.652,14.13H100.529z M141.416,464l-8.03-20.073c-3.411-8.525-4.678-17.856-3.664-26.983 L143.161,296h24.175l-9.884,123.77c-0.691,8.658,0.175,17.28,2.575,25.627L165.376,464H141.416z M182.024,464l-6.62-23.025 c-1.867-6.491-2.541-13.197-2.003-19.932L183.387,296h24.473l-2.314,133.311c-0.034,1.902,0.01,3.834,0.129,5.742l1.81,28.947 H182.024z M43.765,410.074L62.777,296h23.78L67.983,407.443c-2.81,16.864,0.486,34.225,9.282,48.884L81.869,464h-21.34 l-9.544-15.905C44.144,436.693,41.58,423.19,43.765,410.074z M448,496H64v-16h31.992c0.005,0,0.01,0.001,0.015,0.001 c0.005,0,0.01-0.001,0.015-0.001h39.954c0.009,0,0.017,0.002,0.026,0.002c0.014,0,0.028-0.002,0.042-0.002h39.928 c0.008,0,0.016,0.002,0.024,0.002c0.009,0,0.019-0.002,0.028-0.002h159.952c0.009,0,0.019,0.002,0.028,0.002 c0.008,0,0.016-0.002,0.024-0.002h39.928c0.014,0,0.028,0.002,0.042,0.002c0.009,0,0.017-0.002,0.026-0.002h39.954 c0.005,0,0.01,0.001,0.015,0.001c0.005,0,0.01-0.001,0.015-0.001H448V496z M461.015,448.095L451.471,464h-21.34l4.604-7.673 c8.796-14.659,12.092-32.02,9.282-48.884L425.444,296h23.779l19.012,114.074C470.42,423.19,467.856,436.693,461.015,448.095z"></path>{" "}
              <path d="M104,264c4.418,0,8-3.582,8-8V16h288v240c0,4.418,3.582,8,8,8s8-3.582,8-8V16c0-8.822-7.178-16-16-16H112 c-8.822,0-16,7.178-16,16v240C96,260.418,99.582,264,104,264z"></path>{" "}
              <path d="M376,264c4.418,0,8-3.582,8-8V40c0-4.418-3.582-8-8-8H136c-4.418,0-8,3.582-8,8v216c0,4.418,3.582,8,8,8s8-3.582,8-8V136 h79.999c4.418,0,8-3.582,8-8s-3.582-8-8-8H144V48h104v208c0,4.418,3.582,8,8,8s8-3.582,8-8V136h104v120 C368,260.418,371.582,264,376,264z M264,120V48h104v72H264z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
        <div className="flex flex-col ">
          <div className="font-medium">Balcony</div>
          <div className="text-muted-foreground">
            Balcony with amazing views
          </div>
        </div>
      </div>
    </div>
  );
};
