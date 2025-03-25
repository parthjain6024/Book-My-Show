import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetail = () => {
  const [showDetail, setShowDetail] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { showId } = useParams();

  useEffect(() => {
    const getShowDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/show/${showId}`);
        const detail = await response.json();
        console.log(detail)
        setShowDetail(detail);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    getShowDetail();
  }, [showId]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
    );
  };

  const calculateTotalPayment = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatDetail = showDetail.seats.find((category) =>
        category.arrangements.some((row) => row.some((col) => col.seatNumber === seat))
      );
      return seatDetail ? total + seatDetail.price : total;
    }, 0);
  };

  const handleConfirmBooking = async () => {

    try {
        if(selectedSeats.length==0){
            alert("Select the seat")
            return;
        }
      const response = await fetch(`http://localhost:3001/api/show/book/${showId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedSeats }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking Confirmed!");
        window.location.reload()
      } else {
        alert(`Booking failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (!showDetail) return <div>Loading show details...</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-4">{showDetail.movie.title}</h2>
      <img src={showDetail.movie.bannerImage} alt={showDetail.movie.title} className="w-full max-w-lg rounded-lg" />
      <p className="text-gray-700 mt-2">{showDetail.movie.description}</p>

      <div className="mt-4 w-full max-w-2xl border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mt-2">{showDetail.movie.title}</h3>
        <p><strong>{showDetail.theatre.name} - {showDetail.theatre.location}</strong></p>
        <p><strong>Language:</strong> {showDetail.language}</p>
        <p><strong>Genre:</strong> {showDetail.movie.genre}</p>
        <p><strong>Rating:</strong> {showDetail.movie.rating} ⭐</p>
        <p><strong>Theatre:</strong> {showDetail.theatre.name}, {showDetail.theatre.location}</p>
        <p><strong>Contact:</strong> {showDetail.theatre.phoneNumber}</p>
        <p><strong>Date & Time:</strong> {new Date(showDetail.datetime).toLocaleString()}</p>
      </div>

      <h3 className="text-xl font-bold mt-4">Select Seats</h3>
      <div className="flex flex-col w-full max-w-2xl">
        {showDetail?.seats?.map((seatCategory) => (
          <div key={seatCategory.category} className="mb-8">
            <h3 className="text-xl font-bold">{seatCategory.category} - Rs {seatCategory.price}</h3>
            <div className="flex flex-wrap mt-2">
              {seatCategory.arrangements?.map((row, rowIndex) => (
                <div key={rowIndex} className="flex mb-2">
                  {row.map((col) => (
                    <button
                      key={col.seatNumber}
                      className={`border border-gray-500 py-2 px-4 mx-2 ${
                        col.status === "BOOKED" ? "bg-gray-500 text-gray-200 cursor-not-allowed" : "bg-transparent"
                      } ${selectedSeats.includes(col.seatNumber) ? "bg-yellow-400" : "hover:bg-blue-700 hover:text-white"}`}
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

      <div className="mt-4">
        <div className="text-xl font-bold text-blue-700">Selected Seats:</div>
        <ul className="list-disc ml-6">
          {selectedSeats.map((seat) => (
            <li key={seat} className="text-gray-800">{seat}</li>
          ))}
        </ul>
        <div className="mt-4 text-xl font-bold text-blue-700">Total Payment: Rs {calculateTotalPayment()}</div>
        <button
          className="bg-blue-700 text-white px-6 py-3 mt-6 rounded hover:bg-blue-800"
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ShowDetail;
