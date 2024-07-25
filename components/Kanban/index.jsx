'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import Widget from '@/components/Kanban/Widgets'

const DEFAULT_DEVICES = [
  {
    "deviceName": "FADO",
    "id" : 1,
    "sku": "H6008",
    "device": "86:5C:60:74:F4:D7:E1:3E",
    "column" : 1
    }, 
    {
    "deviceName": "LAUTERS",
    "id" : 2,
    "sku": "H6008",
    "device": "B5:71:60:74:F4:D4:2A:EE",
    "column" : 2
    },
    {
    "deviceName": "TÅGARP",
    "id" : 3,
    "sku": "H6008",
    "device": "68:B8:60:74:F4:D7:8E:7C",
    "column" : 3
  },
];

export default function Kanban(){
  return (
      <Board />
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_DEVICES);
  return (
    <div>
        <div className='pb-60'>
          <h1 className='text-6xl pb-4'>Devices</h1>
          <hr className='pb-4'/>
          <div className='flex flex-col sm:flex-row sm:gap-4'>
            <div className='flex-1 xl:flex gap-4'>
                <div className='flex-1 gap-4'>
                <Column
                  column={1}
                  cards={cards}
                  setCards={setCards}
                />
                </div>
                <div className='flex-1 gap-4'>
                <Column
                  column={2}
                  cards={cards}
                  setCards={setCards}
                />
                </div>
            </div>
            <div className='flex-1 xl:flex gap-4'>
                <div className='flex-1 gap-4'>
                <Column
                  column={3}
                  cards={cards}
                  setCards={setCards}
                />
                </div>
                <div className='flex-1 gap-4'>
                  <Column
                    column={4}
                    cards={cards}
                    setCards={setCards}
                  />
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

const Column = ({ cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="flex">
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

const Card = ({ deviceName, device, sku, id, column, handleDragStart }) => {
  const widgetProps = { deviceName, device, sku};
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { name, id })}
        // className="cursor-grab mb-4 active:cursor-grabbing p-4 flex flex-col border justify-between rounded"
        className="cursor-grab mb-4 active:cursor-grabbing"
      > 
        <Widget {...widgetProps} />
      </motion.div>
    </>
  );
};


const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};
