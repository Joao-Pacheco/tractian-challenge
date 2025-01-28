/* TODO excluir esse arquivo */
export type TreeNodeType = {
  name: string;
  type: "location" | "equipment";
  status?: "online" | "offline";
  children?: TreeNodeType[];
};

export const data: TreeNodeType[] = [
  {
    name: "PRODUCTION AREA - RAW MATERIAL",
    type: "location",
    children: [
      {
        name: "CHARCOAL STORAGE SECTOR",
        type: "location",
        children: [
          {
            name: "CONVEYOR BELT ASSEMBLY",
            type: "equipment",
            children: [
              {
                name: "MOTOR TC01 COAL UNLOADING AF02",
                type: "equipment",
                children: [
                  {
                    name: "MOTOR RT COAL AF01",
                    type: "equipment",
                    status: "online",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Machinery House",
        type: "location",
        children: [
          {
            name: "MOTORS H12D",
            type: "equipment",
            children: [
              {
                name: "MOTORS H12D - Stage 1",
                type: "equipment",
                status: "offline",
              },
              {
                name: "MOTORS H12D - Stage 2",
                type: "equipment",
                status: "offline",
              },
              {
                name: "MOTORS H12D - Stage 3",
                type: "equipment",
                status: "online",
              },
            ],
          },
        ],
      },
      {
        name: "EMPTY MACHINE HOUSE",
        type: "location",
      },
      {
        name: "Fan - External",
        type: "equipment",
        status: "online",
      },
    ],
  },
];
