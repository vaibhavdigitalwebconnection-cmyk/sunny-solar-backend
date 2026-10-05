import React, { useState } from 'react';
import { CountryStatItem } from './overviewTypes';

interface VisitorRegionsTableProps {
  realCountriesData: CountryStatItem[];
}

export const VisitorRegionsTable: React.FC<VisitorRegionsTableProps> = ({
  realCountriesData
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  return (
    <div className="lg:col-span-3 bg-white border border-neutral-400/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
            Countries of Origin
          </h3>
          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
            Live Traffic
          </span>
        </div>

        {/* Table Header */}
        <div className="flex items-center justify-between text-xs text-neutral-700 font-medium mt-4 pb-1 border-b border-neutral-100">
          <span>Country / Region</span>
          <span>Reads</span>
        </div>

        {/* Real Regional Distribution List */}
        <div className="mt-3 space-y-2">
          {realCountriesData.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No visitor traffic recorded yet
            </div>
          ) : (
            realCountriesData.map((item: CountryStatItem, idx: number) => {
              const isSelected =
                selectedCountry === item.name || (selectedCountry === '' && idx === 0);
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedCountry(item.name)}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#ede9fe]/90 text-[#3730a3] font-semibold border-l-3 border-[#6366f1]'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`text-xs font-bold w-5 shrink-0 ${
                        isSelected ? 'text-[#3730a3]' : 'text-neutral-900'
                      }`}
                    >
                      {item.code}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span
                    className={`font-bold shrink-0 ml-2 ${
                      isSelected ? 'text-[#3730a3]' : 'text-neutral-900'
                    }`}
                  >
                    {item.chats}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
