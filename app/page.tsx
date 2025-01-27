import HeaderTractian from "@/components/common/HeaderTractian/HeaderTractian";
import ContainerMain from "@/components/ContainerMain/ContainerMain";
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import Content from "@/components/Content/Content";
import AssestList from "@/components/Content/AssestList/AssestList";
import SelectedAsset from "@/components/SelectedAsset/SelectedAsset";
import { ToastContainer } from "react-toastify";

export default async function Home() {
  return (
    <div className="h-screen">
      <HeaderTractian></HeaderTractian>
      <ContainerMain>
        <ContentHeader></ContentHeader>
        <Content>
          <AssestList></AssestList>
          <SelectedAsset></SelectedAsset>
        </Content>
      </ContainerMain>
      <ToastContainer />
    </div>
  );
}
