'use client'
import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { PiPowerThin } from "react-icons/pi";
import { PiArrowDownRightThin } from "react-icons/pi";
import useMeasure from "react-use-measure";
import DeviceControls from '@/components/Devices/DeviceControls'
import ResizablePanel from '@/components/ResizablePanel'
import Button from '@/components/Button/index'

const LightBulbs = [
    {name: 'Tagarp', model : 'H6008', count : 0}, 
    {name: 'Tagarp', model : 'H6008', count : 1},
    {name: 'Tagarp', model : 'H6008', count : 2},
    {name: 'Tagarp', model : 'H6008', count : 3},
]

export default function Kanban(){
  return (
      <Board />
  );
};


const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="flex w-full overflow-scroll">
      <Column
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        column="done"
        cards={cards}
        setCards={setCards}
      />
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
    <div className="flex-1">
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

const Card = ({ title, id, column, handleDragStart }) => {
  let [expand, setExpand] = useState(false);
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id })}
        className="cursor-grab active:cursor-grabbing p-4 flex flex-col border justify-between rounded"
      > 
            <div>
               <h2 className='text-5xl pb-4'>{title}</h2>
                <h2 className='text-xl'>{id}</h2> 
            </div>
            <div className='justify-self-end self-end'>
            <div className='border border-custom-main rounded-full w-fit mb-4'>
                <Button>
                    <PiPowerThin size={60}/>
                </Button>   
                </div>
                <div
                    className='border rounded-full w-fit'
                    onClick={() => setExpand(!expand)}>
                    <Button>
                        <PiArrowDownRightThin size={60} />
                    </Button>
                    
                </div>
            </div>
            <ResizablePanel>
                {expand && (
                <DeviceControls></DeviceControls>
                )}
            </ResizablePanel>
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


const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look", id: "1", column: "backlog" },
  { title: "SOX", id: "2", column: "backlog" },
  { title: "[SPIKE", id: "3", column: "backlog" },
  { title: "Document", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem", id: "6", column: "todo" },
  { title: "Sync", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor ",
    id: "8",
    column: "doing",
  },
  { title: "Add", id: "9", column: "doing" },
  // DONE
  {
    title: "Set",
    id: "10",
    column: "done",
  },
];