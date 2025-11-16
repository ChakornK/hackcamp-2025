"use client";

import { useState, useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GlobalContext } from "../lib/globalState";

export default function QRCodePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useContext(GlobalContext);

  const userId = username || "guest";
  const qrValue = `reelrewards://addFriend/${userId}`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold text-white transition-colors"
      >
        Add Friends
      </button>

      {isOpen && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white shadow-2xl mx-4 p-8 rounded-3xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-3xl">Add Friends</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="font-bold text-gray-500 hover:text-gray-700 text-3xl"
              >
                ×
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 border-4 border-purple-400 rounded-xl">
                <QRCodeSVG
                  value={qrValue}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="mb-2 font-semibold text-lg">Share your QR code!</p>
              <p className="mb-4 text-gray-600 text-sm">
                Have your friends scan this code to add you as a friend on Reel
                Rewards
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
