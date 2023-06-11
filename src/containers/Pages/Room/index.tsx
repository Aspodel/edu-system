import * as React from "react";
import { TableBox } from "components";
import { ContainerLayout, PageLayout } from "containers";
import { IRoom } from "interfaces";
import { Button } from "@chakra-ui/react";

function RoomPage() {
  const mockData: IRoom[] = [
    {
      code: "409",
      building: "A1",
      seat: 20,
    },
    {
      code: "410",
      building: "A1",
      seat: 20,
    },
    {
      code: "411",
      building: "A1",
      seat: 20,
    },
  ];
  return (
    <PageLayout title="Rooms">
      <ContainerLayout title="Room List" btnList={[<Button>Add</Button>]}>
        <TableBox data={mockData} />
      </ContainerLayout>
    </PageLayout>
  );
}

export default RoomPage;
