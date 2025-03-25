// import { useEffect } from "react";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// const Show = () => {
//     const [showDetail, setShowDetail] = useState({});
//     const { showId } = useParams();

//     const getShowDetail = async () => {
//         const response = await fetch(`http://localhost:3001/api/show/${showId}`);
//         const detail = await response.json();
//         setShowDetail(detail);
//     }

//     useEffect(() => {
//         getShowDetail();
//     }, []);

//     return (
//         <div className="flex flex-col">
//             {
//                 showDetail?.seats?.map(seatCategory => (
//                     <>
//                         <div className="text-regular text-slate-500  mt-4  mb-2">
//                             {seatCategory.category}-Rs{seatCategory.price}
//                         </div>
//                         <div className="flex flex-col">
//                             {
//                                 seatCategory.arrangements?.map(row => (
//                                     <div className="flex">
//                                         <button className="bg-transparent text-slate-500 py-2 px-4">A</button>
//                                         {
//                                             row.map(col => (
//                                                 <button className={(col.status !== "BOOKED" ? "hover:bg-blue-700 hover:text-white bg-transparent" : "bg-slate-500 text-slate-200 disabled ") + ` border border-slate-500 text-slate-500 py-2 px-4 m-2`}>{col.seatNumber}</button>
//                                             ))
//                                         }
                                        
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </>
//                 ))
//             }
//         </div>
//     )
// }

// export default Show;













import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Show = () => {
  const [showDetail, setShowDetail] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { showId } = useParams();

  const getShowDetail = async () => {
    const response = await fetch(`http://localhost:3001/api/show/${showId}`);
    const detail = await response.json();
    setShowDetail(detail);
  };

  useEffect(() => {
    getShowDetail();
  }, []);

  const handleSeatClick = (seat) => {
    const isSeatSelected = selectedSeats.includes(seat);
    if (isSeatSelected) {
      const updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== seat);
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotalPayment = () => {
    let totalPayment = 0;
    selectedSeats.forEach((seat) => {
      const seatDetail = showDetail.seats.find((category) =>
        category.arrangements.some((row) => row.some((col) => col.seatNumber === seat))
      );

      if (seatDetail) {
        const seatPrice = seatDetail.price;
        totalPayment += seatPrice;
      }
    });
    return totalPayment;
  };

  const handleConfirmBooking = () => {
    // Implement the logic to confirm the booking (e.g., send data to the server)
    console.log("Booking confirmed for seats:", selectedSeats);
    // You can add further logic here, such as redirecting to a confirmation page.
  };

  return (
    <div className="flex justify-center items-start p-8">
      <div className="flex flex-col">
        {showDetail?.seats?.map((seatCategory) => (
          <div key={seatCategory.category} className="mb-8">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              {seatCategory.category} - Rs{seatCategory.price}
            </div>
            <div className="flex flex-row flex-wrap">
              {seatCategory.arrangements?.map((row, rowIndex) => (
                <div key={rowIndex} className="flex mb-2">
                  {row.map((col) => (
                    <button
                      key={col.seatNumber}
                      className={
                        (col.status !== "BOOKED"
                          ? "hover:bg-blue-700 hover:text-white bg-transparent"
                          : "bg-gray-500 text-gray-200 cursor-not-allowed ") +
                        ` border border-gray-500 text-gray-500 py-2 px-4 mx-2 ${
                          selectedSeats.includes(col.seatNumber) ? "bg-yellow-400" : ""
                        }`
                      }
                      onClick={() => handleSeatClick(col.seatNumber)}
                      disabled={col.status === "BOOKED"}
                    >
                      {col.seatNumber}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ml-8">
        <div className="text-xl font-bold text-blue-700 mb-2">Selected Seats:</div>
        <ul className="list-disc ml-6">
          {selectedSeats.map((seat) => (
            <li key={seat} className="text-gray-800">
              {seat}
            </li>
          ))}
        </ul>
        <div className="text-xl font-bold text-blue-700 mt-4">
          Total Payment: Rs{calculateTotalPayment()}
        </div>
        <button
          className="bg-blue-700 text-white px-6 py-3 mt-6 rounded hover:bg-blue-800 focus:outline-none"
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Show;









// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Show = () => {
//   const [showDetail, setShowDetail] = useState({});
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const { showId } = useParams();

//   const getShowDetail = async () => {
//     const response = await fetch(`http://localhost:3001/api/show/${showId}`);
//     const detail = await response.json();
//     setShowDetail(detail);
//   };

//   useEffect(() => {
//     getShowDetail();
//   }, []);

//   const handleSeatClick = (seat) => {
//     const isSeatSelected = selectedSeats.includes(seat);
//     if (isSeatSelected) {
//       const updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== seat);
//       setSelectedSeats(updatedSeats);
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const calculateTotalPayment = () => {
//     let totalPayment = 0;
//     selectedSeats.forEach((seat) => {
//       const seatDetail = showDetail.seats.find((category) =>
//         category.arrangements.some((row) => row.some((col) => col.seatNumber === seat))
//       );

//       if (seatDetail) {
//         const seatPrice = seatDetail.price;
//         totalPayment += seatPrice;
//       }
//     });
//     return totalPayment;
//   };

//   const handleConfirmBooking = () => {
//     // Implement the logic to confirm the booking (e.g., send data to the server)
//     console.log("Booking confirmed for seats:", selectedSeats);
//     // You can add further logic here, such as redirecting to a confirmation page.
//   };

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <div className="text-3xl font-bold text-gray-800 mb-4">Select Your Seats</div>
//       <div className="flex flex-col items-center">
//         {showDetail?.seats?.map((seatCategory) => (
//           <div key={seatCategory.category} className="mb-8">
//             <div className="text-xl font-bold text-gray-800 mb-4">
//               {seatCategory.category} - Rs{seatCategory.price}
//             </div>
//             <div className="grid grid-cols-8 gap-4">
//               {seatCategory.arrangements?.map((row, rowIndex) =>
//                 row.map((col) => (
//                   <button
//                     key={col.seatNumber}
//                     className={
//                       (col.status !== "BOOKED"
//                         ? "hover:bg-blue-700 hover:text-white bg-transparent"
//                         : "bg-gray-500 text-gray-200 cursor-not-allowed ") +
//                       ` border border-gray-500 text-gray-500 py-2 px-4 ${
//                         selectedSeats.includes(col.seatNumber) ? "bg-yellow-400" : ""
//                       }`
//                     }
//                     onClick={() => handleSeatClick(col.seatNumber)}
//                     disabled={col.status === "BOOKED"}
//                   >
//                     {col.seatNumber}
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 text-xl font-bold text-blue-700">
//         Total Payment: Rs{calculateTotalPayment()}
//       </div>
//       <button
//         className="bg-blue-700 text-white px-6 py-3 mt-6 rounded hover:bg-blue-800 focus:outline-none"
//         onClick={handleConfirmBooking}
//         disabled={selectedSeats.length === 0}
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default Show;





