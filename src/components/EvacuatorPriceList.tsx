"use client";
import React, { useState, useEffect } from "react";
import { evacuatorRoutes } from "@/lib/evacuatorRoutes";
import { formatPrice, getCurrentCountry } from "@/lib/priceFormatter";

const EvacuatorPriceList = () => {
  const [country, setCountry] = useState<"MD" | "PMR" | "UA">("PMR"); // По умолчанию PMR

  useEffect(() => {
    setCountry(getCurrentCountry());
    const handleStorageChange = () => {
      setCountry(getCurrentCountry());
    };
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Тарифы эвакуатора
      </h3>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full border-collapse">
          <tbody>
            {evacuatorRoutes.map((route, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  index === evacuatorRoutes.length - 1 ? "" : ""
                }`}
              >
                <td className="px-4 py-3 text-gray-700">
                  {route.from === route.to ? (
                    <span className="font-medium">{route.from}</span>
                  ) : (
                    <span>
                      {route.from} → {route.to}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-black">
                  {formatPrice(route.price, country)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            * Цена в Кишинёве варьируется в зависимости от района
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvacuatorPriceList;
